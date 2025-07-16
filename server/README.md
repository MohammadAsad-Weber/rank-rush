# 🧠 Leaderboard Server

A lightweight and scalable Node.js backend that manages users, point claims, rankings, and claim history using MongoDB.

## 📌 Features

- **Secure REST API** _with CORS, Helmet, and dotenv_
- **Random Points Generator:** _Backend-controlled_
- **Dynamic Ranking Logic:** _Based on total points_
- **Claim History Storage:** _All point claims logged in MongoDB_
- **Zod Validation:** _Input validation on user and claim actions_

## 🏗️ Tech Stack

- **Node.js** _(ESM + TypeScript + Import alias)_
- **Express 5** – _API server_
- **MongoDB + Mongoose 8** – _Document database_
- **Zod** – _For schema validation_
- **Helmet** – _For securing HTTP headers_
- **dotenv** – _For config_

## 📂 Folder Structure

```ini
server/
└── src/
    ├── controllers/      # Request handlers
    └── middlewares/      # Middlewares
    └── models/           # Mongoose schema
    └── routes/           # Express route definitions
    └── types/            # Custom TypeScript type
    └── utilities/        # Helper functions
    └── validators/       # Request payload validation
    └── index.ts          # Main server entry point
```

## ⚙️ Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/MohammadAsad-Weber/rank-rush.git
    cd rank-rush/server
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure environment variables**

    Create a `.env` file in the `server/` root:

    ```ini
    ENVIRONMENT=YOUR_ENVIRONMENT
    MONGODB_URL=YOUR_MONGODB_URL
    FRONTEND_URL=YOUR_FRONTEND_URL
    ```

4.  **Run the server**

    ```bash
    npm run dev
    ```

    The server will be accessible at `http://localhost:3000` or at the port defined in the `.env` configuration file.

    **To build:**

    ```bash
    npm run build
    npm run start
    ```

## 📊 Data Models

### User

```ts
{
  _id: ObjectId,
  fullname: string,
  points: number
}
```

### ClaimHistory

```ts
{
  _id: ObjectId,
  user: ObjectId,
  pointsClaimed: number
}
```

## 🛠️ API Endpoints

- `GET /api/user`: Get all the users
- `POST /api/user`: Register a new user
- `POST /api/points/:id`: Claim points for the specific user
- `GET /api/leaderboard`: Get all users with ranks sorted by totalPoints

## 📃 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Mohammad Asad  
Frontend Developer & MERN Stack Enthusiast
