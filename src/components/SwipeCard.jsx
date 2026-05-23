import { motion, useMotionValue, useTransform } from "framer-motion";

export default function SwipeCard({ user, onSwipe, isTop, index }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  const handleDragEnd = (_, info) => {
    if (!isTop) return;

    if (info.offset.x > 120) {
      onSwipe("like");
    } else if (info.offset.x < -120) {
      onSwipe("skip");
    }
  };

  return (
    <motion.div
      drag={isTop ? "x" : false}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      initial={{
        scale: 1 - index * 0.05,
        y: index * 12,
        opacity: 0,
      }}
      animate={{
        scale: 1 - index * 0.05,
        y: index * 12,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        x: x.get() > 0 ? 300 : -300,
        rotate: x.get() > 0 ? 20 : -20,
        transition: { duration: 0.3 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="w-full h-full bg-base-100 rounded-3xl shadow-xl overflow-hidden">

        {/* IMAGE */}
        <img
          src={user.avatar}
          className="w-full h-2/3 object-cover"
        />

        {/* INFO */}
        <div className="p-4">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-sm opacity-60 mb-2">
            {user.matchPercent}% match
          </p>
          <p className="text-sm">{user.bio}</p>
        </div>
      </div>
    </motion.div>
  );
}