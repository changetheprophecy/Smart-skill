// HomePage — Landing page with hero, stats, and skill categories
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { platformStats, skillCategories, swipeUsers } from "../data/mockData";
import SkillBadge from "../components/SkillBadge";
import StarRating from "../components/StarRating";

// Fade-up animation variant (reusable)
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// Top 3 featured users for the home page preview
const featuredUsers = swipeUsers.slice(0, 3);

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ─── HERO SECTION ────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-32 px-4">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">

          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles size={14} />
            <span>Skill exchange, reimagined</span>
          </motion.div>

          <motion.h1 {...fadeUp(0.1)} className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
            Trade Skills,{" "}
            <span className="text-gradient">Grow Together</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="text-lg lg:text-xl text-base-content/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            SkillSwap connects you with people who know what you want to learn — 
            and want to learn what you know. No money, just knowledge.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/swipe"
              className="btn btn-primary btn-lg rounded-2xl gap-2 px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-200 text-white"
            >
              Connect
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────────────── */}
      <section className="py-12 px-4 bg-base-200/60">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {platformStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(0.1 * i)}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-display font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-base-content/50 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────── */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <h2 className="text-4xl font-display font-bold mb-3">How It Works</h2>
          <p className="text-base-content/50 text-lg">Three simple steps to your first skill exchange</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🎯", step: "01", title: "List Your Skills", desc: "Tell us what you can teach and what you want to learn." },
            { icon: "💫", step: "02", title: "Swipe & Match", desc: "Swipe right on people who match your goals." },
            { icon: "🚀", step: "03", title: "Start Learning", desc: "Chat, schedule sessions, and grow together." },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              {...fadeUp(0.15 * i)}
              className="card bg-base-100 card-shadow rounded-3xl p-8 group hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="text-xs font-mono text-primary/60 mb-2">{item.step}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-base-content/60 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED USERS ──────────────────────────────── */}
      <section className="py-20 px-4 bg-base-200/40">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-display font-bold mb-2">Top Skill Sharers</h2>
              <p className="text-base-content/50">Highly-rated members ready to connect</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredUsers.map((user, i) => (
              <motion.div
                key={user.id}
                {...fadeUp(0.1 * i)}
                className="card bg-base-100 card-shadow rounded-3xl overflow-hidden"
              >
                <div className="h-28 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex justify-center items-end">
                  <img src={user.avatar} className="w-20 h-20 rounded-full border-4 border-base-100 translate-y-10" />
                </div>

                <div className="pt-14 p-6 text-center space-y-3">
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <StarRating rating={user.rating} />

                  <div className="badge badge-ghost text-xs">
                    {user.matchPercent}% match
                  </div>

                  <Link
                    to="/swipe"
                    className="btn btn-primary btn-sm w-full rounded-xl text-white"
                  >
                    Connect <Zap size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────── */}
      <section className="py-20 px-4">
        <motion.div
          {...fadeUp()}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-primary to-secondary p-1"
        >
          <div className="bg-base-100 rounded-[22px] p-12 text-center">

            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Swapping?
            </h2>

            <p className="text-base-content/60 mb-8">
              Join thousands trading knowledge every day.
            </p>

            <Link
              to="/swipe"
              className="btn btn-primary btn-lg rounded-2xl gap-2 px-10 shadow-lg hover:scale-105 transition-all text-white"
            >
              Start Matching Now <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}