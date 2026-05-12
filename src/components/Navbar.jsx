// Navbar — top navigation bar with links and theme toggle
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Zap, Menu, X } from "lucide-react";
import { useState } from "react";

// Navigation links config
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/swipe", label: "Discover" },
  { to: "/chat", label: "Messages" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300 px-4 lg:px-8">
      {/* Brand */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="font-display font-bold text-lg text-gradient hidden sm:block">
            SkillSwap
          </span>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(to)
                    ? "bg-primary text-primary-content shadow-sm"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side controls */}
      <div className="navbar-end gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle btn-sm"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} className="text-accent" /> : <Moon size={18} />}
        </button>

        {/* Avatar */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4"
                alt="Profile"
              />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-2xl w-44 border border-base-300">
            <li><Link to="/profile" className="rounded-xl">Profile</Link></li>
            <li><Link to="/swipe" className="rounded-xl">Find Matches</Link></li>
            <li><Link to="/chat" className="rounded-xl">Messages</Link></li>
          </ul>
        </div>

        {/* Mobile menu button */}
        <button
          className="btn btn-ghost btn-circle lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-100 border-b border-base-300 shadow-lg lg:hidden">
          <ul className="flex flex-col p-4 gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(to)
                      ? "bg-primary text-primary-content"
                      : "text-base-content/70 hover:bg-base-200"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
