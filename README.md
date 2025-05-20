# FINAL PROJECT IN CCS 249: Natural Language Processing (NLP)

## 👨‍💻 Submitted by:
- Els Dave Constantino  
- Angelika Marie Nava  
- Reycel Sarmiento  
- Mariane Faith Torreverde  

**BSCS 3A-AI**  
West Visayas State University

---

## 🎬 What is ReelSense?

**ReelSense** is an intelligent web-based application that performs **sentiment analysis** and **star rating predictions** from online movie reviews. It uses advanced Natural Language Processing (NLP) to:

- Extract reviews from Metacritic  
- Analyze emotional tone of each review  
- Predict a 1–5 star rating  
- Display overall sentiment and individual review ratings in a visual carousel

> _From opinions to stars — see what shines with ReelSense._ ✨

---
## 💡 Why Use ReelSense?
✅ Saves time in deciding what to watch

✅ Helps understand audience reception at a glance

✅ Useful for viewers, reviewers, and content platforms

---
## 🤔 How to Use ReelSense?

1️⃣ Open the ReelSense app in your browser  
2️⃣ Paste a Metacritic movie review URL into the input field  
3️⃣ Click **Analyze**  
4️⃣ Wait a few seconds for processing  
5️⃣ View the results:
- 🎞 Movie title  
- 📊 Overall sentiment  
- ⭐ Average rating  
- 💬 Carousel of reviews with sentiment & stars  

---

## 💻 Behind the Scenes (How It Works)

- Uses **Flask** for the backend API  
- **Selenium** and **BeautifulSoup** scrape movie reviews from Metacritic  
- Texts are cleaned and preprocessed with **NLTK**  
- **TF-IDF Vectorizer** converts text into features  
- **Logistic Regression model** predicts sentiment  
- Ratings mapped from probability scores to a 1–5 scale  

---



