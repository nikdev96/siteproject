import { type FormEvent, useState } from 'react';
import { validateContactForm, type ContactFormData, type ValidationErrors, hasErrors } from '../utils/validation';

export default function Contacts() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    interest: '',
    comment: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валидация формы
    const validationErrors = validateContactForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    // Очистка ошибок
    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Симуляция отправки на сервер
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form submitted:', formData);

      // Успешная отправка
      setSubmitSuccess(true);

      // Сброс формы через 3 секунды
      setTimeout(() => {
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          interest: '',
          comment: ''
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      setSubmitError('Произошла ошибка при отправке формы. Попробуйте позже или свяжитесь с нами по телефону.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value
    });

    // Очистка ошибки при изменении поля
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };

  return (
    <section id="contacts" className="py-10 md:py-14 min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-semibold tracking-tight">Связаться с нами</h1>
          <p className="mt-2 text-slate-600">Оставьте заявку — вышлем коммерческое предложение и документы.</p>
          <form
            id="lead"
            className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 grid sm:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="text-sm text-slate-600" htmlFor="name">
                Имя <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`mt-1 w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                    : 'border-slate-300 focus:ring-blue-500'
                }`}
                placeholder="Иван"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-600" htmlFor="company">Компания</label>
              <input
                id="company"
                type="text"
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ООО «Пример»"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600" htmlFor="phone">
                Телефон <span className="text-red-600">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={`mt-1 w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
                  errors.phone
                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                    : 'border-slate-300 focus:ring-blue-500'
                }`}
                placeholder="+7 (___) ___‑__‑__"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                required
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-600" htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`mt-1 w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                    : 'border-slate-300 focus:ring-blue-500'
                }`}
                placeholder="name@company.ru"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-600" htmlFor="interest">Интересующие продукты</label>
              <input
                id="interest"
                type="text"
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="EVA гранулы для упаковки, абразивные ленты..."
                value={formData.interest}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-slate-600" htmlFor="comment">Комментарий</label>
              <textarea
                id="comment"
                rows={4}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Опишите задачу, материалы, объёмы..."
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-slate-500 mb-4">
                <span className="text-red-600">*</span> Обязательные поля. Отправляя форму, вы соглашаетесь с политикой конфиденциальности.
              </p>

              {/* Сообщение об успехе */}
              {submitSuccess && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold">Спасибо! Ваша заявка принята.</p>
                    <p className="text-sm">Мы свяжемся с вами в ближайшее время.</p>
                  </div>
                </div>
              )}

              {/* Сообщение об ошибке */}
              {submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p>{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  isSubmitting || submitSuccess
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Отправка...
                  </>
                ) : submitSuccess ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Отправлено
                  </>
                ) : (
                  'Отправить заявку'
                )}
              </button>
            </div>
          </form>
        </div>
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 h-max">
          <h2 className="text-lg font-semibold">Контакты</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Тел.: +7 (___) ___‑__‑__</li>
            <li>Email: sales@kleywood.ru</li>
            <li>Адрес: г. ____ , ул. ________ , д. __</li>
            <li>Мессенджеры: Telegram / WhatsApp</li>
          </ul>
          <div className="mt-4 h-40 w-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200" aria-label="Карта (плейсхолдер)"></div>
        </aside>
      </div>
    </section>
  );
}
