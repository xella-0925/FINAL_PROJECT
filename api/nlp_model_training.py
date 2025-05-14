# nlp_model_training.py
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os

# Download necessary NLTK data (run this once)
try:
    # Try to find the resource locally first
    nltk.data.find('corpora/stopwords')
    print("NLTK stopwords found.")
except LookupError:
    # If not found (LookupError), download it
    print("NLTK stopwords not found. Downloading...")
    nltk.download('stopwords')
    print("NLTK stopwords downloaded.")
except Exception as e:
    # Catch any other unexpected errors during the find/download attempt
    print(f"An unexpected error occurred with stopwords: {e}")


try:
    # Try to find the resource locally first
    nltk.data.find('corpora/wordnet')
    print("NLTK wordnet found.")
except LookupError:
    # If not found (LookupError), download it
    print("NLTK wordnet not found. Downloading...")
    nltk.download('wordnet')
    print("NLTK wordnet downloaded.")
except Exception as e:
    # Catch any other unexpected errors during the find/download attempt
    print(f"An unexpected error occurred with wordnet: {e}")

# --- Configuration ---
DATA_PATH = 'IMDB Dataset.csv' # Make sure this path is correct
MODEL_DIR = 'model'
MODEL_PATH = os.path.join(MODEL_DIR, 'sentiment_model.pkl')
VECTORIZER_PATH = os.path.join(MODEL_DIR, 'tfidf_vectorizer.pkl')

# --- Preprocessing Function ---
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    # Remove HTML tags
    text = re.sub(r'<.*?>', ' ', text)
    # Remove non-alphabetic characters and convert to lower case
    text = re.sub(r'[^a-zA-Z]', ' ', text).lower()
    # Tokenize
    words = text.split()
    # Remove stopwords and lemmatize
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    # Join words back into a string
    return ' '.join(words)

# --- Load Data ---
print("Loading data...")
try:
    df = pd.read_csv(DATA_PATH)
except FileNotFoundError:
    print(f"Error: Dataset not found at {DATA_PATH}")
    print("Please download 'IMDB Dataset.csv' from Kaggle and place it in the correct directory.")
    exit()

print("Data loaded. Shape:", df.shape)

# --- Preprocess Data ---
print("Preprocessing text data...")
df['review'] = df['review'].apply(preprocess_text)
print("Preprocessing complete.")

# --- Prepare Data for Model ---
X = df['review']
y = df['sentiment'].apply(lambda x: 1 if x == 'positive' else 0) # Convert sentiment to numerical (1 for positive, 0 for negative)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- Feature Extraction (TF-IDF) ---
print("Fitting TF-IDF Vectorizer...")
tfidf_vectorizer = TfidfVectorizer(max_features=5000) # Limit features to avoid memory issues
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
X_test_tfidf = tfidf_vectorizer.transform(X_test)
print("TF-IDF fitting complete.")

# --- Model Training (Logistic Regression) ---
print("Training Logistic Regression model...")
model = LogisticRegression(max_iter=1000) # Increase max_iter for convergence
model.fit(X_train_tfidf, y_train)
print("Model training complete.")

# --- Evaluate Model (Optional, but recommended) ---
accuracy = model.score(X_test_tfidf, y_test)
print(f"Model Accuracy on Test Set: {accuracy:.4f}")

# --- Save Model and Vectorizer ---
print("Saving model and vectorizer...")
os.makedirs(MODEL_DIR, exist_ok=True)
joblib.dump(model, MODEL_PATH)
joblib.dump(tfidf_vectorizer, VECTORIZER_PATH)
print(f"Model saved to {MODEL_PATH}")
print(f"Vectorizer saved to {VECTORIZER_PATH}")

print("Training script finished.")