// MatchPercentBadge — circular badge showing match percentage
export default function MatchPercentBadge({ percent }) {
  // Color changes based on match quality
  const color =
    percent >= 90 ? "text-success" :
    percent >= 75 ? "text-primary" :
    "text-warning";

  return (
    <div className={`flex flex-col items-center justify-center bg-base-100/90 rounded-2xl px-3 py-2 shadow-md border border-base-300`}>
      <span className={`text-2xl font-bold font-display ${color}`}>{percent}%</span>
      <span className="text-[10px] text-base-content/50 uppercase tracking-widest">Match</span>
    </div>
  );
}
