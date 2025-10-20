/**
 * Утилиты для валидации форм
 */

// Валидация телефонного номера (российский формат)
export const validatePhone = (phone: string): boolean => {
  // Удаляем все кроме цифр
  const cleaned = phone.replace(/\D/g, '');

  // Проверяем длину (10 цифр для российского номера без кода страны, или 11 с кодом)
  if (cleaned.length === 10) return true; // (999) 999-99-99
  if (cleaned.length === 11 && (cleaned.startsWith('7') || cleaned.startsWith('8'))) return true; // +7 или 8

  return false;
};

// Получить сообщение об ошибке для телефона
export const getPhoneError = (phone: string): string => {
  if (!phone) return 'Телефон обязателен для заполнения';
  if (!validatePhone(phone)) return 'Введите корректный номер телефона';
  return '';
};

// Валидация email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Получить сообщение об ошибке для email
export const getEmailError = (email: string): string => {
  if (!email) return 'Email обязателен для заполнения';
  if (!validateEmail(email)) return 'Введите корректный email адрес';
  return '';
};

// Валидация обязательного текстового поля
export const validateRequired = (value: string, fieldName: string = 'Поле'): string => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} обязательно для заполнения`;
  }
  return '';
};

// Валидация длины текста
export const validateLength = (
  value: string,
  min?: number,
  max?: number,
  fieldName: string = 'Поле'
): string => {
  const length = value.trim().length;

  if (min && length < min) {
    return `${fieldName} должно содержать минимум ${min} символов`;
  }

  if (max && length > max) {
    return `${fieldName} должно содержать максимум ${max} символов`;
  }

  return '';
};

// Форматирование телефонного номера для отображения
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    // +7 (999) 999-99-99
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  }

  if (cleaned.length === 11 && cleaned.startsWith('8')) {
    // 8 (999) 999-99-99
    return `8 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  }

  if (cleaned.length === 10) {
    // (999) 999-99-99
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
  }

  return phone;
};

// Типы для ошибок валидации
export interface ValidationErrors {
  [key: string]: string;
}

// Валидация всей формы контактов
export interface ContactFormData {
  name: string;
  company?: string;
  phone: string;
  email: string;
  interest?: string;
  comment?: string;
}

export const validateContactForm = (data: ContactFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Имя (обязательно)
  const nameError = validateRequired(data.name, 'Имя');
  if (nameError) errors.name = nameError;

  // Телефон (обязательно)
  const phoneError = getPhoneError(data.phone);
  if (phoneError) errors.phone = phoneError;

  // Email (обязательно)
  const emailError = getEmailError(data.email);
  if (emailError) errors.email = emailError;

  return errors;
};

// Проверка наличия ошибок
export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
