# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import joblib
import os
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# --- Configuration ---
MODEL_DIR = 'model'
MODEL_PATH = os.path.join(MODEL_DIR, 'sentiment_model.pkl')
VECTORIZER_PATH = os.path.join(MODEL_DIR, 'tfidf_vectorizer.pkl')

# --- Load Model and Vectorizer ---
print("Loading model and vectorizer...")
try:
    model = joblib.load(MODEL_PATH)
    tfidf_vectorizer = joblib.load(VECTORIZER_PATH)
    print("Model and vectorizer loaded successfully.")
except FileNotFoundError:
    print(f"Error: Model or vectorizer files not found in {MODEL_DIR}")
    print("Please run nlp_model_training.py first to train and save the model.")
    exit()

# --- Preprocessing Function (Same as in training script) ---
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    text = re.sub(r'<.*?>', ' ', text)
    text = re.sub(r'[^a-zA-Z]', ' ', text).lower()
    words = text.split()
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)

# --- Rating Mapping Function (Score 0-1 to Stars 1-5) ---
def map_sentiment_score_to_stars(score):
    # Example: Simple linear mapping from 0-1 score to 1-5 stars
    # score 0 -> 1 star
    # score 1 -> 5 stars
    # score 0.5 -> 3 stars
    rating = 1 + score * 4
    # Optional: Round to nearest half or whole star
    # rating = round(rating * 2) / 2 # Round to nearest 0.5
    rating = round(rating) # Round to nearest whole star
    # Ensure rating is within 1-5 range
    rating = max(1, min(5, rating))
    return rating

# --- Flask App ---
app = Flask(__name__)
# Allow CORS for all origins (useful for development with separate frontend)
CORS(app, resources={r"/predict": {"origins": "*"}})
# If using @cross_origin on routes, you might not need the global CORS

@app.route('/')
def index():
    return "Sentiment Analysis API is running."

@app.route('/predict', methods=['POST'])
@cross_origin() # Enable CORS for this specific route
def predict_sentiment():
    if not request.json or 'review' not in request.json:
        return jsonify({"error": "Invalid input. Provide 'review' in JSON body."}), 400

    review_text = request.json['review']

    # Preprocess input text
    processed_review = preprocess_text(review_text)

    # Vectorize input text
    review_tfidf = tfidf_vectorizer.transform([processed_review])

    # Predict sentiment probability (probability of being the positive class)
    # model.predict_proba returns [[prob_negative, prob_positive]]
    sentiment_probability = model.predict_proba(review_tfidf)[0][1] # Get probability of the positive class (index 1)

    # Predict sentiment label (optional, can derive from probability)
    predicted_sentiment = "Positive" if sentiment_probability >= 0.5 else "Negative"

    # Map sentiment score to stars
    star_rating = map_sentiment_score_to_stars(sentiment_probability)

    return jsonify({
        "sentiment": predicted_sentiment,
        "sentiment_score": float(sentiment_probability), # Convert numpy float to Python float
        "star_rating": float(star_rating)
    })

# --- Run the App ---
if __name__ == '__main__':
    # app.run(debug=True) # Run in debug mode during development
     app.run(host='0.0.0.0', port=5000) # Run on accessible IP/port