// StarRating — displays a star rating visually
import { Star } from "lucide-react";

export default function StarRating({ rating, size = 14 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < fullStars
              ? "fill-accent text-accent"
              : i === fullStars && hasHalf
              ? "fill-accent/50 text-accent"
              : "fill-base-300 text-base-300"
          }
        />
      ))}
      <span className="ml-1 text-xs text-base-content/60 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
