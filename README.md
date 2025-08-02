# MERN ThinkBoard

A full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js). ThinkBoard allows users to create, view, and manage notes efficiently with a modern UI.

## Features

- Create, read, update, and delete notes
- Rate limiting for API requests
- Responsive design with Tailwind CSS
- RESTful API backend
- Modern React frontend with Vite

## Project Structure

```
mern-thinkboard/
├── backend/      # Express.js API server
│   ├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── frontend/     # React client app
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── lib/
├── README.md
└── package.json
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DeepakAC3/mern-thinkboard.git
   cd mern-thinkboard
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser at [http://localhost:5173](http://localhost:5173)

## Configuration

- Backend MongoDB connection: Edit `backend/src/config/db.js`
- Rate limiting: See `backend/src/middleware/rateLimiter.js`

## Environment Variables

Store all sensitive configuration and environment variables in a `.env` file located in the `backend/` directory. Example variables include your MongoDB URI, API keys, and other secrets. The backend is configured to load environment variables from this file using `dotenv`.

**Example:**

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_rest_token
NODE_ENV=development
```

Do not commit your `.env` file to version control. Make sure to add `.env` to your `.gitignore`.

## License

MIT
