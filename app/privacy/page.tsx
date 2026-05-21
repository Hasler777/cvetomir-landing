import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description:
    "Политика обработки персональных данных сайта франшизы «ЦветоМир» в соответствии с 152-ФЗ.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-white py-16 md:py-24">
        <article className="container-x prose prose-lg max-w-3xl text-brand-ink">
          <h1 className="font-display text-3xl font-bold leading-tight text-brand-ink md:text-5xl">
            Политика обработки персональных данных
          </h1>
          <p className="mt-4 text-brand-moss">
            <strong>Дата вступления в силу:</strong> 21 мая 2026 г.
          </p>

          <h2 className="mt-10 font-display text-2xl font-bold text-brand-ink md:text-3xl">
            1. Общие положения
          </h2>
          <p className="mt-4">
            Настоящая Политика определяет порядок обработки и защиты
            персональных данных на сайте{" "}
            <a
              href="http://5.42.108.217"
              className="text-brand-coral underline underline-offset-2"
            >
              http://5.42.108.217
            </a>
            .
          </p>

          <h2 className="mt-10 font-display text-2xl font-bold text-brand-ink md:text-3xl">
            2. Оператор персональных данных
          </h2>
          <p className="mt-4">
            <strong>[Полное наименование ИП/ООО]</strong>
            <br />
            ИНН [________], ОГРН/ОГРНИП [________]
            <br />
            Юридический адрес: [________]
            <br />
            Email для вопросов по персональным данным: [________]
          </p>

          <h2 className="mt-10 font-display text-2xl font-bold text-brand-ink md:text-3xl">
            3. Цели обработки
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Обработка заявок на покупку франшизы «ЦветоМир»</li>
            <li>Связь с вами и предоставление консультаций</li>
            <li>Заключение и исполнение договоров</li>
            <li>Направление информационных материалов (при согласии)</li>
          </ul>

          <h2 className="mt-10 font-display text-2xl font-bold text-brand-ink md:text-3xl">
            4. Собираемые данные
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Фамилия, имя, отчество</li>
            <li>Номер телефона</li>
            <li>Адрес электронной почты</li>
            <li>Город</li>
            <li>Комментарий / дополнительная информация</li>
          </ul>

          <h2 className="mt-10 font-display text-2xl font-bold text-brand-ink md:text-3xl">
            5. Cookies и аналогичные технологии
          </h2>
          <p className="mt-4">
            Сайт использует cookies для обеспечения работы формы заявки,
            навигации и анализа посещаемости.
          </p>

          <h2 className="mt-10 font-display text-2xl font-bold text-brand-ink md:text-3xl">
            6. Ваши права
          </h2>
          <p className="mt-4">
            Вы вправе в любое время отозвать согласие, запросить доступ,
            исправление или удаление своих данных.
          </p>

          <h2 className="mt-10 font-display text-2xl font-bold text-brand-ink md:text-3xl">
            Реквизиты оператора
          </h2>
          <p className="mt-4">
            [Полное название компании]
            <br />
            ИНН [&nbsp;] • ОГРН [&nbsp;]
            <br />
            Email: [&nbsp;]
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
