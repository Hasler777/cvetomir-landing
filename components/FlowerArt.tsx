// Декоративные графические элементы в палитре брендбука.
// Используются в фоне секций (как «пятна» на стр. 3–4 брендбука).

export function Petal({
  className = "",
  color = "#ee845d",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="100" fill={color} />
    </svg>
  );
}

export function FlowerSprig({
  className = "",
  variant = "a",
}: {
  className?: string;
  variant?: "a" | "b" | "c";
}) {
  const sets = {
    a: { petals: ["#ee845d", "#fac94d", "#cbcc66"], leaf: "#2d5f4b", stem: "#5f6f66" },
    b: { petals: ["#fac94d", "#ee845d", "#d7eadb"], leaf: "#5f6f66", stem: "#2d5f4b" },
    c: { petals: ["#cbcc66", "#ee845d", "#fac94d"], leaf: "#2d5f4b", stem: "#5f6f66" },
  } as const;
  const s = sets[variant];

  return (
    <svg viewBox="0 0 220 320" className={className} aria-hidden="true">
      {/* Стебель */}
      <path
        d="M110 320 C 110 240, 90 200, 110 130"
        stroke={s.stem}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Листья */}
      <path
        d="M110 250 C 70 240, 50 220, 60 200 C 90 200, 110 220, 110 250 Z"
        fill={s.leaf}
      />
      <path
        d="M110 200 C 150 195, 170 175, 160 155 C 130 155, 110 175, 110 200 Z"
        fill={s.leaf}
        opacity="0.85"
      />
      {/* Цветок */}
      <g transform="translate(110 80)">
        <circle cx="0" cy="-30" r="26" fill={s.petals[0]} />
        <circle cx="-28" cy="-10" r="26" fill={s.petals[1]} />
        <circle cx="28" cy="-10" r="26" fill={s.petals[1]} />
        <circle cx="-18" cy="22" r="26" fill={s.petals[2]} />
        <circle cx="18" cy="22" r="26" fill={s.petals[2]} />
        <circle cx="0" cy="0" r="14" fill="#2d5f4b" />
      </g>
    </svg>
  );
}

export function LeafCorner({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M0 0 Q 180 40 220 140 Q 240 220 140 280 Q 60 250 30 170 Q 0 80 0 0 Z"
        fill="#2d5f4b"
        opacity="0.08"
      />
      <path
        d="M40 60 Q 140 80 180 160"
        stroke="#2d5f4b"
        strokeWidth="3"
        fill="none"
        opacity="0.35"
      />
      <ellipse cx="120" cy="110" rx="32" ry="14" fill="#2d5f4b" opacity="0.22" transform="rotate(-25 120 110)" />
      <ellipse cx="160" cy="160" rx="34" ry="14" fill="#2d5f4b" opacity="0.22" transform="rotate(-15 160 160)" />
    </svg>
  );
}
