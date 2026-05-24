import Logo from "./Logo";

const nav = [
  { href: "#why", label: "О нас" },
  { href: "#included", label: "Что входит" },
  { href: "#economics", label: "Экономика" },
  { href: "#steps", label: "Этапы запуска" },
  { href: "#founder", label: "Об основателе" },
];

export default function Header() {
  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 border-b border-brand-mint/60 bg-white/95 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container-x flex h-14 items-center justify-between md:h-20">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>
        <nav aria-label="Главное меню" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-brand-ink">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-brand-coral transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#cta" className="btn-primary shrink-0 !px-4 !py-2.5 text-sm md:!px-5 md:!py-3 md:text-base">
          <span className="sm:hidden">Презентация</span>
          <span className="hidden sm:inline">Получить презентацию</span>
        </a>
      </div>
    </header>
  );
}
