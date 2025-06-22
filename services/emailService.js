// services/emailService.js

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://jetlabco.com'      // Для продакшена
  : 'http://localhost:5000';    // Для разработки

console.log('📡 API Base URL:', API_BASE_URL);

// Валидация email
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Валидация телефона
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const phoneRegex = /^[+]?[\d]{10,}$/;
  return phoneRegex.test(cleaned);
};

// Создание AbortController с таймаутом (кроссбраузерная совместимость)
const createTimeoutController = (timeoutMs = 30000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  
  // Очищаем таймаут при успешном завершении
  controller.signal.addEventListener('abort', () => {
    clearTimeout(timeoutId);
  });
  
  return controller;
};

// Отправка контактной формы
export const sendContactForm = async (formData) => {
  console.log('📧 Отправка контактной формы:', formData);
  
  const controller = createTimeoutController(30000);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
      throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Контактная форма отправлена:', result);
    return { success: true, ...result };

  } catch (error) {
    console.error('❌ Ошибка отправки контактной формы:', error);
    
    if (error.name === 'AbortError') {
      return { 
        success: false, 
        error: 'Время ожидания истекло. Проверьте подключение и попробуйте снова.' 
      };
    }
    
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return { 
        success: false, 
        error: 'Не удается подключиться к серверу. Проверьте интернет-соединение.' 
      };
    }
    
    return { 
      success: false, 
      error: error.message || 'Произошла ошибка при отправке формы' 
    };
  }
};

// Отправка квиз формы
export const sendQuizForm = async (quizData) => {
  console.log('🎯 Отправка квиз формы:', quizData);
  
  const controller = createTimeoutController(30000);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(quizData),
      signal: controller.signal
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
      throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Квиз форма отправлена:', result);
    return { success: true, ...result };

  } catch (error) {
    console.error('❌ Ошибка отправки квиз формы:', error);
    
    if (error.name === 'AbortError') {
      return { 
        success: false, 
        error: 'Время ожидания истекло. Проверьте подключение и попробуйте снова.' 
      };
    }
    
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return { 
        success: false, 
        error: 'Не удается подключиться к серверу. Проверьте интернет-соединение.' 
      };
    }
    
    return { 
      success: false, 
      error: error.message || 'Произошла ошибка при отправке заявки' 
    };
  }
};

// Newsletter подписка  
export const sendNewsletterSubscription = async (email) => {
  console.log('📧 Подписка на рассылку:', email);
  
  const controller = createTimeoutController(30000);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email }),
      signal: controller.signal
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
      throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Подписка оформлена:', result);
    return { success: true, ...result };

  } catch (error) {
    console.error('❌ Ошибка подписки:', error);
    
    if (error.name === 'AbortError') {
      return { 
        success: false, 
        error: 'Время ожидания истекло. Попробуйте снова.' 
      };
    }
    
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return { 
        success: false, 
        error: 'Не удается подключиться к серверу. Проверьте интернет-соединение.' 
      };
    }
    
    return { 
      success: false, 
      error: error.message || 'Произошла ошибка при подписке' 
    };
  }
};

// Default export для обратной совместимости
const emailService = {
  sendContactForm,
  sendQuizForm,
  sendNewsletterSubscription,
  validateEmail,
  validatePhone
};

export default emailService;