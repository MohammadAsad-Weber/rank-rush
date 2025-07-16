import { lazy } from "react";
import useTheme from "./hooks/useTheme";
import { Toaster } from "./components/ui/sonner";
import ModeToggle from "./components/mode-toggle";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy Imports
const ComboBox = lazy(() => import("./components/combo-box"));
const Leaderboard = lazy(() => import("./components/leaderboard"));
const ErrorPage = lazy(() => import("./components/error-page"));

function App() {
  // useTheme Hook
  const { theme } = useTheme();
  
  return (
    <BrowserRouter>
      <main className="w-full min-h-screen p-5 flex flex-col items-center justify-center">

        {/* TOGGLE THEME DROPDOWN */}
        <ModeToggle />

        {/* ROUTES */}
        <Routes>
          <Route index element={<ComboBox />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        {/* SONNER */}
        <Toaster
          richColors
          closeButton
          theme={theme}
          duration={2500}
          position="bottom-right"
        />
        
      </main>
    </BrowserRouter>
  );
}

export default App;
