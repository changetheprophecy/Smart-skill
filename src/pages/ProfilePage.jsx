// ProfilePage — displays the current user's profile with skills, ratings, and stats
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Edit3, Star, Award, Users, BookOpen } from "lucide-react";
import { currentUser, swipeUsers } from "../data/mockData";
import SkillBadge from "../components/SkillBadge";
import StarRating from "../components/StarRating";

// Fake reviews for the profile page
const reviews = [
  {
    id: 1,
    reviewer: swipeUsers[0],
    rating: 5,
    comment: "Alex is an incredible Figma teacher! Super patient and explains everything clearly. Highly recommended!",
    skill: "Figma",
    date: "April 2025",
  },
  {
    id: 2,
    reviewer: swipeUsers[1],
    rating: 5,
    comment: "Amazing photography session. Alex has a great eye and taught me so much about composition in just one hour.",
    skill: "Photography",
    date: "March 2025",
  },
  {
    id: 3,
    reviewer: swipeUsers[2],
    rating: 4,
    comment: "Really good at UI/UX fundamentals. The session ran a bit long but was worth every minute!",
    skill: "UI/UX Design",
    date: "February 2025",
  },
];

// Stat card component (reusable within this page)
function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className="card bg-base-100 card-shadow rounded-2xl p-5 text-center">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="text-2xl font-display font-bold">{value}</div>
      <div className="text-xs text-base-content/50 mt-1">{label}</div>
    </div>
  );
}

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("skills"); // "skills" | "reviews"

  const user = currentUser;

  return (
    <div className="min-h-screen bg-base-200/30 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── PROFILE CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card bg-base-100 card-shadow rounded-3xl overflow-hidden"
        >
          {/* Header banner */}
          <div
            className="h-40 relative"
            style={{
              background: "linear-gradient(135deg, #6c47ff22 0%, #ff6b6b22 50%, #ffd93d22 100%)",
            }}
          >
            {/* Decorative circles */}
            <div className="absolute top-4 right-8 w-24 h-24 rounded-full bg-primary/10 blur-xl" />
            <div className="absolute bottom-4 left-16 w-16 h-16 rounded-full bg-secondary/10 blur-xl" />

            {/* Edit button */}
            <button
              onClick={() => setEditMode(!editMode)}
              className="absolute top-4 right-4 btn btn-sm btn-ghost gap-2 rounded-xl bg-base-100/60 backdrop-blur-sm hover:bg-base-100"
            >
              <Edit3 size={14} />
              {editMode ? "Done" : "Edit Profile"}
            </button>
          </div>

          {/* Profile info */}
          <div className="px-6 pb-6">
            {/* Avatar — overlaps banner */}
            <div className="relative -mt-16 mb-4 flex items-end justify-between">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-28 h-28 rounded-full border-4 border-base-100 shadow-xl"
                />
                {/* Online indicator */}
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-success rounded-full border-2 border-base-100" />
              </div>

              {/* Rating badge */}
              <div className="mb-2">
                <div className="badge badge-lg gap-1.5 bg-accent text-accent-content font-bold shadow-md">
                  <Star size={13} className="fill-current" />
                  {user.rating} · {user.reviewCount} reviews
                </div>
              </div>
            </div>

            {/* Name & bio */}
            <div className="space-y-2">
              <div>
                <h1 className="text-3xl font-display font-bold">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-base-content/50">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {user.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> Joined {user.joined}
                  </span>
                </div>
              </div>

              {editMode ? (
                <textarea
                  defaultValue={user.bio}
                  className="textarea textarea-bordered w-full rounded-2xl text-sm resize-none bg-base-200/60"
                  rows={3}
                />
              ) : (
                <p className="text-base-content/70 text-sm leading-relaxed">{user.bio}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard icon={Users}     value={user.matchCount}   label="Matches"         color="bg-primary" />
          <StatCard icon={BookOpen}  value="48"               label="Sessions Done"    color="bg-secondary" />
          <StatCard icon={Award}     value={user.rating}      label="Avg Rating"       color="bg-accent" />
          <StatCard icon={Star}      value={user.reviewCount} label="Reviews"          color="bg-success" />
        </motion.div>

        {/* ── TABS: SKILLS | REVIEWS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card bg-base-100 card-shadow rounded-3xl overflow-hidden"
        >
          {/* Tab navigation */}
          <div className="tabs tabs-bordered px-6 pt-4">
            <button
              onClick={() => setActiveTab("skills")}
              className={`tab tab-lg font-semibold ${activeTab === "skills" ? "tab-active text-primary" : "text-base-content/50"}`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`tab tab-lg font-semibold ${activeTab === "reviews" ? "tab-active text-primary" : "text-base-content/50"}`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          <div className="p-6">
            {/* SKILLS TAB */}
            {activeTab === "skills" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Skills offered */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <h3 className="font-semibold text-sm text-base-content/60 uppercase tracking-widest">
                      Can Teach
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill) => (
                      <SkillBadge key={skill} skill={skill} variant="offered" />
                    ))}
                    {editMode && (
                      <button className="badge badge-outline badge-primary border-dashed gap-1 cursor-pointer hover:bg-primary/10">
                        + Add skill
                      </button>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="divider my-2" />

                {/* Skills wanted */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <h3 className="font-semibold text-sm text-base-content/60 uppercase tracking-widest">
                      Wants to Learn
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((skill) => (
                      <SkillBadge key={skill} skill={skill} variant="wanted" />
                    ))}
                    {editMode && (
                      <button className="badge badge-outline badge-secondary border-dashed gap-1 cursor-pointer hover:bg-secondary/10">
                        + Add skill
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress bars for top skills */}
                <div className="divider my-2" />
                <div>
                  <h3 className="font-semibold text-sm text-base-content/60 uppercase tracking-widest mb-4">
                    Skill Proficiency
                  </h3>
                  <div className="space-y-3">
                    {[
                      { skill: "UI/UX Design", level: 92 },
                      { skill: "Figma", level: 88 },
                      { skill: "Photography", level: 75 },
                    ].map(({ skill, level }) => (
                      <div key={skill}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{skill}</span>
                          <span className="text-base-content/40">{level}%</span>
                        </div>
                        <div className="w-full bg-base-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${level}%` }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* Overall rating summary */}
                <div className="flex items-center gap-6 p-4 bg-base-200/60 rounded-2xl mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-display font-bold text-primary">{user.rating}</div>
                    <StarRating rating={user.rating} size={16} />
                    <div className="text-xs text-base-content/40 mt-1">{user.reviewCount} reviews</div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = stars === 5 ? 18 : stars === 4 ? 4 : stars === 3 ? 2 : 0;
                      const pct = (count / user.reviewCount) * 100;
                      return (
                        <div key={stars} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-base-content/50">{stars}</span>
                          <Star size={10} className="text-accent fill-accent shrink-0" />
                          <div className="flex-1 bg-base-300 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full bg-accent"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-base-content/40 w-4">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual reviews */}
                {reviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-base-200/40 rounded-2xl space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={review.reviewer.avatar}
                          alt={review.reviewer.name}
                          className="w-9 h-9 rounded-full border-2 border-base-200"
                        />
                        <div>
                          <p className="font-semibold text-sm">{review.reviewer.name}</p>
                          <p className="text-xs text-base-content/40">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StarRating rating={review.rating} size={12} />
                        <span className="badge badge-primary badge-xs">{review.skill}</span>
                      </div>
                    </div>
                    <p className="text-sm text-base-content/70 leading-relaxed pl-11">
                      "{review.comment}"
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
