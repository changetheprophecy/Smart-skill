// SkillBadge — reusable badge component for skill tags
// variant: "offered" (purple) | "wanted" (orange) | "default"
export default function SkillBadge({ skill, variant = "default" }) {
  const styles = {
    offered: "badge badge-primary badge-outline font-medium text-xs",
    wanted: "badge badge-secondary badge-outline font-medium text-xs",
    default: "badge badge-ghost font-medium text-xs",
  };

  return <span className={styles[variant]}>{skill}</span>;
}
