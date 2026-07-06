import { memo, useEffect, useState } from "react";

function AnimatedCounter({ value, duration = 1200 }) {
  const isString = typeof value === "string";
  const numericStr = isString ? value.replace(/[^0-9.]/g, "") : String(value);
  const parsedVal = parseFloat(numericStr);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isNaN(parsedVal)) {
      setCount(value);
      return;
    }

    let start = 0;
    const end = parsedVal;
    if (start === end) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = progress * (end - start) + start;

      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(animate);
  }, [value, parsedVal, duration]);

  if (isNaN(parsedVal)) {
    return <span>{value}</span>;
  }

  if (isString && value.includes("%")) {
    return <span>{count.toFixed(1)}%</span>;
  }

  // K/D ratio (typically 1.18 or 4.25)
  if (isString && value.includes(".") && numericStr.split(".")[1]?.length > 0) {
    const decimalPlaces = numericStr.split(".")[1].length;
    return <span>{count.toFixed(decimalPlaces)}</span>;
  }

  if (isString && value.includes(",")) {
    return <span>{Math.floor(count).toLocaleString()}</span>;
  }

  return <span>{Math.floor(count)}</span>;
}

const StatCard = memo(function StatCard({ label, value }) {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-6 text-center hover:border-accent-secondary/30 transition-all duration-300 group">
      <p className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="font-poppins text-3xl md:text-4xl font-extrabold text-accent-secondary group-hover:text-accent-primary transition-colors">
        <AnimatedCounter value={value} />
      </p>
    </div>
  );
});

export default StatCard;
