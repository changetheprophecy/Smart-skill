import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, RotateCcw, Zap } from "lucide-react";
import { swipeUsers } from "../data/mockData";
import SwipeCard from "../components/SwipeCard";

export default function SwipePage() {
  const [users, setUsers] = useState(swipeUsers);
  const [history, setHistory] = useState([]);
  const [matches, setMatches] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (type, name) => {
    setToast({ type, name });
    setTimeout(() => setToast(null), 1800);
  };

  const handleSwipe = (direction) => {
    if (!users.length) return;

    const swiped = users[0];

    setHistory((prev) => [swiped, ...prev]);
    setUsers((prev) => prev.slice(1));

    if (direction === "like") {
      setMatches((prev) => [...prev, swiped]);
      showToast("like", swiped.name);
    } else {
      showToast("skip", swiped.name);
    }
  };

  const handleUndo = () => {
    if (!history.length) return;

    const last = history[0];

    setHistory((prev) => prev.slice(1));
    setUsers((prev) => [last, ...prev]);
    setMatches((prev) => prev.filter((m) => m.id !== last.id));
  };

  return (
    <div className="min-h-screen bg-base-200/30 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">
            Find Your <span className="text-primary">Skill Match</span>
          </h1>
          <p className="text-base-content/50">
            {users.length > 0
              ? `${users.length} people waiting`
              : "You're all caught up!"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 justify-center">

          {/* CARD STACK */}
          <div className="flex flex-col items-center gap-6 w-full max-w-sm">

            <div className="relative w-full h-[580px]">

              <AnimatePresence>
                {users.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-base-100 rounded-3xl p-8 text-center shadow-xl"
                  >
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold">All done!</h3>

                    <button
                      onClick={() => {
                        setUsers(swipeUsers);
                        setHistory([]);
                      }}
                      className="btn btn-primary mt-4 rounded-xl"
                    >
                      <RotateCcw size={16} /> Refresh
                    </button>
                  </motion.div>
                ) : (
                  [...users].slice(0, 3).reverse().map((user, i, arr) => {
                    const index = arr.length - 1 - i;
                    const isTop = index === 0;

                    return (
                      <SwipeCard
                        key={user.id}
                        user={user}
                        index={index}
                        isTop={isTop}
                        onSwipe={handleSwipe}
                      />
                    );
                  })
                )}
              </AnimatePresence>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">

              <button
                onClick={() => handleSwipe("skip")}
                disabled={!users.length}
                className="btn btn-circle border-2 border-error text-error hover:bg-error hover:text-white"
              >
                <X size={22} />
              </button>

              <button
                onClick={handleUndo}
                disabled={!history.length}
                className="btn btn-circle"
              >
                <RotateCcw size={18} />
              </button>

              <button
                onClick={() => handleSwipe("like")}
                disabled={!users.length}
                className="btn btn-circle border-2 border-success text-success hover:bg-success hover:text-white"
              >
                <Heart size={22} />
              </button>

            </div>
          </div>

          {/* MATCHES */}
          <div className="w-full max-w-xs">
            <div className="bg-base-100 rounded-3xl p-6 shadow-xl">

              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} className="text-primary" />
                <h3 className="font-bold">Matches</h3>
                <span className="ml-auto text-sm">{matches.length}</span>
              </div>

              {matches.length === 0 ? (
                <p className="text-sm text-base-content/40">
                  No matches yet
                </p>
              ) : (
                <div className="space-y-2">
                  {matches.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-3 p-2 rounded-xl bg-base-200"
                    >
                      <img
                        src={m.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold">{m.name}</p>
                        <p className="text-xs opacity-50">
                          {m.matchPercent}% match
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white ${
              toast.type === "like" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.type === "like"
              ? `❤️ Liked ${toast.name}`
              : `❌ Skipped ${toast.name}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}