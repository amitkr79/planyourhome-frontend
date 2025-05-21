# Architecture Landing Page – Frontend 🏗️

This is the **frontend** client application for the Architecture Landing Page project.  
It is built using **React** and **Vite** to deliver a fast, modern, and responsive user interface showcasing architectural projects with a dynamic gallery.

---

## Features

- Responsive UI for desktop and mobile
- Dynamic gallery fetching data from the backend API
- Clean, modular React components using hooks
- Environment variable configuration for API endpoints
- Fast development experience with Vite's hot module replacement
- Production-ready optimized build

---

## Tech Stack

- React 18+
- Vite
- Axios for HTTP requests
- CSS Modules / Tailwind CSS / Styled Components (customize based on your styling choice)

---

## Project Structure

frontend/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components
│ ├── assets/ # Images, icons, fonts
│ ├── App.jsx # Root React component
│ └── main.jsx # Vite entry point
├── .env.example # Sample environment variables
├── package.json
├── vite.config.js

yaml
Copy
Edit

---

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/architecture-frontend.git
cd architecture-frontend
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
Create a .env file in the root folder based on .env.example and set your backend API URL:

bash
Copy
Edit
VITE_API_URL=http://localhost:8000/api
Run the development server:

bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser to see the app.

Build for Production
To create an optimized production build:

bash
Copy
Edit
npm run build
The output files will be in the dist/ folder, ready for deployment.

Deployment
You can deploy the dist/ folder to any static hosting provider like:

Render (Static Site)

Netlify

Vercel

GitHub Pages

Make sure to configure the environment variable VITE_API_URL on your hosting platform to point to your backend API.