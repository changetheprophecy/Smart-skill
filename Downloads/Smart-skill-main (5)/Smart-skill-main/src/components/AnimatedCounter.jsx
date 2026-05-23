import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function extractPrefix(value) {
  const match = String(value).match(/^[^0-9.-]+/);
  return match ? match[0] : "";
}

function extractSuffix(value) {
  const match = String(value).match(/[^0-9.-]+$/);
  return match ? match[0] : "";
}

function parseCounterValue(value) {
  const numericValue = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export default function AnimatedCounter({
  value,
  duration = 1400,
  delay = 0,
  className = "",
}) {
  const ref = useRef(null);
  const shouldAnimate = useInView(ref, { once: true, margin: "-20% 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  const targetValue = useMemo(() => parseCounterValue(value), [value]);
  const prefix = useMemo(() => extractPrefix(value), [value]);
  const suffix = useMemo(() => extractSuffix(value), [value]);

  useEffect(() => {
    if (!shouldAnimate) {
      return undefined;
    }

    let frameId;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(targetValue * easedProgress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [duration, shouldAnimate, targetValue]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay }}
      className={`tabular-nums ${className}`}
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
