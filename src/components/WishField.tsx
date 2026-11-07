import { motion } from "framer-motion";

type Wish = {
  lang: string;
  text: string;
  x: number;
  y: number;
  mobileX?: number;
  mobileY?: number;
  size: "sm" | "md" | "lg";
  color: string;
  rotate: number;
  delay: number;
  extra?: boolean;
  mobileHide?: boolean;
  shortHide?: boolean;
  fly?: boolean;
  rtl?: boolean;
};

const wishes: Wish[] = [
  {
    lang: "English",
    text: "Happy Birthday!",
    x: 50,
    y: 11,
    mobileX: 50,
    mobileY: 9,
    size: "lg",
    color: "#ffe9ad",
    rotate: -2,
    delay: 0,
  },
  {
    lang: "Français",
    text: "Joyeux anniversaire !",
    x: 19,
    y: 17,
    mobileX: 23,
    mobileY: 18,
    size: "md",
    color: "#ffc7e0",
    rotate: -4,
    delay: 0.16,
  },
  {
    lang: "Deutsch",
    text: "Alles Gute zum Geburtstag!",
    x: 81,
    y: 17,
    mobileX: 77,
    mobileY: 18,
    size: "md",
    color: "#d9c9ff",
    rotate: 3,
    delay: 0.28,
  },
  {
    lang: "Italiano",
    text: "Buon compleanno!",
    x: 13,
    y: 31,
    size: "sm",
    color: "#bcefff",
    rotate: -6,
    delay: 0.42,
    extra: true,
  },
  {
    lang: "Español",
    text: "¡Feliz cumpleaños!",
    x: 87,
    y: 31,
    size: "sm",
    color: "#fff7fd",
    rotate: 5,
    delay: 0.52,
    extra: true,
  },
  {
    lang: "Português",
    text: "Feliz aniversário!",
    x: 15,
    y: 45,
    mobileX: 18,
    mobileY: 33,
    size: "md",
    color: "#ffb7d6",
    rotate: -3,
    delay: 0.66,
    fly: true,
  },
  {
    lang: "Русский",
    text: "С днём рождения!",
    x: 85,
    y: 46,
    mobileX: 82,
    mobileY: 33,
    size: "md",
    color: "#d2c3ff",
    rotate: 4,
    delay: 0.8,
  },
  {
    lang: "Українська",
    text: "З днем народження!",
    x: 12,
    y: 60,
    mobileX: 17,
    mobileY: 61,
    size: "sm",
    color: "#b7edff",
    rotate: -5,
    delay: 0.94,
  },
  {
    lang: "日本語",
    text: "お誕生日おめでとう!",
    x: 87,
    y: 60,
    mobileX: 78,
    mobileY: 61,
    size: "sm",
    color: "#ffe4a4",
    rotate: 4,
    delay: 1.04,
  },
  {
    lang: "한국어",
    text: "생일 축하해!",
    x: 18,
    y: 74,
    mobileX: 31,
    mobileY: 87,
    shortHide: true,
    size: "md",
    color: "#ffffff",
    rotate: -2,
    delay: 1.18,
  },
  {
    lang: "中文",
    text: "生日快乐!",
    x: 82,
    y: 74,
    mobileX: 69,
    mobileY: 87,
    shortHide: true,
    size: "md",
    color: "#ffc2de",
    rotate: 3,
    delay: 1.3,
  },
  {
    lang: "Türkçe",
    text: "Doğum günün kutlu olsun!",
    x: 37,
    y: 86,
    mobileHide: true,
    size: "sm",
    color: "#b5ecff",
    rotate: -4,
    delay: 1.42,
  },
  {
    lang: "Ελληνικά",
    text: "Χρόνια πολλά!",
    x: 63,
    y: 86,
    mobileHide: true,
    size: "sm",
    color: "#ffe9b5",
    rotate: 4,
    delay: 1.54,
  },
  {
    lang: "العربية",
    text: "عيد ميلاد سعيد!",
    x: 50,
    y: 82,
    mobileX: 50,
    mobileY: 74,
    size: "md",
    color: "#dfd0ff",
    rotate: 0,
    delay: 1.66,
    rtl: true,
  },
  {
    lang: "Polski",
    text: "Wszystkiego najlepszego!",
    x: 30,
    y: 29,
    size: "sm",
    color: "#ffd1e4",
    rotate: 5,
    delay: 1.78,
    extra: true,
  },
  {
    lang: "Nederlands",
    text: "Fijne verjaardag!",
    x: 70,
    y: 29,
    size: "sm",
    color: "#ffffff",
    rotate: -5,
    delay: 1.9,
    extra: true,
  },
  {
    lang: "Svenska",
    text: "Grattis på födelsedagen!",
    x: 13,
    y: 87,
    size: "sm",
    color: "#bcefff",
    rotate: 2,
    delay: 2.02,
    extra: true,
    fly: true,
  },
  {
    lang: "हिन्दी",
    text: "जन्मदिन की शुभकामनाएँ!",
    x: 86,
    y: 87,
    size: "sm",
    color: "#ffe6a7",
    rotate: -3,
    delay: 2.14,
    extra: true,
  },
];

export function WishField() {
  return (
    <div className="wish-field" aria-label="Urări de ziua de naștere în multe limbi">
      {wishes.map((wish, index) => (
        <div
          className={`wish wish--${wish.size} ${
            wish.extra ? "wish--extra" : ""
          } ${wish.mobileHide ? "wish--mobile-hide" : ""} ${
            wish.shortHide ? "wish--short-hide" : ""
          }`}
          key={wish.lang}
          style={
            {
              color: wish.color,
              "--wish-x": `${wish.x}%`,
              "--wish-y": `${wish.y}%`,
              "--wish-mx": `${wish.mobileX ?? wish.x}%`,
              "--wish-my": `${wish.mobileY ?? wish.y}%`,
              "--wish-rotate": `${wish.rotate}deg`,
              "--wish-duration": `${6.5 + (index % 5) * 1.15}s`,
              "--wish-float-delay": `${-(index % 7) * 0.8}s`,
            } as React.CSSProperties
          }
        >
          <motion.div
            className="wish__motion"
            initial={{ opacity: 0, scale: 0.55, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              delay: 4.7 + wish.delay,
              duration: 1.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              className={`wish__inner ${wish.fly ? "wish__inner--fly" : ""}`}
              dir={wish.rtl ? "rtl" : undefined}
            >
              <span className="wish__lang">{wish.lang}</span>
              <span className="wish__text">{wish.text}</span>
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
