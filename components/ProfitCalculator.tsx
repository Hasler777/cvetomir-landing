"use client";

import { useState } from "react";

/* ─── Расчётная модель (по фактическому открытию в Нижнекамске) ─── */

const fmt = (n: number) => `${Math.round(n).toLocaleString("ru-RU")} ₽`;
const fmtN = (n: number) => Math.round(n).toLocaleString("ru-RU");

// Сезонность и выход на загрузку по месяцам (М1–М12)
const SEAS = [0.9, 0.8, 1.1, 1.7, 1.0, 1.35, 1.0, 1.0, 1.2, 0.98, 1.0, 1.55];
const LOAD = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1];
const MONTHS = ["М1", "М2", "М3", "М4", "М5", "М6", "М7", "М8", "М9", "М10", "М11", "М12"];

const repairCost = (area: number) => area * 3500 + 280000;
// Коэффициент маркетинга: 0 ₽ → ×0.70, 150 000 ₽ и больше → ×1.00
const mktCoef = (m: number) => 0.7 + 0.3 * Math.min(m / 150000, 1);

type MonthRow = {
  n: string;
  sales: number;
  rev: number;
  cogs: number;
  varOther: number;
  fixT: number;
  mkt: number;
  profit: number;
};

function calcMonths(
  peak: number,
  chk: number,
  mkt: number,
  sMult: number,
  cMult: number,
  fixT: number
): MonthRow[] {
  const cf = mktCoef(mkt) * sMult;
  return MONTHS.map((n, i) => {
    const sales = Math.round(peak * SEAS[i] * LOAD[i] * cf);
    const rev = sales * chk;
    const cogs = rev * 0.4 * cMult;
    const woff = rev * 0.05 * cMult;
    const roy = i >= 2 ? rev * 0.04 : 0;
    const acq = rev * 0.015;
    const varOther = (woff + roy + acq) * cMult;
    const profit = rev - fixT * cMult - cogs - varOther - mkt;
    return { n, sales, rev, cogs, varOther, fixT: fixT * cMult, mkt, profit };
  });
}

/* ─── Мелкие UI-блоки ─── */

function Chevron({ up }: { up: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-5 w-5 shrink-0 transition-transform duration-300 md:h-6 md:w-6 ${up ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Slider(props: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-moss">{props.label}</div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          value={props.value}
          onChange={(e) => props.onChange(parseInt(e.target.value))}
          className="h-1.5 flex-1 cursor-pointer accent-brand-green"
          aria-label={props.label}
        />
        <span className="min-w-[92px] text-right text-base font-bold tabular-nums text-brand-green">
          {props.display}
        </span>
      </div>
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-moss">{children}</div>
  );
}

function MoneyTable({
  rows,
  totalLabel,
  total,
  flexTag,
}: {
  rows: { n: string; v: number }[];
  totalLabel: string;
  total: number;
  flexTag?: boolean;
}) {
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {rows.map((r) => (
          <tr key={r.n} className="border-b border-brand-green/10">
            <td className="py-2 pr-2 text-brand-ink">
              {r.n}
              {flexTag && (
                <span className="ml-2 inline-block rounded bg-brand-yellow/30 px-1.5 py-0.5 align-middle text-[10px] font-semibold text-brand-ink/70">
                  гибкий
                </span>
              )}
            </td>
            <td className="py-2 text-right tabular-nums text-brand-ink">{fmt(r.v)}</td>
          </tr>
        ))}
        <tr>
          <td className="pt-3 text-[13px] font-semibold text-brand-moss">{totalLabel}</td>
          <td className="pt-3 text-right text-[13px] font-semibold tabular-nums text-brand-moss">{fmt(total)}</td>
        </tr>
      </tbody>
    </table>
  );
}

/* ─── График прибыли (SVG, без внешних библиотек) ─── */

function ProfitChart({ opt, base, pess }: { opt: number[]; base: number[]; pess: number[] }) {
  const W = 760;
  const H = 300;
  const PL = 56;
  const PR = 10;
  const PT = 12;
  const PB = 28;

  const all = [...opt, ...base, ...pess];
  const min = Math.min(0, ...all);
  const max = Math.max(0, ...all);
  const rawStep = Math.max(1, (max - min) / 4);
  const pow = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= rawStep) ?? rawStep;
  const tickMin = Math.floor(min / step) * step;
  const tickMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let t = tickMin; t <= tickMax + step / 2; t += step) ticks.push(t);

  const x = (i: number) => PL + (i * (W - PL - PR)) / (MONTHS.length - 1);
  const y = (v: number) => PT + ((tickMax - v) / (tickMax - tickMin)) * (H - PT - PB);
  const y0 = y(Math.max(tickMin, Math.min(tickMax, 0)));

  const line = (data: number[]) => data.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const area = (data: number[]) =>
    `M ${x(0)},${y0} L ${line(data).split(" ").join(" L ")} L ${x(data.length - 1)},${y0} Z`;
  const fmtK = (v: number) => `${v < 0 ? "-" : ""}${Math.abs(Math.round(v / 1000))}к`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mt-3 w-full"
      role="img"
      aria-label="График прибыли по месяцам: три сценария"
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#9bb3a6" : "rgba(0,0,0,0.06)"} />
          <text x={PL - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#5f6f66">
            {fmtK(t)}
          </text>
        </g>
      ))}
      <path d={area(opt)} fill="rgba(31,122,64,0.08)" />
      <path d={area(pess)} fill="rgba(160,40,40,0.06)" />
      <polyline points={line(opt)} fill="none" stroke="#1F7A40" strokeWidth="2.5" />
      <polyline points={line(base)} fill="none" stroke="#4A8C5C" strokeWidth="2" strokeDasharray="6 4" />
      <polyline points={line(pess)} fill="none" stroke="#A02828" strokeWidth="2" />
      {MONTHS.map((m, i) => (
        <text key={m} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#5f6f66">
          {m}
        </text>
      ))}
    </svg>
  );
}

