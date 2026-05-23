import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Brain, Rocket, Zap } from "lucide-react";

import { platformStats, swipeUsers } from "../data/mockData";

import AnimatedCounter from "../components/AnimatedCounter";
import StarRating from "../components/StarRating";

const featuredUsers = swipeUsers.slice(0, 3);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.7,
    delay,
  },
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 blur-3xl rounded-full" />
      </div>

      {/* HERO */}
      <section className="relative py-28 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            {...fadeUp()}
            className="inline-flex items-center gap-2 bg-base-100/90 border border-base-300/70 dark:border-base-300/20 backdrop-blur-xl px-5 py-2 rounded-full mb-8 shadow-[0_8px_24px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_24px_rgba(15,23,42,0.28)] transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_22px_rgba(79,70,229,0.22)]"
          >
            <Sparkles size={15} className="text-primary" />
            <span className="text-sm font-semibold tracking-[0.12em] text-slate-700 dark:text-slate-100">
              <span className="text-sky-700 dark:text-sky-300">Learn</span>
              <span className="text-slate-500 dark:text-slate-300/80"> • </span>
              <span className="text-violet-700 dark:text-violet-300">
                Teach
              </span>
              <span className="text-slate-500 dark:text-slate-300/80"> • </span>
              <span className="text-pink-600 dark:text-pink-300">Connect</span>
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-6xl lg:text-8xl font-black leading-tight mb-8"
          >
            Find People
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Who Match Your Skills
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="max-w-2xl mx-auto text-lg text-base-content/60 leading-relaxed mb-10"
          >
            SkillSwap helps people exchange knowledge, collaborate, and grow
            together through real human connections.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex justify-center">
            <Link
              to="/swipe"
              className="btn btn-primary btn-lg rounded-2xl px-10 border-0 shadow-glow hover:scale-105 transition-all text-white"
            >
              Start Swiping
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {platformStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(i * 0.1)}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center transition-all duration-300 ease-in-out hover:scale-[1.03] hover:border-purple-300/80 hover:shadow-[0_0_26px_rgba(168,85,247,0.55),0_0_14px_rgba(59,130,246,0.4)]"
            >
              <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                <AnimatedCounter value={stat.value} delay={i * 0.08} />
              </h3>

              <p className="text-sm text-base-content/50 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">How It Works</h2>

            <p className="text-base-content/50 text-lg">
              Start your learning journey in 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain />,
                title: "Share Skills",
                desc: "Tell people what you can teach.",
              },
              {
                icon: <Users />,
                title: "Match People",
                desc: "Find users with similar goals.",
              },
              {
                icon: <Rocket />,
                title: "Grow Together",
                desc: "Learn, collaborate, and improve.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.15)}
                className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:border-purple-300/80 hover:shadow-[0_0_26px_rgba(168,85,247,0.55),0_0_14px_rgba(59,130,246,0.4)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>

                <p className="text-base-content/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USERS */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Featured Members</h2>

            <p className="text-base-content/50">
              Meet talented people from the community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredUsers.map((user, i) => (
              <motion.div
                key={user.id}
                {...fadeUp(i * 0.1)}
                className="rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-[1.03] hover:border-purple-300/80 hover:shadow-[0_0_26px_rgba(168,85,247,0.55),0_0_14px_rgba(59,130,246,0.4)]"
              >
                <div className="h-36 bg-gradient-to-br from-primary/30 to-secondary/20 flex justify-center items-end">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-base-100 translate-y-12 object-cover"
                  />
                </div>

                <div className="pt-16 p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{user.name}</h3>

                  <StarRating rating={user.rating} />

                  <div className="badge badge-primary mt-4">
                    {user.matchPercent}% Match
                  </div>

                  <Link
                    to="/swipe"
                    className="btn btn-primary w-full rounded-2xl mt-6 text-white"
                  >
                    Connect
                    <Zap size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
