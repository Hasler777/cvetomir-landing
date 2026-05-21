type Props = { className?: string; mono?: "white" | "green" | false };

export default function Logo({ className = "", mono = false }: Props) {
  const stroke = mono === "white" ? "#ffffff" : "#2d5f4b";
  const handFill = mono ? "transparent" : "#f1d6b8";
  const petal1 = mono ? "transparent" : "#ee845d";
  const petal2 = mono ? "transparent" : "#fac94d";
  const center = mono ? "transparent" : "#2d5f4b";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="44" height="44" viewBox="0 0 64 64" aria-hidden="true">
        {/* Лепестки */}
        <circle cx="32" cy="14" r="9" fill={petal1} stroke={stroke} strokeWidth="2.5" />
        <circle cx="20" cy="22" r="9" fill={petal2} stroke={stroke} strokeWidth="2.5" />
        <circle cx="44" cy="22" r="9" fill={petal2} stroke={stroke} strokeWidth="2.5" />
        <circle cx="26" cy="32" r="9" fill={petal1} stroke={stroke} strokeWidth="2.5" />
        <circle cx="38" cy="32" r="9" fill={petal1} stroke={stroke} strokeWidth="2.5" />
        {/* Центр */}
        <circle cx="32" cy="24" r="5" fill={center} />
        {/* Стебель */}
        <path d="M32 30 V46" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        {/* Рука */}
        <path
          d="M10 50 C14 44, 24 44, 32 46 C40 44, 50 44, 54 50 C54 56, 44 60, 32 60 C20 60, 10 56, 10 50 Z"
          fill={handFill}
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-display text-xl font-bold tracking-tight"
          style={{ color: stroke }}
        >
          ЦветоМир
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{ color: stroke, opacity: 0.7 }}
        >
          база цветов 24/7
        </span>
      </div>
    </div>
  );
}
