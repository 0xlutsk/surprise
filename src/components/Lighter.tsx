import { HeartIcon } from "./Icons";

type LighterProps = {
  flameOn: boolean;
};

export function Lighter({ flameOn }: LighterProps) {
  return (
    <div className={`lighter ${flameOn ? "is-on" : ""}`} aria-hidden="true">
      <span className="lighter__flame">
        <span />
      </span>
      <svg viewBox="0 0 120 210" className="lighter__svg">
        <defs>
          <linearGradient id="lighter-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d7f4ff" />
            <stop offset="0.46" stopColor="#acd6ff" />
            <stop offset="1" stopColor="#b3a8ff" />
          </linearGradient>
          <linearGradient id="lighter-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbfbff" />
            <stop offset="0.5" stopColor="#c9cbe2" />
            <stop offset="1" stopColor="#999dbd" />
          </linearGradient>
          <linearGradient id="lighter-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="17"
          y="78"
          width="86"
          height="116"
          rx="29"
          fill="url(#lighter-body)"
          stroke="#8d9fd8"
          strokeOpacity="0.28"
          strokeWidth="2"
        />
        <rect x="31" y="92" width="18" height="84" rx="9" fill="url(#lighter-shine)" />
        <path
          d="M30 102c17-13 44-13 61 0"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="29" y="44" width="62" height="42" rx="12" fill="url(#lighter-metal)" />
        <rect x="34" y="49" width="52" height="7" rx="3.5" fill="#ffffff" opacity="0.55" />
        <path
          d="M44 50c4-14 13-20 16-33 3 13 12 19 16 33"
          fill="none"
          stroke="#8e93af"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="78" y="60" width="19" height="17" rx="7" fill="#7f86a8" />
        <rect x="82" y="64" width="11" height="4" rx="2" fill="#dde2ff" opacity="0.65" />
        <circle cx="60" cy="146" r="22" fill="#fff7fd" opacity="0.8" />
        <HeartIcon x="48" y="134" width="24" height="24" color="#f28bb5" />
        <circle cx="46" cy="165" r="2.1" fill="#ffffff" opacity="0.65" />
        <circle cx="72" cy="171" r="1.5" fill="#ffffff" opacity="0.5" />
      </svg>
      <span className="lighter__spark" aria-hidden="true">
        ✦
      </span>
    </div>
  );
}
