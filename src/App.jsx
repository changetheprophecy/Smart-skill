// App.jsx — Root component with React Router setup
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SwipePage from "./pages/SwipePage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/swipe"   element={<SwipePage />} />
          <Route path="/chat"    element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
