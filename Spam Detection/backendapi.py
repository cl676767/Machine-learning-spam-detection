import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

model = joblib.load('svc_spam_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

"""  allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_methods=['POST'],
    allow_headers=['Content-Type'], """

class Email(BaseModel):
    text: str

@app.post("/predict")
async def predict_email(email: Email):

    X = vectorizer.transform([email.text])
    prediction = model.predict(X)
    return {"prediction": str(prediction[0])}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)