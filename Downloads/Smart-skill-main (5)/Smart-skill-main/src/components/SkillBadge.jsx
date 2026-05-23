// SkillBadge — reusable badge component for skill tags
// variant: "offered" (blue) | "wanted" (pink) | "default"
export default function SkillBadge({ skill, variant = "default" }) {
  const styles = {
    offered:
      "inline-flex items-center justify-center rounded-full border border-blue-500/20 bg-blue-950/40 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-blue-400 transition-all duration-200 ease-out hover:bg-blue-900/60 hover:text-blue-200",
    wanted:
      "inline-flex items-center justify-center rounded-full border border-pink-500/20 bg-pink-950/40 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-pink-400 transition-all duration-200 ease-out hover:bg-pink-900/60 hover:text-pink-200",
    default:
      "inline-flex items-center justify-center rounded-full border border-white/10 bg-base-200/50 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-base-content/70 transition-all duration-200 ease-out hover:bg-base-200",
  };

  return <span className={styles[variant]}>{skill}</span>;
}
