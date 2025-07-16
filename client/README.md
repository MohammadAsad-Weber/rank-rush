# 🖥️ Leaderboard Client

A modern, responsive React-based frontend for a dynamic leaderboard system where users can claim random points and view real-time rankings.

## 📌 Features

- **User Selection:** _Dropdown to select from existing users_
- **Add User:** _Add new users from the UI (stored in DB)_
- **Claim Random Points:** _Award random points (1–10) on button click_
- **Dynamic Leaderboard:** _Realtime UI update on every point claim_
- **Fast UI:** _Built with Vite, React 19, and TailwindCSS 4_
- **State Management:** _Powered by TanStack React Query_

## 🏗️ Tech Stack

- **Vite**
- **React 19**
- **Tailwind CSS 4**
- **React Router DOM**
- **Radix UI**
- **React Hook Form + Zod**
- **Axios**
- **TanStack React Query**

## 📂 Folder Structure

Here is an overview of the folder structure:

```ini
client/
├── src/               # Application source code
│   ├── assets/        # Static assets
│   └── components/    # Shared and reusable React UI components
│   └── context/       # Global state management
│   └── hooks/         # Custom React hooks for encapsulating logic
│   └── lib/           # Utility libraries and third-party integrations
│   └── schemas/       # Zod validation schema definitions
│   └── service/       # API service modules
│   └── utilities/     # Reusable helper functions and utility logic
│   └── App.tsx        # Main application component
│   └── main.tsx       # Entry point for React application
└── .env.local         # Environvent variables
```

## ⚙️ Getting Started

To get started with the development of the client-side, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MohammadAsad-Weber/rank-rush.git
   cd rank-rush/client
   ```

2. **Install Dependencies**

   _Install the necessary dependencies using npm:_

   ```bash
   npm install
   ```

3. **Start the Development Server**

   _To start the development server, run the following command:_

   ```bash
   npm run dev
   ```

    _This will start the application on `http://localhost:5173`._

## 🌍 Environment Variables

You need to set up environment variables for the app to function correctly. Create a `.env.local` file in the root of the client folder and add the following:

```ini
VITE_BACKEND_URL=YOUR_BACKEND_URL
```

This URL points to the server-side API.

## 📃 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Mohammad Asad  
Frontend Developer & MERN Stack Enthusiast
