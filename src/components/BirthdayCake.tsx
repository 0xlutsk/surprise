type BirthdayCakeProps = {
  className?: string;
};

export function BirthdayCake({ className = "" }: BirthdayCakeProps) {
  return (
    <svg
      className={`birthday-cake ${className}`}
      viewBox="0 0 600 420"
      role="img"
      aria-label="Tort de ziua de naștere cu două etaje, frișcă roz, căpșuni și ornamente"
    >
      <defs>
        <linearGradient id="cake-bottom" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd0e2" />
          <stop offset="0.5" stopColor="#f6a9c8" />
          <stop offset="1" stopColor="#ef8db6" />
        </linearGradient>
        <linearGradient id="cake-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eee5ff" />
          <stop offset="0.55" stopColor="#d8c6ff" />
          <stop offset="1" stopColor="#c9b2fb" />
        </linearGradient>
        <linearGradient id="frosting-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff9fc" />
          <stop offset="0.6" stopColor="#ffeaf3" />
          <stop offset="1" stopColor="#ffd3e4" />
        </linearGradient>
        <linearGradient id="frosting-white" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffdfd" />
          <stop offset="1" stopColor="#fff1f7" />
        </linearGradient>
        <linearGradient id="plate-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f7ecff" />
          <stop offset="1" stopColor="#e6dcff" />
        </linearGradient>
        <linearGradient id="side-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="0.3" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#9e4f77" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="cake-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff4c7" stopOpacity="0.6" />
          <stop offset="0.6" stopColor="#ffd6ea" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ffd6ea" stopOpacity="0" />
        </radialGradient>
        <filter id="cake-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="cake-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="12"
            floodColor="#8e4c70"
            floodOpacity="0.18"
          />
        </filter>

        <g id="cake-strawberry">
          <path
            d="M0 0C-16 8-19 24-8 35 0 42 8 41 14 32 22 19 15 7 0 0Z"
            fill="#f26586"
          />
          <path
            d="M-1 3C-8 10-8 19-2 26 2 21 3 12-1 3Z"
            fill="#ffa3b8"
            opacity="0.68"
          />
          <path
            d="M-12 0c3-8 11-9 14-4 4-5 12-4 13 4-7 4-13 4-18 2-5 3-10 2-9-2Z"
            fill="#74cc9c"
          />
          <g fill="#ffe6c9">
            <circle cx="-4" cy="13" r="1.2" />
            <circle cx="4" cy="17" r="1.1" />
            <circle cx="0" cy="24" r="1" />
            <circle cx="8" cy="25" r="0.9" />
            <circle cx="-7" cy="21" r="0.9" />
          </g>
          <ellipse cx="-4" cy="8" rx="2.5" ry="1.5" fill="#fff" opacity="0.4" />
        </g>
      </defs>

      <ellipse
        cx="300"
        cy="398"
        rx="232"
        ry="20"
        fill="#b96f95"
        opacity="0.22"
        filter="url(#cake-blur)"
      />
      <ellipse cx="300" cy="365" rx="236" ry="50" fill="url(#cake-glow)" />

      <g filter="url(#cake-soft-shadow)">
        <ellipse
          cx="300"
          cy="382"
          rx="230"
          ry="27"
          fill="url(#plate-fill)"
          stroke="#ffffff"
          strokeOpacity="0.8"
          strokeWidth="2"
        />
        <ellipse
          cx="300"
          cy="376"
          rx="209"
          ry="19"
          fill="#fff9fe"
          opacity="0.86"
        />
        <path
          d="M122 373c30 13 100 21 178 21s148-8 178-21"
          fill="none"
          stroke="#d9c6ef"
          strokeWidth="2"
          opacity="0.5"
          strokeLinecap="round"
        />

        <rect
          x="110"
          y="242"
          width="380"
          height="132"
          rx="33"
          fill="url(#cake-bottom)"
        />
        <rect
          x="110"
          y="242"
          width="380"
          height="132"
          rx="33"
          fill="url(#side-shine)"
        />

        <rect
          x="160"
          y="148"
          width="280"
          height="108"
          rx="29"
          fill="url(#cake-top)"
        />
        <rect
          x="160"
          y="148"
          width="280"
          height="108"
          rx="29"
          fill="url(#side-shine)"
        />

        <ellipse cx="300" cy="149" rx="140" ry="15" fill="#fff9fd" />

        <path
          d="M160 174c0-17 14-26 34-26h212c20 0 34 9 34 26v7c-10 22-24 4-36-1-13 25-28 7-41 2-13 25-29 7-42 2-13 25-29 7-42 2-13 25-29 7-42 2-13 25-29 7-42 2-12 19-25 3-35-1Z"
          fill="url(#frosting-white)"
        />

        <path
          d="M110 268c0-18 14-26 34-26h312c20 0 34 8 34 26v6c-12 26-28 6-42 0-16 30-34 8-50 2-16 30-34 8-50 2-16 30-34 8-50 2-16 30-34 8-50 2-16 30-34 8-50 2-16 30-32 7-48 1-12 20-26 6-40 1Z"
          fill="url(#frosting-pink)"
        />

        <g strokeLinecap="round" strokeWidth="5" opacity="0.9">
          <path d="M162 330l9-12" stroke="#ff6f9e" />
          <path d="M192 350l11-8" stroke="#a988ff" />
          <path d="M232 320l5-14" stroke="#ffe28a" />
          <path d="M266 356l11-8" stroke="#77d6b2" />
          <path d="M344 326l8-13" stroke="#ff7dab" />
          <path d="M380 352l12-8" stroke="#8cceff" />
          <path d="M420 326l6-14" stroke="#ffe28a" />
          <path d="M455 349l10-8" stroke="#b18dff" />
          <path d="M305 322l7-14" stroke="#ff9cbe" />
          <path d="M438 301l9-10" stroke="#7ed8b5" />
          <path d="M150 305l10-9" stroke="#ffe08a" />
        </g>

        <g>
          <use href="#cake-strawberry" transform="translate(203 306) scale(.88)" />
          <use href="#cake-strawberry" transform="translate(308 324) scale(1)" />
          <use href="#cake-strawberry" transform="translate(406 302) scale(.78)" />
          <use href="#cake-strawberry" transform="translate(252 196) scale(.62)" />
          <use href="#cake-strawberry" transform="translate(360 198) scale(.58)" />
        </g>

        <g fill="#ffffff" opacity="0.52">
          <path d="M171 289c-7-5-9-11-4-14 3-2 5 0 6 2 0-2 3-4 6-2 5 3 2 9-8 14Z" />
          <path d="M441 287c-7-5-9-11-4-14 3-2 5 0 6 2 0-2 3-4 6-2 5 3 2 9-8 14Z" />
          <path d="M289 228c-6-4-8-10-3-12 3-2 4 0 5 2 0-2 3-4 5-2 5 3 2 8-7 12Z" />
        </g>

        <g>
          <circle cx="145" cy="375" r="7" fill="#fff3fa" opacity="0.9" />
          <circle cx="167" cy="379" r="5" fill="#ffe7f2" opacity="0.9" />
          <circle cx="433" cy="377" r="6" fill="#fff3fa" opacity="0.9" />
          <circle cx="453" cy="373" r="4" fill="#ffe7f2" opacity="0.9" />
        </g>

        <g fill="#ffe7a6" opacity="0.92">
          <circle cx="130" cy="284" r="3.1" />
          <circle cx="470" cy="284" r="3.1" />
          <circle cx="300" cy="278" r="2.6" />
          <circle cx="240" cy="281" r="2.4" />
          <circle cx="360" cy="281" r="2.4" />
        </g>
      </g>
    </svg>
  );
}
