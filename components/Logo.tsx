import Image from "next/image";

type Props = { className?: string; mono?: "white" | "green" | false };

export default function Logo({ className = "", mono = false }: Props) {
  const textColor = mono === "white" ? "#ffffff" : "#2d5f4b";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo-icon.png"
        alt="ЦветоМир"
        width={485}
        height={405}
        priority
        className="h-10 w-auto md:h-12"
      />
      <div className="flex flex-col leading-none">
        <span
          className="font-display text-xl font-bold tracking-tight"
          style={{ color: textColor }}
        >
          ЦветоМир
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{ color: textColor, opacity: 0.7 }}
        >
          база цветов 24/7
        </span>
      </div>
    </div>
  );
}
