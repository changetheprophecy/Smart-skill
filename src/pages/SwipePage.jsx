import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Zap, X, Heart } from "lucide-react";
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

  const handleSwipe = (dir) => {
    if (!users.length) return;

    const current = users[0];

    setHistory((p) => [current, ...p]);
    setUsers((p) => p.slice(1));

    if (dir === "like") {
      setMatches((p) => [...p, current]);
      showToast("like", current.name);
    } else {
      showToast("skip", current.name);
    }
  };

  const handleUndo = () => {
    if (!history.length) return;

    const last = history[0];

    setHistory((p) => p.slice(1));
    setUsers((p) => [last, ...p]);
    setMatches((p) => p.filter((m) => m.id !== last.id));
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content relative overflow-hidden px-4 py-10">
      {/* background glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">
            Find Your <span className="text-gradient">Skill Match</span>
          </h1>

          <p className="text-base-content/60 mt-3">
            Swipe, connect, and grow together
          </p>

          <p className="text-sm text-base-content/40 mt-2">
            {users.length} profiles available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 justify-center">
          {/* SWIPE AREA */}
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="relative w-full h-[620px]">
              <AnimatePresence>
                {users.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 glass rounded-[32px] flex flex-col items-center justify-center text-center p-10"
                  >
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold mb-2">
                      No more profiles
                    </h2>
                    <p className="text-base-content/60 mb-6">
                      Come back later for new matches
                    </p>

                    <button
                      onClick={() => {
                        setUsers(swipeUsers);
                        setHistory([]);
                        setMatches([]);
                      }}
                      className="btn btn-vibrant-primary rounded-2xl font-semibold"
                    >
                      <RotateCcw size={16} />
                      Restart
                    </button>
                  </motion.div>
                ) : (
                  [...users]
                    .slice(0, 3)
                    .reverse()
                    .map((user, i, arr) => {
                      const index = arr.length - 1 - i;

                      return (
                        <div
                          key={user.id}
                          className="absolute w-full h-full"
                          style={{
                            transform: `scale(${1 - index * 0.04}) translateY(${index * 12}px)`,
                            zIndex: 10 - index,
                          }}
                        >
                          <SwipeCard
                            user={user}
                            index={index}
                            isTop={index === 0}
                            onSwipe={handleSwipe}
                          />
                        </div>
                      );
                    })
                )}
              </AnimatePresence>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => handleSwipe("skip")}
                className="btn btn-vibrant-error gap-2 font-semibold"
              >
                <X size={16} />
                Reject
              </button>

              <button
                onClick={handleUndo}
                className="btn btn-icon-vibrant bg-slate-400 hover:bg-slate-500 text-white"
              >
                <RotateCcw size={18} />
              </button>

              <button
                onClick={() => handleSwipe("like")}
                className="btn btn-vibrant-success gap-2 font-semibold"
              >
                <Heart size={16} />
                Accept
              </button>
            </div>
          </div>

          {/* MATCHES */}
          <div className="w-full max-w-sm">
            <div className="glass rounded-[32px] p-6">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-primary" />
                <h3 className="font-bold text-lg">Matches</h3>
                <span className="ml-auto text-sm text-base-content/50">
                  {matches.length}
                </span>
              </div>

              {matches.length === 0 ? (
                <p className="text-base-content/40 text-sm">No matches yet</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-auto pr-2">
                  {matches.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/60 hover:bg-base-200 transition"
                    >
                      <img
                        src={m.avatar}
                        className="w-12 h-12 rounded-2xl object-cover"
                      />

                      <div className="min-w-0">
                        <p className="font-semibold truncate">{m.name}</p>

                        <p className="text-xs text-base-content/50 truncate">
                          {m.location || "Location not set"}
                        </p>
                      </div>

                      <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {m.matchPercent}%
                      </span>
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl text-white ${
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
