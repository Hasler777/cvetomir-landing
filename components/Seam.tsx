// Плавный переход между секциями. Ставится в page.tsx между блоками.
// Принимает уже «плоские» цвета (без alpha), чтобы gradient был предсказуем.
type Props = { from: string; to: string };

export default function Seam({ from, to }: Props) {
  return (
    <div
      aria-hidden="true"
      className="h-16 w-full md:h-24"
      style={{ background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)` }}
    />
  );
}
