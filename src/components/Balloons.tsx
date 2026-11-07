type BalloonConfig = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
  accent: string;
  opacity: number;
  tilt: number;
  hiddenOnMobile?: boolean;
};

const balloons: BalloonConfig[] = [
  {
    left: "3%",
    size: 84,
    delay: "-3s",
    duration: "21s",
    color: "#ffb5d0",
    accent: "#ffdfea",
    opacity: 0.95,
    tilt: -7,
  },
  {
    left: "13%",
    size: 58,
    delay: "-14s",
    duration: "26s",
    color: "#cdb8ff",
    accent: "#eee6ff",
    opacity: 0.72,
    tilt: 5,
  },
  {
    left: "25%",
    size: 42,
    delay: "-19s",
    duration: "30s",
    color: "#a9e4ff",
    accent: "#e3f7ff",
    opacity: 0.58,
    tilt: -4,
    hiddenOnMobile: true,
  },
  {
    left: "74%",
    size: 68,
    delay: "-8s",
    duration: "24s",
    color: "#ffe0a1",
    accent: "#fff4cf",
    opacity: 0.8,
    tilt: 6,
  },
  {
    left: "88%",
    size: 96,
    delay: "-16s",
    duration: "22s",
    color: "#ffb5d0",
    accent: "#ffe2ed",
    opacity: 0.96,
    tilt: -3,
  },
  {
    left: "95%",
    size: 50,
    delay: "-5s",
    duration: "28s",
    color: "#c5e3ff",
    accent: "#eef8ff",
    opacity: 0.55,
    tilt: 4,
    hiddenOnMobile: true,
  },
  {
    left: "62%",
    size: 38,
    delay: "-23s",
    duration: "32s",
    color: "#d8c6ff",
    accent: "#f2ecff",
    opacity: 0.48,
    tilt: -6,
    hiddenOnMobile: true,
  },
  {
    left: "44%",
    size: 32,
    delay: "-11s",
    duration: "35s",
    color: "#ffd0e0",
    accent: "#fff0f6",
    opacity: 0.36,
    tilt: 8,
    hiddenOnMobile: true,
  },
];

export function Balloons() {
  return (
    <div className="balloon-field" aria-hidden="true">
      {balloons.map((balloon, index) => (
        <div
          className={`balloon-rise ${
            balloon.hiddenOnMobile ? "balloon-rise--desktop" : ""
          }`}
          key={`${balloon.left}-${index}`}
          style={
            {
              left: balloon.left,
              "--balloon-size": `${balloon.size}px`,
              "--balloon-delay": balloon.delay,
              "--balloon-duration": balloon.duration,
              "--balloon-opacity": balloon.opacity,
              "--balloon-tilt": `${balloon.tilt}deg`,
            } as React.CSSProperties
          }
        >
          <div className="balloon-sway">
            <svg
              className="balloon"
              viewBox="0 0 120 210"
              style={{ width: "var(--balloon-size)" }}
            >
              <defs>
                <radialGradient
                  id={`balloon-fill-${index}`}
                  cx="35%"
                  cy="28%"
                  r="75%"
                >
                  <stop offset="0%" stopColor={balloon.accent} />
                  <stop offset="55%" stopColor={balloon.color} />
                  <stop offset="100%" stopColor={balloon.color} />
                </radialGradient>
                <linearGradient
                  id={`balloon-shine-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M60 7C28 7 11 36 12 73c1 39 26 66 48 75 22-9 47-36 48-75C109 36 92 7 60 7Z"
                fill={`url(#balloon-fill-${index})`}
              />
              <ellipse
                cx="43"
                cy="48"
                rx="11"
                ry="24"
                fill={`url(#balloon-shine-${index})`}
                transform="rotate(-18 43 48)"
              />
              <path
                d="M60 148c-7 6-11 9-10 12 1 3 6 3 10 0 4 3 9 3 10 0 1-3-3-6-10-12Z"
                fill={balloon.color}
              />
              <path
                d="M60 160c-9 13 12 18 3 33-5 9-1 13 0 16"
                fill="none"
                stroke="rgba(112, 79, 108, .36)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="58" cy="113" r="2.1" fill="#fff" opacity="0.45" />
              <circle cx="70" cy="101" r="1.2" fill="#fff" opacity="0.35" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
