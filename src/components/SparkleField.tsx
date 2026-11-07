import { SparkleIcon, StarIcon } from "./Icons";

type SparkleConfig = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
  kind: "sparkle" | "star";
  opacity: number;
};

const sparkleSets: Record<"entrance" | "cake", SparkleConfig[]> = {
  entrance: [
    { left: "8%", top: "20%", size: 17, delay: "-1.2s", duration: "4.2s", color: "#fff2ad", kind: "sparkle", opacity: 0.9 },
    { left: "16%", top: "74%", size: 11, delay: "-3.4s", duration: "5.1s", color: "#ffd0e3", kind: "star", opacity: 0.75 },
    { left: "31%", top: "12%", size: 10, delay: "-2s", duration: "3.8s", color: "#d8c8ff", kind: "sparkle", opacity: 0.65 },
    { left: "42%", top: "83%", size: 13, delay: "-4.1s", duration: "4.7s", color: "#fff6c6", kind: "sparkle", opacity: 0.8 },
    { left: "58%", top: "9%", size: 12, delay: "-0.4s", duration: "5.5s", color: "#ffd5e6", kind: "star", opacity: 0.7 },
    { left: "69%", top: "78%", size: 18, delay: "-2.7s", duration: "4.4s", color: "#bcecff", kind: "sparkle", opacity: 0.8 },
    { left: "82%", top: "16%", size: 13, delay: "-3.9s", duration: "5.2s", color: "#fff1b5", kind: "star", opacity: 0.82 },
    { left: "91%", top: "66%", size: 10, delay: "-1.7s", duration: "4.1s", color: "#e0d2ff", kind: "sparkle", opacity: 0.65 },
    { left: "52%", top: "46%", size: 9, delay: "-4.8s", duration: "5.7s", color: "#ffd6e7", kind: "sparkle", opacity: 0.35 },
    { left: "24%", top: "45%", size: 8, delay: "-2.9s", duration: "4.9s", color: "#fff2ad", kind: "star", opacity: 0.45 },
    { left: "78%", top: "48%", size: 8, delay: "-0.9s", duration: "4.5s", color: "#d6e9ff", kind: "star", opacity: 0.4 },
    { left: "4%", top: "52%", size: 9, delay: "-3.1s", duration: "5.3s", color: "#ffd0e4", kind: "sparkle", opacity: 0.5 },
  ],
  cake: [
    { left: "7%", top: "26%", size: 15, delay: "-1.4s", duration: "4.5s", color: "#fff0a8", kind: "sparkle", opacity: 0.8 },
    { left: "15%", top: "68%", size: 10, delay: "-2.8s", duration: "5.2s", color: "#ffc7de", kind: "star", opacity: 0.7 },
    { left: "29%", top: "13%", size: 9, delay: "-0.6s", duration: "4.8s", color: "#ffe1a3", kind: "sparkle", opacity: 0.65 },
    { left: "46%", top: "82%", size: 11, delay: "-4s", duration: "5.5s", color: "#ffd8e7", kind: "sparkle", opacity: 0.7 },
    { left: "66%", top: "15%", size: 12, delay: "-2.1s", duration: "4.3s", color: "#ffe9b0", kind: "star", opacity: 0.75 },
    { left: "81%", top: "73%", size: 16, delay: "-3.3s", duration: "5s", color: "#f7c7ff", kind: "sparkle", opacity: 0.72 },
    { left: "92%", top: "34%", size: 10, delay: "-1.1s", duration: "4.7s", color: "#ffe5a6", kind: "star", opacity: 0.7 },
    { left: "36%", top: "38%", size: 8, delay: "-4.6s", duration: "5.4s", color: "#fff0bd", kind: "sparkle", opacity: 0.36 },
    { left: "61%", top: "47%", size: 7, delay: "-2.5s", duration: "4.2s", color: "#ffd2e5", kind: "star", opacity: 0.32 },
    { left: "53%", top: "9%", size: 9, delay: "-3.8s", duration: "5.1s", color: "#fff4c4", kind: "sparkle", opacity: 0.55 },
  ],
};

type SparkleFieldProps = {
  variant?: "entrance" | "cake";
  className?: string;
};

export function SparkleField({
  variant = "entrance",
  className = "",
}: SparkleFieldProps) {
  return (
    <div
      className={`sparkle-field sparkle-field--${variant} ${className}`}
      aria-hidden="true"
    >
      {sparkleSets[variant].map((sparkle, index) => {
        const Icon = sparkle.kind === "sparkle" ? SparkleIcon : StarIcon;
        return (
          <span
            className="sparkle-item"
            key={`${sparkle.left}-${sparkle.top}-${index}`}
            style={
              {
                left: sparkle.left,
                top: sparkle.top,
                width: sparkle.size,
                height: sparkle.size,
                color: sparkle.color,
                opacity: sparkle.opacity,
                "--sparkle-delay": sparkle.delay,
                "--sparkle-duration": sparkle.duration,
              } as React.CSSProperties
            }
          >
            <Icon width="100%" height="100%" />
          </span>
        );
      })}
    </div>
  );
}
