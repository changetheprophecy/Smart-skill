import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  MapPin,
  Calendar,
  Edit3,
  Star,
  Users,
  BookOpen,
  TrendingUp,
  LogIn,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { swipeUsers } from "../data/mockData";
import SkillBadge from "../components/SkillBadge";
import StarRating from "../components/StarRating";

const reviews = [
  {
    id: 1,
    reviewer: swipeUsers[0],
    rating: 5,
    comment: "Super clear explanations and very patient!",
    date: "Apr 2025",
  },
  {
    id: 2,
    reviewer: swipeUsers[1],
    rating: 5,
    comment: "Great teaching style!",
    date: "Mar 2025",
  },
];

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="bg-base-100 rounded-2xl p-4 text-center shadow">
      <Icon className="mx-auto mb-2 text-primary" size={18} />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-base-content/50">{label}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("skills");
  const [edit, setEdit] = useState(false);

  // 🔒 NOT LOGGED IN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 p-8 rounded-3xl shadow-xl text-center max-w-md w-full"
        >
          <h1 className="text-2xl font-bold mb-2">You’re not logged in</h1>
          <p className="text-base-content/60 mb-6">
            Please login to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary w-full flex items-center gap-2 justify-center"
          >
            <LogIn size={18} />
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  // 🔓 PROFILE UI
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-base-100 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-start flex-wrap gap-4">

            <div className="flex gap-4 items-center">
              <img
                src={user.avatar}
                className="w-24 h-24 rounded-2xl"
              />

              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>

                <p className="text-sm text-base-content/60 flex items-center gap-2">
                  <MapPin size={14} />
                  {user.location || "No location"}
                </p>

                <p className="text-sm text-base-content/60 flex items-center gap-2">
                  <Calendar size={14} />
                  Joined recently
                </p>

                <p className="text-sm mt-2 text-base-content/70 max-w-md">
                  {user.bio || "No bio yet"}
                </p>
              </div>
            </div>

            <div className="badge badge-primary gap-1">
              <Star size={12} />
              {user.rating || 5}
            </div>

          </div>

          <button
            onClick={() => setEdit(!edit)}
            className="btn btn-sm btn-outline mt-4"
          >
            <Edit3 size={14} />
            {edit ? "Done Editing" : "Edit Profile"}
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Users} value="12" label="Matches" />
          <StatCard icon={BookOpen} value="48" label="Sessions" />
          <StatCard icon={Star} value={user.rating || 5} label="Rating" />
          <StatCard icon={TrendingUp} value="8" label="Reviews" />
        </div>

        {/* TABS */}
        <div className="bg-base-100 rounded-3xl p-4">

          <div className="flex gap-2 mb-4">
            {["skills", "reviews"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl font-semibold ${
                  tab === t
                    ? "bg-primary text-white"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* SKILLS */}
            {tab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs text-base-content/40 mb-2">CAN TEACH</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(user.skillsOffered || []).map((s) => (
                    <SkillBadge key={s} skill={s} variant="offered" />
                  ))}
                </div>

                <p className="text-xs text-base-content/40 mb-2">WANTS</p>
                <div className="flex flex-wrap gap-2">
                  {(user.skillsWanted || []).map((s) => (
                    <SkillBadge key={s} skill={s} variant="wanted" />
                  ))}
                </div>
              </motion.div>
            )}

            {/* REVIEWS */}
            {tab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-base-200 rounded-2xl">
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <img
                          src={r.reviewer.avatar}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {r.reviewer.name}
                          </p>
                          <p className="text-xs text-base-content/40">
                            {r.date}
                          </p>
                        </div>
                      </div>

                      <StarRating rating={r.rating} size={12} />
                    </div>

                    <p className="text-sm mt-2 text-base-content/70">
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}