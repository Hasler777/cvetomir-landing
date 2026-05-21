import Logo from "./Logo";

const nav = [
  { href: "#why", label: "Почему цветы" },
  { href: "#included", label: "Что входит" },
  { href: "#economics", label: "Экономика" },
  { href: "#steps", label: "Этапы" },
  { href: "#founder", label: "Основатель" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-mint/60 bg-brand-ice/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>
        <nav aria-label="Главное меню" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-brand-green">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-brand-coral transition">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#cta" className="btn-primary !px-5 !py-3 text-sm md:text-base">
          Получить презентацию
        </a>
      </div>
    </header>
  );
}
