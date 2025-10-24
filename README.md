Google Calendar Event Reminder App

A simple web application that sends phone call reminders for upcoming Google Calendar events using Google OAuth and Twilio API.

Features
---------

Login with Google.

Fetch your Google Calendar events.

Receive phone call reminders for upcoming events.

React/Next.js frontend and Node.js/Express backend.

Tech Stack
----------

Frontend: React.js / Next.js, Axios, shadcn

Backend: Node.js, Express, MongoDB (Mongoose), Google API, Twilio 

Environment Variables
--------------------

Create a .env file in the backend:

PORT=5000
MONGO_URI=your_mongodb_connection
FRONTEND_URL=https://your-frontend-url.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://your-backend-url.onrender.com/api/auth/google/callback

TWILIO_SID=your_twilio_sid
TWILIO_TOKEN=your_twilio_token
TWILIO_PHONE=your_twilio_trial_phone

JWT_SECRET=your_jwt_secret
TOKEN_ENC_KEY_BASE64=your_encryption_key

NODE_ENV=production

Create a .env file in the frontend

NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com

Limitations
-----------

Uses Google OAuth (Test mode) — only test users can login.

Uses Twilio trial account — can only call verified numbers, limited features.

Clone the Repo
--------------
git clone https://github.com/sruthi0018/webCastleTest



Install dependencies
-------------------

cd backend && npm install
cd frontend && npm install

Start backend and frontend
---------------------------
npm run dev


