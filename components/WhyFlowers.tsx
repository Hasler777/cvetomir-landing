const points = [
  {
    title: "Повторные покупки",
    accent: "и постоянный спрос",
    text: "Цветы покупают на дни рождения, годовщины, свадьбы и просто так — спрос есть круглый год.",
  },
  {
    title: "Эмоционально",
    accent: "вовлекающий продукт",
    text: "Букет — это способ выразить любовь, поддержку и благодарность. Цена решения остаётся в тени эмоции.",
  },
  {
    title: "Оффлайн + онлайн",
    accent: "+ доставка",
    text: "Каждая точка работает сразу в трёх каналах, что увеличивает выручку и снижает зависимость от трафика.",
  },
  {
    title: "Высокая",
    accent: "лояльность клиентов",
    text: "При хорошем сервисе клиент возвращается несколько раз в год и приводит знакомых.",
  },
];

export default function WhyFlowers() {
  return (
    <section id="why" className="seam-soft bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Ниша</span>
          <h2 className="mt-4 h-section">
            Почему цветочный бизнес остаётся востребованным даже в кризис
          </h2>
          <p className="subtitle mt-5">
            Цветы — это не просто сезонный товар, они связаны с важными
            событиями и эмоциями. Спрос формируется не только календарными
            датами, но и эмоциональной потребностью людей выразить внимание,
            любовь, поддержку и благодарность.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <li
              key={p.title}
              className="relative overflow-hidden rounded-card border border-brand-mint bg-white p-6 shadow-card"
            >
              <span
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-16 w-16 rounded-full"
                style={{
                  background: ["#fac94d", "#ee845d", "#cbcc66", "#2d5f4b"][i],
                  opacity: 0.18,
                }}
              />
              <div className="accent font-display text-3xl font-extrabold">
                0{i + 1}
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-brand-ink leading-tight">
                {p.title} <span className="accent">{p.accent}</span>
              </h3>
              <p className="mt-3 text-sm text-brand-moss">{p.text}</p>
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