/* ─── Основной компонент ─── */

export default function ProfitCalculator() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"invest" | "economy">("invest");

  // Инвестиции на открытие
  const [area, setArea] = useState(60);
  const [mktOpen, setMktOpen] = useState(187000);
  const [stock, setStock] = useState(776000);

  // Экономика точки
  const [avgCheck, setAvgCheck] = useState(1700);
  const [peakSales, setPeakSales] = useState(1000);
  const [mktMonth, setMktMonth] = useState(40000);
  const [fot, setFot] = useState([
    { role: "Управляющий", sal: "60000" },
    { role: "Флорист", sal: "40000" },
  ]);

  /* — Инвестиции — */
  const repair = repairCost(area);
  const investFixed = [
    { n: "Паушальный взнос", v: 400000 },
    { n: "Ремонт помещения", v: repair },
    { n: "Холодильное оборудование", v: 333824 },
    { n: "Техника (касса, ноутбук и др.)", v: 37555 },
    { n: "Мебель и стеллажи", v: 240000 },
    { n: "Аренда (1 мес + депозит)", v: 209000 },
    { n: "Инвентарь", v: 32000 },
    { n: "ПО (МойСклад, год)", v: 46800 },
    { n: "Вывеска и оформление", v: 82000 },
  ];
  const investFlex = [
    { n: "Маркетинг на открытие", v: mktOpen },
    { n: "Первая закупка товара", v: stock },
  ];
  const totalFixed = investFixed.reduce((s, r) => s + r.v, 0);
  const totalFlex = investFlex.reduce((s, r) => s + r.v, 0);

  /* — Экономика — */
  const fotSum = fot.reduce((s, e) => s + (parseInt(e.sal.replace(/\D/g, "")) || 0), 0);
  const fixedOpex = [
    { n: "Аренда", v: 95000 },
    { n: "Бухгалтерия", v: 7000 },
    { n: "Коммунальные услуги", v: 15000 },
    { n: "Хоз. расходы", v: 3000 },
    { n: "ПО и интернет", v: 5000 },
    { n: "Непредвиденные", v: 10000 },
  ];
  const fixedBase = fixedOpex.reduce((s, r) => s + r.v, 0);
  const fixedTotal = fixedBase + fotSum;

  const base = calcMonths(peakSales, avgCheck, mktMonth, 1, 1, fixedTotal);
  const opt = calcMonths(peakSales, avgCheck, 150000, 1.2, 1, fixedTotal);
  const pess = calcMonths(peakSales, avgCheck, 0, 0.6, 1.15, fixedTotal);

  const sumProfit = (a: MonthRow[]) => a.reduce((s, m) => s + m.profit, 0);
  const breakEven = (a: MonthRow[]) => {
    let c = 0;
    const i = a.findIndex((m) => ((c += m.profit), c >= 0));
    return i >= 0 ? i + 1 : null;
  };

  const baseProfit = sumProfit(base);
  const optProfit = sumProfit(opt);
  const pessProfit = sumProfit(pess);
  const baseRev = base.reduce((s, m) => s + m.rev, 0);
  const avgMonthProfit = baseProfit / 12;
  const be = breakEven(base);
  const avgRev = baseRev / 12;
  const peakRev = peakSales * avgCheck * mktCoef(mktMonth);

  const kpis = [
    { l: "Выручка за год", v: fmt(baseRev), s: "базовый сценарий", c: "text-brand-green" },
    { l: "Прибыль за год", v: fmt(baseProfit), s: "базовый сценарий", c: baseProfit > 0 ? "text-emerald-700" : "text-red-700" },
    { l: "Среднемесячная прибыль", v: fmt(avgMonthProfit), s: "1-й год", c: avgMonthProfit > 0 ? "text-emerald-700" : "text-amber-600" },
    { l: "Точка безубыточности", v: be ? `${be} мес.` : "> 12 мес.", s: "от старта продаж", c: be && be <= 10 ? "text-emerald-700" : "text-amber-600" },
  ];

  const perks = [
    { t: "Реальные цифры", s: "Все статьи — из фактических расходов на открытие в Нижнекамске" },
    { t: "Поддержка при запуске", s: "Сопровождаем от выбора помещения до первых продаж" },
    { t: "Гибкий бюджет", s: "Часть статей можно оптимизировать под ваш город" },
    { t: "14 лет практики", s: "Передаём только то, что реально работает в нашей сети" },
  ];

  return (
    <section id="calculator">
      {/* Кнопка-«мини-раздел» на всю ширину страницы */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="profit-calculator-body"
        className="group flex w-full items-center justify-center gap-4 bg-brand-green px-6 py-7 text-white transition-colors duration-150 hover:bg-[#27553f] md:gap-6 md:py-8"
      >
        <Chevron up={open} />
        <span className="font-display text-lg font-bold md:text-2xl">
          {open ? "Свернуть калькулятор прибыли" : "Развернуть калькулятор прибыли"}
        </span>
        <Chevron up={open} />
      </button>

      {/* Разворачиваемое тело калькулятора */}
      <div
        id="profit-calculator-body"
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="bg-brand-ice">
            <div className="container-x py-14 md:py-20">
              <div className="max-w-3xl">
                <div className="eyebrow">Финансовая модель франшизы</div>
                <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] text-brand-ink md:text-4xl">
                  Прозрачная экономика — без розовых очков
                </h2>
                <p className="mt-4 text-base text-brand-moss md:text-lg">
                  Все цифры основаны на реальном открытии в Нижнекамске. Меняйте параметры
                  и смотрите три сценария.
                </p>
              </div>

              {/* Табы */}
              <div className="mt-10 flex gap-3">
                {(
                  [
                    ["invest", "Инвестиции на открытие"],
                    ["economy", "Экономика точки"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-colors duration-150 md:text-base ${
                      tab === id ? "bg-brand-green text-white" : "bg-white text-brand-moss shadow-card"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {tab === "invest" && (
                <div className="mt-6">
                  <div className="rounded-card bg-white p-6 shadow-card">
                    <div className="grid gap-6 md:grid-cols-3">
                      <Slider label="Площадь помещения" min={35} max={120} step={5} value={area} display={`${area} м²`} onChange={setArea} />
                      <Slider label="Маркетинг на открытие" min={0} max={400000} step={10000} value={mktOpen} display={fmt(mktOpen)} onChange={setMktOpen} />
                      <Slider label="Первая закупка товара" min={200000} max={1500000} step={50000} value={stock} display={fmt(stock)} onChange={setStock} />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div className="rounded-card bg-white p-6 shadow-card">
                      <CardLabel>Обязательные инвестиции</CardLabel>
                      <MoneyTable rows={investFixed} totalLabel="Итого обязательные" total={totalFixed} />
                    </div>
                    <div className="rounded-card bg-white p-6 shadow-card">
                      <CardLabel>Гибкие статьи</CardLabel>
                      <MoneyTable rows={investFlex} totalLabel="Итого гибкие" total={totalFlex} flexTag />
                      <p className="mt-3 text-xs leading-relaxed text-brand-moss">
                        Маркетинг влияет на скорость набора клиентов. Меньше бюджет — медленнее старт.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-card bg-brand-green p-6 text-white shadow-card">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>Обязательные инвестиции</span>
                      <span className="tabular-nums">{fmt(totalFixed)}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm text-white/70">
                      <span>Гибкие статьи</span>
                      <span className="tabular-nums">{fmt(totalFlex)}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 font-display text-xl font-extrabold md:text-2xl">
                      <span>Итого на открытие</span>
                      <span className="tabular-nums">{fmt(totalFixed + totalFlex)}</span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-card bg-white p-6 shadow-card">
                    <CardLabel>Как считается ремонт</CardLabel>
                    <div className="rounded-2xl bg-brand-mint/50 p-4 text-sm leading-7 text-brand-moss">
                      <strong className="text-brand-green">Площадь {area} м²</strong>
                      <br />
                      Переменная часть: {area} × 3 500 ₽ ={" "}
                      <strong className="text-brand-green">{fmtN(area * 3500)} ₽</strong>
                      <br />
                      Фиксированная часть (окна, двери, холодильная камера, сварка):{" "}
                      <strong className="text-brand-green">280 000 ₽</strong>
                      <br />
                      Итого ремонт: <strong className="text-brand-green">{fmt(repair)}</strong>
                      <br />
                      <br />
                      Ориентиры: 35 м² → <strong className="text-brand-green">{fmt(repairCost(35))}</strong> · 60 м² →{" "}
                      <strong className="text-brand-green">{fmt(repairCost(60))}</strong> · 90 м² →{" "}
                      <strong className="text-brand-green">{fmt(repairCost(90))}</strong>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {perks.map((p) => (
                      <div key={p.t} className="flex gap-3 rounded-card bg-brand-mint/40 p-5">
                        <span aria-hidden="true" className="mt-0.5 text-brand-green">✦</span>
                        <div>
                          <div className="text-sm font-bold text-brand-green">{p.t}</div>
                          <div className="mt-0.5 text-xs leading-relaxed text-brand-moss">{p.s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "economy" && (
                <div className="mt-6">
                  <div className="rounded-card bg-white p-6 shadow-card">
                    <div className="grid gap-6 md:grid-cols-3">
                      <Slider label="Средний чек" min={1000} max={10000} step={100} value={avgCheck} display={fmt(avgCheck)} onChange={setAvgCheck} />
                      <Slider label="Продаж в пиковый мес." min={300} max={2000} step={50} value={peakSales} display={fmtN(peakSales)} onChange={setPeakSales} />
                      <Slider label="Маркетинг / мес." min={0} max={150000} step={5000} value={mktMonth} display={fmt(mktMonth)} onChange={setMktMonth} />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-brand-moss">
                      <span className="text-sm font-bold text-emerald-700">×{mktCoef(mktMonth).toFixed(2)}</span>
                      <span>к продажам (0 ₽ = ×0.70, макс = ×1.00)</span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {kpis.map((k) => (
                      <div key={k.l} className="rounded-card bg-white p-5 shadow-card">
                        <div className="text-xs font-medium text-brand-moss">{k.l}</div>
                        <div className={`mt-1.5 font-display text-2xl font-extrabold leading-none ${k.c}`}>{k.v}</div>
                        <div className="mt-1.5 text-[11px] text-brand-moss">{k.s}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-card bg-white p-6 shadow-card">
                    <CardLabel>Три сценария — прибыль за год</CardLabel>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700">Оптимистичный</div>
                        <div className="mt-1.5 font-display text-xl font-extrabold text-emerald-700">{fmt(optProfit)}</div>
                        <div className="mt-1 text-[11px] leading-relaxed text-brand-moss">×1.2 продажи, маркетинг на максимуме</div>
                      </div>
                      <div className="rounded-2xl border border-brand-green/20 bg-brand-mint/50 p-5">
                        <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-brand-green">Базовый</div>
                        <div className="mt-1.5 font-display text-xl font-extrabold text-brand-green">{fmt(baseProfit)}</div>
                        <div className="mt-1 text-[11px] leading-relaxed text-brand-moss">Ваши текущие настройки</div>
                      </div>
                      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                        <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-red-800">Пессимистичный</div>
                        <div className="mt-1.5 font-display text-xl font-extrabold text-red-800">{fmt(pessProfit)}</div>
                        <div className="mt-1 text-[11px] leading-relaxed text-brand-moss">×0.6 продажи, нет маркетинга, расходы +15%</div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-brand-moss">
                      <span><span className="mr-1.5 inline-block h-3 w-3 rounded-sm align-middle" style={{ background: "#1F7A40" }} />Оптимистичный</span>
                      <span><span className="mr-1.5 inline-block h-3 w-3 rounded-sm align-middle" style={{ background: "#4A8C5C" }} />Базовый</span>
                      <span><span className="mr-1.5 inline-block h-3 w-3 rounded-sm align-middle" style={{ background: "#A02828" }} />Пессимистичный</span>
                    </div>
                    <ProfitChart
                      opt={opt.map((m) => m.profit)}
                      base={base.map((m) => m.profit)}
                      pess={pess.map((m) => m.profit)}
                    />
                    <p className="mt-3 text-[11px] leading-relaxed text-brand-moss">
                      Оптимистичный: ×1.2 к продажам, маркетинг на максимуме. Пессимистичный: ×0.6, маркетинг = 0, расходы +15%.
                    </p>
                  </div>

                  <div className="mt-5 rounded-card bg-brand-green p-6 text-white shadow-card">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <div className="text-[11px] text-white/70">Средняя выручка / мес.</div>
                        <div className="mt-1 text-lg font-bold tabular-nums">{fmt(avgRev)}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-white/70">Себестоимость (40%)</div>
                        <div className="mt-1 text-lg font-bold tabular-nums">{fmt(avgRev * 0.4)}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-white/70">Закупать в месяц (+5% списание)</div>
                        <div className="mt-1 text-lg font-bold tabular-nums">{fmt(avgRev * 0.45)}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-[11px] leading-relaxed text-white/60">
                      Себестоимость = 40% от выручки (маржа 60%). Списание = 5%. Итоговая потребность с учётом оборачиваемости.
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl bg-brand-mint/50 p-5 text-[13px] leading-7 text-brand-moss">
                    <strong className="text-brand-green">Как считается прибыль:</strong>
                    <br />
                    Продажи = пиковые × сезонность × загрузка ×{" "}
                    <strong className="text-brand-green">коэф. маркетинга</strong>
                    <br />
                    Маржа 60% → себестоимость = 40% выручки · Списание = 5% · Роялти = 4% (с 3 мес.) · Эквайринг = 1,5%
                    <br />
                    <strong className="text-brand-green">
                      Прибыль = Выручка − Себестоимость − Списание − Роялти − Эквайринг − Фикс. расходы − ФОТ − Маркетинг
                    </strong>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div className="rounded-card bg-white p-6 shadow-card">
                      <CardLabel>Фиксированные расходы / мес.</CardLabel>
                      <MoneyTable rows={fixedOpex} totalLabel="Итого без ФОТ" total={fixedBase} />
                    </div>
                    <div className="rounded-card bg-white p-6 shadow-card">
                      <CardLabel>ФОТ — команда</CardLabel>
                      <div className="space-y-2">
                        {fot.map((e, i) => (
                          <div key={i} className="grid grid-cols-[1fr_110px_36px] gap-2">
                            <input
                              type="text"
                              value={e.role}
                              placeholder="Должность"
                              aria-label="Должность"
                              onChange={(ev) =>
                                setFot((f) => f.map((x, j) => (j === i ? { ...x, role: ev.target.value } : x)))
                              }
                              className="w-full rounded-lg border border-brand-green/20 bg-white px-3 py-2 text-sm text-brand-ink focus:border-brand-green focus:outline-none"
                            />
                            <input
                              type="text"
                              inputMode="numeric"
                              value={e.sal}
                              placeholder="40 000"
                              aria-label="Зарплата, ₽"
                              onChange={(ev) =>
                                setFot((f) => f.map((x, j) => (j === i ? { ...x, sal: ev.target.value } : x)))
                              }
                              className="w-full rounded-lg border border-brand-green/20 bg-white px-3 py-2 text-sm tabular-nums text-brand-ink focus:border-brand-green focus:outline-none"
                            />
                            <button
                              type="button"
                              aria-label="Удалить сотрудника"
                              onClick={() => setFot((f) => f.filter((_, j) => j !== i))}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-green/20 text-brand-moss transition-colors hover:border-red-300 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setFot((f) => [...f, { role: "Сотрудник", sal: "35000" }])}
                        className="mt-3 rounded-lg border border-brand-green/20 px-4 py-2 text-[13px] font-medium text-brand-moss transition-colors hover:bg-brand-mint/40"
                      >
                        + добавить сотрудника
                      </button>
                      <div className="mt-4 border-t border-brand-green/10 pt-3 text-right text-sm font-bold text-brand-green">
                        Итого ФОТ: {fmt(fotSum)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-card bg-white p-6 shadow-card">
                    <CardLabel>Переменные расходы — % от выручки</CardLabel>
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-brand-green/10 text-left text-xs font-semibold text-brand-moss">
                          <th className="py-1.5 font-semibold">Статья</th>
                          <th className="py-1.5 text-right font-semibold">%</th>
                          <th className="py-1.5 text-right font-semibold">Пример при пик. выручке</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { n: "Закупка товара", p: "40%", v: peakRev * 0.4 },
                          { n: "Списание товара", p: "5%", v: peakRev * 0.05 },
                          { n: "Роялти (с 3 мес.)", p: "4%", v: peakRev * 0.04 },
                          { n: "Эквайринг", p: "1,5%", v: peakRev * 0.015 },
                        ].map((r) => (
                          <tr key={r.n} className="border-b border-brand-green/10 last:border-0">
                            <td className="py-2 text-brand-ink">{r.n}</td>
                            <td className="py-2 text-right tabular-nums text-brand-ink">{r.p}</td>
                            <td className="py-2 text-right tabular-nums text-brand-ink">{fmt(r.v)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5 rounded-card bg-white p-6 shadow-card">
                    <CardLabel>Помесячный расчёт — базовый сценарий</CardLabel>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px] border-collapse text-[13px]">
                        <thead>
                          <tr className="border-b border-brand-green/10 text-left text-xs font-semibold text-brand-moss">
                            <th className="py-1.5 pr-2 font-semibold">Мес.</th>
                            <th className="py-1.5 px-1.5 text-right font-semibold">Продажи</th>
                            <th className="py-1.5 px-1.5 text-right font-semibold">Выручка</th>
                            <th className="py-1.5 px-1.5 text-right font-semibold">Закупка товара</th>
                            <th className="py-1.5 px-1.5 text-right font-semibold">Фикс.+ФОТ</th>
                            <th className="py-1.5 px-1.5 text-right font-semibold">Прочие %</th>
                            <th className="py-1.5 pl-1.5 text-right font-semibold">Прибыль</th>
                          </tr>
                        </thead>
                        <tbody>
                          {base.map((m) => (
                            <tr key={m.n} className="border-b border-brand-green/10 last:border-0">
                              <td className="py-1.5 pr-2 text-brand-ink">{m.n}</td>
                              <td className="py-1.5 px-1.5 text-right tabular-nums text-brand-ink">{fmtN(m.sales)}</td>
                              <td className="py-1.5 px-1.5 text-right tabular-nums text-brand-ink">{fmt(m.rev)}</td>
                              <td className="py-1.5 px-1.5 text-right tabular-nums text-brand-ink">{fmt(m.cogs)}</td>
                              <td className="py-1.5 px-1.5 text-right tabular-nums text-brand-ink">{fmt(m.fixT)}</td>
                              <td className="py-1.5 px-1.5 text-right tabular-nums text-brand-ink">{fmt(m.varOther + m.mkt)}</td>
                              <td className={`py-1.5 pl-1.5 text-right tabular-nums font-semibold ${m.profit >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                                {fmt(m.profit)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              <p className="mt-8 text-xs leading-relaxed text-brand-moss">
                Расчёт носит ориентировочный характер, основан на показателях действующей
                сети и не является публичной офертой. Фактические результаты зависят от
                города, локации и качества операционного управления.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
