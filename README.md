# Healthcare Symptom Checker (MERN + OpenAI)

A simple MERN stack project where users can enter symptoms and get AI-generated educational information.

This project is **NOT for medical use**. It only provides general educational guidance and cannot diagnose or treat any condition.

---

## Features

- Enter symptoms and receive AI-generated information  
- Possible general causes (not diagnosis)  
- Suggested next steps  
- Red-flag warning signs  
- Safety disclaimer with every response  
- MongoDB symptom history  
- Tailwind CSS responsive frontend  
- OpenAI Responses API used in backend  

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **AI:** OpenAI Responses API  
- **Database:** MongoDB (Mongoose)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/aman-sharma-agnihotri/healthcare-symptom-checker.git
cd healthcare-symptom-checker

## Backend Setup
```bash
cd backend
npm install

Create a .env file inside backend:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
FRONTEND_ORIGIN=http://localhost:5173

Start backend:

npm run dev

## Frontend Setup
```bash
cd ../frontend
npm install


Create a .env file inside frontend:

VITE_API_BASE_URL=http://localhost:5000


Start frontend:

npm run dev
