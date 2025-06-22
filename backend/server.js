const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://jetlabco.com', 
    'https://www.jetlabco.com'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // максимум 5 запросов с IP за 15 минут
  message: {
    error: 'Слишком много запросов с этого IP, попробуйте позже.'
  }
});

// SMTP Configuration
const transporter = nodemailer.createTransporter({
  host: 'smtp.jetlabco.com',
  port: 587,
  secure: false, // true для 465, false для остальных портов
  auth: {
    user: 'info@jetlabco.com',
    pass: 'Vv1G2zR9u9'
  },
  tls: {
    rejectUnauthorized: false // Разрешить самоподписанные сертификаты
  }
});

// Проверка SMTP соединения
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Ошибка SMTP соединения:', error);
  } else {
    console.log('✅ SMTP сервер готов к отправке писем');
    console.log('📧 Письма будут отправляться на: k.websupp@gmail.com');
  }
});

// Validation schemas
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(20).required(),
  service: Joi.string().min(2).max(100).required(),
  message: Joi.string().max(2000).optional()
});

const quizSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(20).required(),
  company: Joi.string().max(100).optional(),
  service: Joi.string().min(2).max(100).required(),
  budget: Joi.string().required(),
  timeline: Joi.string().required(),
  goals: Joi.array().items(Joi.string()).required(),
  description: Joi.string().max(2000).required()
});

const newsletterSchema = Joi.object({
  email: Joi.string().email().required()
});

// Функция форматирования номера телефона
const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

// Routes

// Проверка здоровья сервера
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'JetLab Email Server работает',
    timestamp: new Date().toISOString(),
    emailTarget: 'k.websupp@gmail.com'
  });
});

