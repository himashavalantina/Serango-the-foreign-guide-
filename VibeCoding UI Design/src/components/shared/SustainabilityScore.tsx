import { Leaf } from "lucide-react";

interface SustainabilityScoreProps {
  score: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function SustainabilityScore({ score, size = "md", showLabel = true }: SustainabilityScoreProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "#3B82F6"; // Blue
    if (score >= 60) return "#F7DC79"; // Yellow
    if (score >= 40) return "#F7A160"; // Orange
    return "#EF4444"; // Red
  };

  const getLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const color = getColor(score);

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${sizeClasses[size]}`} style={{ backgroundColor: color + "20" }}>
      <Leaf className={iconSizes[size]} style={{ color }} />
      <span className="font-medium" style={{ color }}>
        {score}/100
      </span>
      {showLabel && (
        <>
          <span className="text-gray-400">•</span>
          <span style={{ color }}>{getLabel(score)}</span>
        </>
      )}
    </div>
  );
}
