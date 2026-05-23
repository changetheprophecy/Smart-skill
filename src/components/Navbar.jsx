import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, Zap, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/swipe", label: "Discover" },
  { to: "/chat", label: "Messages" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* BACKDROP NAVBAR */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          fixed top-0 left-0 w-full z-50
          backdrop-blur-xl
          bg-base-100/60
          border-b border-white/10
        "
      >
        <div className="navbar px-4 lg:px-8 max-w-7xl mx-auto">
          {/* BRAND */}
          <div className="navbar-start">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition">
                <Zap size={16} className="text-white" />
              </div>

              <span className="font-display font-bold text-gradient text-lg hidden sm:block">
                SkillSwap
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="navbar-center hidden lg:flex relative">
            <div className="flex gap-1 relative">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`
                    relative px-4 py-2 rounded-xl text-sm font-medium transition
                    ${
                      isActive(to)
                        ? "text-primary"
                        : "text-base-content/70 hover:text-base-content"
                    }
                  `}
                >
                  {label}

                  {/* ACTIVE UNDERLINE */}
                  {isActive(to) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-2 right-2 -bottom-1 h-[2px] bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="navbar-end gap-2">
            {/* THEME TOGGLE */}
            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun size={18} className="text-accent" />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* AUTH */}
            {isAuthenticated && user ? (
              <div className="dropdown dropdown-end">
                {/* AVATAR */}
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user.avatar} alt="user" />
                  </div>
                </label>

                {/* DROPDOWN */}
                <AnimatePresence>
                  <ul
                    tabIndex={0}
                    className="
                      menu menu-sm dropdown-content mt-3 p-3
                      bg-base-100/90 backdrop-blur-xl
                      border border-white/10
                      shadow-xl rounded-2xl w-48
                    "
                  >
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Link to="/profile" className="rounded-xl">
                        Profile
                      </Link>
                    </motion.li>

                    <li>
                      <Link to="/swipe" className="rounded-xl">
                        Discover
                      </Link>
                    </li>

                    <li>
                      <Link to="/chat" className="rounded-xl">
                        Messages
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={logout}
                        className="text-error rounded-xl flex gap-2 items-center"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-sm text-white rounded-lg"
              >
                Sign In
              </Link>
            )}

            {/* MOBILE BUTTON */}
            <button
              className="btn btn-ghost btn-circle lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─────────────────────────────────────
          MOBILE SLIDE MENU
      ───────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="
                fixed right-0 top-0 h-full w-72 z-50
                bg-base-100/90 backdrop-blur-xl
                border-l border-white/10
                p-6
              "
            >
              {/* CLOSE */}
              <button
                onClick={() => setMenuOpen(false)}
                className="btn btn-ghost btn-circle mb-6"
              >
                <X />
              </button>

              {/* LINKS */}
              <div className="flex flex-col gap-3">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      px-4 py-3 rounded-xl text-sm
                      ${
                        isActive(to)
                          ? "bg-primary text-white"
                          : "hover:bg-base-200"
                      }
                    `}
                  >
                    {label}
                  </Link>
                ))}

                {!isAuthenticated && (
                  <Link to="/login" className="btn btn-primary text-white mt-4">
                    Sign In
                  </Link>
                )}

                {isAuthenticated && (
                  <button
                    onClick={logout}
                    className="btn btn-error mt-4 text-white"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
