import json
import requests
from bs4 import BeautifulSoup
import random
import time
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import re


HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
    'Referer': 'https://www.metacritic.com/',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
}

def extract_reviews_from_metacritic(url):
    try:
        # Initialize undetected-chromedriver
        options = uc.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')

        driver = uc.Chrome(options=options)
        driver.get(url)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'h1')))

        # Extract movie title
        try:
            title_tag = driver.find_element(By.TAG_NAME, 'h1')
            movie_title = title_tag.text.strip()
        except:
            movie_title = 'Unknown Title'

        # Extract review snippets
        review_snippets = []
        review_elements = driver.find_elements(By.CSS_SELECTOR, "div.c-siteReview_quote.g-outer-spacing-bottom-small span")
        for review in review_elements:
            review_snippets.append(review.text.strip())

        # Extract full reviews by clicking 'Read More'
        full_reviews = []
        read_more_buttons = driver.find_elements(By.CSS_SELECTOR, "span.c-globalButton_label")
        for button in read_more_buttons:
            try:
                button.click()
                time.sleep(random.uniform(1, 2))  # Adding delay to simulate user interaction
                full_review_element = driver.find_element(By.CSS_SELECTOR, "div.c-siteReviewReadMore_wrapper")
                full_reviews.append(full_review_element.text.strip())
            except Exception as e:
                print(f"Error extracting full review: {e}")
                continue

        driver.quit()

        return {
            'title': movie_title,
            'review_snippets': review_snippets,
            'full_reviews': full_reviews
        }

    except Exception as err:
        print(f"An error occurred: {err}")
        return None

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

# Import the Metacritic scraper
from scraper import extract_reviews_from_metacritic

# Load the sentiment analysis model and vectorizer
MODEL_DIR = 'model'
MODEL_PATH = os.path.join(MODEL_DIR, 'sentiment_model.pkl')
VECTORIZER_PATH = os.path.join(MODEL_DIR, 'tfidf_vectorizer.pkl')

print("Loading model and vectorizer...")
model = joblib.load(MODEL_PATH)
tfidf_vectorizer = joblib.load(VECTORIZER_PATH)
print("Model and vectorizer loaded.")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    text = re.sub(r'<.*?>', ' ', text)
    text = re.sub(r'[^a-zA-Z]', ' ', text).lower()
    words = text.split()
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)


def map_sentiment_score_to_stars(score):
    rating = 1 + score * 4
    rating = round(rating)
    rating = max(1, min(5, rating))
    return rating

@app.route('/')
def index():
    return "Sentiment Analysis API is running."

@app.route('/analyze', methods=['POST'])
def analyze_reviews():
    data = request.json
    if not data or 'url' not in data:
        return jsonify({'error': "Please provide a 'url' key in the JSON body."}), 400

    url = data['url']

    # Extract reviews
    scraped_data = extract_reviews_from_metacritic(url)
    if not scraped_data:
        return jsonify({'error': 'Failed to extract reviews.'}), 500

    reviews = scraped_data['review_snippets']
    movie_title = scraped_data['title']

    # Analyze sentiment
    print("Reviews received for preprocessing:", reviews)
    processed_reviews = [preprocess_text(review) for review in reviews]
    tfidf_reviews = tfidf_vectorizer.transform(processed_reviews)
    sentiment_scores = model.predict_proba(tfidf_reviews)[:, 1]
    sentiments = ['Positive' if score >= 0.5 else 'Negative' for score in sentiment_scores]

    response_data = {
        'title': movie_title,
        'reviews': [
            {
                'review': review,
                'score': float(score),
                'sentiment': sentiment,
                'star_rating': map_sentiment_score_to_stars(score)
            }
            for review, score, sentiment in zip(reviews, sentiment_scores, sentiments)
        ]
    }

    # Return JSON response
    return json.dumps(response_data, ensure_ascii=False), 200, {'Content-Type': 'application/json; charset=utf-8'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
