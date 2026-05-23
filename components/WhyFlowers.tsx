import { BigFlower } from "./FlowerArt";

const points = [
  {
    title: "Повторные покупки и постоянный спрос",
    text: "Цветы покупают на дни рождения, годовщины, свадьбы и просто так — спрос есть круглый год.",
  },
  {
    title: "Эмоционально вовлекающий продукт",
    text: "Букет — это способ выразить любовь, поддержку и благодарность. Цена решения остаётся в тени эмоции.",
  },
  {
    title: "Продажи через оффлайн + онлайн + доставку",
    text: "Каждая точка работает сразу в трёх каналах, что увеличивает выручку и снижает зависимость от трафика.",
  },
  {
    title: "Высокая лояльность клиентов",
    text: "При хорошем сервисе клиент возвращается несколько раз в год и приводит знакомых.",
  },
];

export default function WhyFlowers() {
  return (
    <section id="why" className="relative overflow-hidden bg-white py-20 md:py-28">
      <BigFlower variant="a" className="absolute right-6 top-24 hidden h-[160px] w-[160px] opacity-90 lg:block" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-brand-ink md:text-5xl">
            Почему цветочный бизнес остаётся востребованным даже в кризис
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <li key={p.title} className="card relative overflow-hidden">
              <span
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-16 w-16 rounded-full"
                style={{
                  background: [
                    "#fac94d",
                    "#ee845d",
                    "#cbcc66",
                    "#2d5f4b",
                  ][i],
                  opacity: 0.18,
                }}
              />
              <div className="font-display text-2xl font-extrabold text-brand-coral">
                0{i + 1}
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-brand-green">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-brand-moss">{p.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
          <a href="#cta" className="btn-secondary">Рассчитать запуск под ваш город</a>
        </div>
      </div>
    </section>
  );
}