// Endpoint контактной формы
app.post('/api/contact', emailLimiter, async (req, res) => {
  try {
    console.log('📧 Получена контактная форма:', req.body);

    // Валидация входных данных
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      console.log('❌ Ошибка валидации:', error.details[0].message);
      return res.status(400).json({
        success: false,
        error: 'Ошибка валидации данных',
        details: error.details[0].message
      });
    }

    const { name, email, phone, service, message } = value;
    const formattedPhone = formatPhoneNumber(phone);

    // HTML содержимое письма
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-top: 5px; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #888; font-size: 14px; }
          .urgent { background: #ff6b6b; color: white; padding: 10px; border-radius: 5px; margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="urgent">
            <strong>🚨 НОВАЯ ЗАЯВКА С САЙТА JETLABCO.COM</strong>
          </div>
          <div class="header">
            <h2>📧 Новая заявка с контактной формы</h2>
            <p>От: ${name}</p>
            <p>Услуга: ${service}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Имя:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">📞 Телефон:</div>
              <div class="value"><a href="tel:${phone}">${formattedPhone}</a></div>
            </div>
            <div class="field">
              <div class="label">🛠️ Интересующая услуга:</div>
              <div class="value"><strong>${service}</strong></div>
            </div>
            ${message ? `
            <div class="field">
              <div class="label">💬 Сообщение:</div>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Отправлено с сайта JetLab.co | ${new Date().toLocaleString('ru-RU')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"JetLab Contact Form" <info@jetlabco.com>`,
      to: 'k.websupp@gmail.com', // ← СЮДА БУДУТ ПРИХОДИТЬ ПИСЬМА!
      replyTo: email,
      subject: `🚀 НОВАЯ ЗАЯВКА: ${service} от ${name}`,
      html: htmlContent,
      text: `
НОВАЯ ЗАЯВКА С САЙТА JETLABCO.COM

Имя: ${name}
Email: ${email}
Телефон: ${formattedPhone}
Услуга: ${service}
${message ? `Сообщение: ${message}` : ''}

Дата: ${new Date().toLocaleString('ru-RU')}
      `.trim()
    };

    // Отправка письма
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Письмо отправлено на k.websupp@gmail.com:', info.messageId);
    
    res.json({
      success: true,
      message: 'Контактная форма успешно отправлена',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Ошибка контактной формы:', error);
    res.status(500).json({
      success: false,
      error: 'Не удалось отправить контактную форму',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint квиз формы
app.post('/api/quiz', emailLimiter, async (req, res) => {
  try {
    console.log('🎯 Получена квиз форма:', req.body);

    // Валидация входных данных
    const { error, value } = quizSchema.validate(req.body);
    if (error) {
      console.log('❌ Ошибка валидации квиза:', error.details[0].message);
      return res.status(400).json({
        success: false,
        error: 'Ошибка валидации данных',
        details: error.details[0].message
      });
    }

    const { name, email, phone, company, service, budget, timeline, goals, description } = value;
    const formattedPhone = formatPhoneNumber(phone);

    // HTML содержимое письма
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 25px; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #000; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; color: #555; text-transform: uppercase; font-size: 12px; }
          .value { margin-top: 5px; font-size: 16px; }
          .goals { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
          .goal-tag { background: #000; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #888; font-size: 14px; }
          .urgent { background: #ff6b6b; color: white; padding: 10px; border-radius: 5px; margin-bottom: 15px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="urgent">
            <strong>🚨 ДЕТАЛЬНАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ С JETLABCO.COM</strong>
          </div>
          <div class="header">
            <h2>🎯 Заявка на консультацию: ${service}</h2>
            <p>Детальная заявка от ${name}</p>
            <p><strong>Бюджет: ${budget}</strong></p>
          </div>
          <div class="content">
            <div class="section">
              <h3>👤 Информация о клиенте</h3>
              <div class="field">
                <div class="label">Имя</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Телефон</div>
                <div class="value"><a href="tel:${phone}">${formattedPhone}</a></div>
              </div>
              ${company ? `
              <div class="field">
                <div class="label">Компания</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
            </div>

            <div class="section">
              <h3>💼 Детали проекта</h3>
              <div class="field">
                <div class="label">Услуга</div>
                <div class="value"><strong>${service}</strong></div>
              </div>
              <div class="field">
                <div class="label">Бюджет</div>
                <div class="value"><strong style="color: #ff6b6b;">${budget}</strong></div>
              </div>
              <div class="field">
                <div class="label">Временные рамки</div>
                <div class="value">${timeline}</div>
              </div>
            </div>

            <div class="section">
              <h3>🎯 Цели проекта</h3>
              <div class="goals">
                ${goals.map(goal => `<span class="goal-tag">${goal}</span>`).join('')}
              </div>
            </div>

            <div class="section">
              <h3>📝 Описание проекта</h3>
              <div class="value">${description.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>Отправлено с сайта JetLab.co | ${new Date().toLocaleString('ru-RU')}</p>
            <p><strong>⚡ ТРЕБУЕТ БЫСТРОГО ОТВЕТА!</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"JetLab Consultation" <info@jetlabco.com>`,
      to: 'k.websupp@gmail.com', // ← СЮДА БУДУТ ПРИХОДИТЬ ПИСЬМА!
      replyTo: email,
      subject: `🎯 КОНСУЛЬТАЦИЯ: ${service} от ${name} (${budget})`,
      html: htmlContent,
      text: `
ЗАЯВКА НА КОНСУЛЬТАЦИЮ С JETLABCO.COM

Информация о клиенте:
- Имя: ${name}
- Email: ${email}
- Телефон: ${formattedPhone}
${company ? `- Компания: ${company}` : ''}

Детали проекта:
- Услуга: ${service}
- Бюджет: ${budget}
- Временные рамки: ${timeline}
- Цели: ${goals.join(', ')}

Описание проекта:
${description}

Дата: ${new Date().toLocaleString('ru-RU')}
      `.trim()
    };

    // Отправка письма
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Квиз письмо отправлено на k.websupp@gmail.com:', info.messageId);
    
    res.json({
      success: true,
      message: 'Заявка на консультацию успешно отправлена',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Ошибка квиз формы:', error);
    res.status(500).json({
      success: false,
      error: 'Не удалось отправить заявку на консультацию',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint подписки на рассылку
app.post('/api/newsletter', emailLimiter, async (req, res) => {
  try {
    console.log('📧 Получена подписка на рассылку:', req.body);

    // Валидация входных данных
    const { error, value } = newsletterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Ошибка валидации данных',
        details: error.details[0].message
      });
    }

    const { email } = value;

    // HTML содержимое письма
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #888; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 Новая подписка на рассылку</h2>
          </div>
          <div class="content">
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Дата подписки:</strong> ${new Date().toLocaleString('ru-RU')}</p>
            <p><strong>Источник:</strong> jetlabco.com</p>
          </div>
          <div class="footer">
            <p>Отправлено с сайта JetLab.co</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"JetLab Newsletter" <info@jetlabco.com>`,
      to: 'k.websupp@gmail.com', // ← СЮДА БУДУТ ПРИХОДИТЬ ПИСЬМА!
      subject: `📧 Новая подписка на рассылку`,
      html: htmlContent,
      text: `
Новая подписка на рассылку

Email: ${email}
Дата подписки: ${new Date().toLocaleString('ru-RU')}
Источник: jetlabco.com
      `.trim()
    };

    // Отправка письма
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Письмо о подписке отправлено на k.websupp@gmail.com:', info.messageId);
    
    res.json({
      success: true,
      message: 'Подписка на рассылку оформлена',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Ошибка подписки:', error);
    res.status(500).json({
      success: false,
      error: 'Не удалось оформить подписку',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Middleware обработки ошибок
app.use((err, req, res, next) => {
  console.error('❌ Ошибка сервера:', err);
  res.status(500).json({
    success: false,
    error: 'Внутренняя ошибка сервера',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint не найден'
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 JetLab Email Server запущен на порту ${PORT}`);
  console.log(`📧 SMTP настроен для info@jetlabco.com`);
  console.log(`📮 Письма отправляются на: k.websupp@gmail.com`);
  console.log(`🌐 CORS включен для frontend origins`);
});

module.exports = app;