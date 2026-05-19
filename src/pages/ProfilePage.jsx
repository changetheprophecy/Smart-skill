import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Edit3,
  Star,
  Award,
  Users,
  BookOpen,
  TrendingUp,
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
    comment: "Super clear explanations and very patient. 10/10 experience!",
    skill: "Figma",
    date: "Apr 2025",
  },
  {
    id: 2,
    reviewer: swipeUsers[1],
    rating: 5,
    comment: "Great eye for detail in design sessions.",
    skill: "Photography",
    date: "Mar 2025",
  },
];

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="glass rounded-2xl p-4 text-center hover:scale-[1.02] transition">
      <Icon className="mx-auto mb-2 text-primary" size={18} />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-base-content/50">{label}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [tab, setTab] = useState("skills");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 py-10 px-4">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* ───── PROFILE HEADER ───── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl overflow-hidden"
        >

          {/* Banner */}
          <div className="h-44 relative bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20">
            <button
              onClick={() => setEdit(!edit)}
              className="absolute top-4 right-4 btn btn-sm btn-ghost bg-white/30 backdrop-blur"
            >
              <Edit3 size={14} />
              {edit ? "Done" : "Edit"}
            </button>
          </div>

          {/* Avatar */}
          <div className="px-6 pb-6 -mt-14 flex justify-between items-end">
            <div className="flex items-end gap-4">
              <img
                src={user.avatar}
                className="w-28 h-28 rounded-2xl border-4 border-base-100 shadow-xl"
              />

              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>

                <div className="flex gap-3 text-xs text-base-content/50 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {user.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {user.joined}
                  </span>
                </div>

                <p className="text-sm text-base-content/70 mt-2 max-w-md">
                  {user.bio}
                </p>
              </div>
            </div>

            <div className="badge badge-accent gap-1">
              <Star size={12} className="fill-current" />
              {user.rating}
            </div>
          </div>
        </motion.div>

        {/* ───── STATS ───── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Users} value={user.matchCount} label="Matches" />
          <StatCard icon={BookOpen} value="48" label="Sessions" />
          <StatCard icon={Award} value={user.rating} label="Rating" />
          <StatCard icon={TrendingUp} value={user.reviewCount} label="Reviews" />
        </div>

        {/* ───── TABS ───── */}
        <div className="glass rounded-3xl p-4">

          {/* Tab buttons */}
          <div className="flex gap-2 mb-4">
            {["skills", "reviews"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-sm transition ${
                  tab === t
                    ? "bg-primary text-white"
                    : "hover:bg-base-200"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <AnimatePresence mode="wait">

            {/* SKILLS */}
            {tab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-xs text-base-content/40 mb-2">CAN TEACH</p>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((s) => (
                      <SkillBadge key={s} skill={s} variant="offered" />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-base-content/40 mb-2">WANTS</p>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((s) => (
                      <SkillBadge key={s} skill={s} variant="wanted" />
                    ))}
                  </div>
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
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition"
                  >
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