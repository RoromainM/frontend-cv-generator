# Front-cv-generator

Frontend (React Vite)
This is the frontend of the full-stack application built with React and Vite. The app is deployed on Netlify and connects to a backend API hosted on Railway.

Features
CV manage,register,login,logout,recomondation
API integration with backend for data management
Modern UI built with React
Getting Started
Prerequisites
Node.js installed on your local machine
Backend API (Node.js/Express) running locally or deployed
Installation
Clone this repository:

cd your-frontend-repo
Install the required dependencies:

npm install
Create a .env file in the root directory and add the following variable: you have to change port and url in vite.config file

VITE_API_URL=https://your-backend-url.com/
Replace https://your-backend-url.com/ with your actual backend URL (deployed on Railway or locally).

Start the development server:

npm run dev
The server will run on http://localhost:5173/.

Deployment
Netlify Deployment
Push your repository to GitHub if you haven't done so already.

Go to Netlify and create a new site.

Connect your GitHub repository to Netlify.

In the Site Settings, go to Build & Deploy > Environment Variables and add:


Netlify will automatically build and deploy your app.

After deployment, you will receive a live site URL from Netlify.

Built With
React
Vite 

Participants :
- Huu-Nghia TRAN
- Romain MONMARCHE
- HADDOUCHE Othmane
