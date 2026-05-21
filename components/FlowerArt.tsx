// Декоративные графические элементы в палитре брендбука.

export function Petal({
  className = "",
  color = "#ee845d",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="100" fill={color} />
    </svg>
  );
}

// Большой цветок без ножки — лепестки + сердцевина. По мотивам брендбука и референсов.
export function BigFlower({
  className = "",
  variant = "a",
}: {
  className?: string;
  variant?: "a" | "b" | "c" | "d" | "e";
}) {
  const sets = {
    a: { petals: "#ee845d", center: "#fac94d", core: "#2d5f4b" },
    b: { petals: "#fac94d", center: "#ee845d", core: "#2d5f4b" },
    c: { petals: "#cbcc66", center: "#ee845d", core: "#2d5f4b" },
    d: { petals: "#d7eadb", center: "#cbcc66", core: "#2d5f4b" },
    e: { petals: "#ee845d", center: "#cbcc66", core: "#2d5f4b" },
  } as const;
  const s = sets[variant];

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g transform="translate(100 100)">
        {/* 8 крупных лепестков */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-50"
            rx="34"
            ry="50"
            fill={s.petals}
            transform={`rotate(${deg})`}
            opacity="0.95"
          />
        ))}
        {/* Внутренний слой лепестков, чуть мельче и другим оттенком */}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-30"
            rx="20"
            ry="32"
            fill={s.center}
            transform={`rotate(${deg})`}
            opacity="0.9"
          />
        ))}
        {/* Сердцевина */}
        <circle cx="0" cy="0" r="22" fill={s.core} />
        <circle cx="0" cy="0" r="14" fill={s.center} opacity="0.45" />
      </g>
    </svg>
  );
}

// Маленький цветок-«ромашка» — для россыпей
export function Daisy({
  className = "",
  color = "#fac94d",
  centerColor = "#ee845d",
}: {
  className?: string;
  color?: string;
  centerColor?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g transform="translate(100 100)">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-50"
            rx="26"
            ry="46"
            fill={color}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="22" fill={centerColor} />
      </g>
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
      <path
        d="M110 320 C 110 240, 90 200, 110 130"
        stroke={s.stem}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M110 250 C 70 240, 50 220, 60 200 C 90 200, 110 220, 110 250 Z"
        fill={s.leaf}
      />
      <path
        d="M110 200 C 150 195, 170 175, 160 155 C 130 155, 110 175, 110 200 Z"
        fill={s.leaf}
        opacity="0.85"
      />
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
