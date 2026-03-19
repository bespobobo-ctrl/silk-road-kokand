import { Telegraf, Markup } from 'telegraf';

// Bot tokeni (foydalanuvchi tomonidan taqdim etilgan)
const TOKEN = '8771174586:AAHDZ4e9tdzbFTqAwkfBRfraOfcyIMBC0kY';

// WebApp URL (Vercel'da mehmonxona sayti joylashgan link)
// MUHIM: Bu erni o'zingizning haqiqiy Vercel linkingiz bilan almashtiring!
const WEB_APP_URL = 'https://silk-road-kokand.vercel.app';

const bot = new Telegraf(TOKEN);

// Start komandasi (Premium ko'rinishda)
bot.start((ctx) => {
    const name = ctx.from.first_name || 'Hurmatli mehmon';
    ctx.replyWithPhoto(
        'https://silkroad-kokand.uz/img/67782364611c65c5.webp', // Mehmonxona rasmi
        {
            caption: `*Assalomu alaykum, ${name}!*\n\nSilk Road Kokand Hotel rasmiy Telegram Mini App botiga xush kelibsiz. \n\nSiz bu yerda xonalarni bron qilishingiz, restoran menyusi bilan tanishishingiz va 360° virtual turdan bahramand bo'lishingiz mumkin.`,
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.webApp('🏛️ Mehmonxonani ko\'rish (Mini App)', WEB_APP_URL)],
                [Markup.button.callback('📞 Aloqa / Kontakt', 'contact'), Markup.button.callback('ℹ️ Biz haqimizda', 'about')]
            ])
        }
    );
});

// Inline tugmalar uchun ishlovchilar
bot.action('contact', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply('📞 Aloqa uchun telefonlar:\n+998 99 363-33-66\n+998 73 543 33 99\n\n📍 Manzil: Qo\'qon shahar, Turkiston 57 A.');
});

bot.action('about', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply('ℹ️ Silk Road Kokand Hotel — Qo\'qon shahridagi eng zamonaviy va hashamatli mehmonxonalardan biri hisoblanadi. Sizga yuqori darajadagi xizmatni taklif etamiz.');
});

// AI Butler: Ko'p tilli yordamchi (UZ, RU, EN)
const AI_RESPONSES = {
    // English
    en: {
        welcome: "Hello! I am your Silk Road AI Butler. How can I help you today?",
        rooms: "Our rooms are modern and comfortable. You can book them via our Mini App 🏛️ or by calling +998 73 543 33 99.",
        services: "We offer 5-star services: Free Wi-Fi, 24/7 Room Service, Restaurant, and Fitness Center.",
        contact: "You can find us at: Kokand, Turkiston str 57-A. Phone: +998 99 363 33 66",
        unknown: "I'm still learning, but I'd be happy to help you with our hotel services! Please type 'rooms', 'services' or 'contact'."
    },
    // Russian
    ru: {
        welcome: "Здравствуйте! Я — ваш ИИ-дворецкий Silk Road. Чем я могу вам помочь сегодня?",
        rooms: "Наши номера современные и комфортабельные. Вы можете забронировать их через Мини-приложение 🏛️ или по телефону +998 73 543 33 99.",
        services: "Мы предлагаем 5-звездочные услуги: Бесплатный Wi-Fi, 24/7 Обслуживание номеров, Ресторан и Фитнес-центр.",
        contact: "Мы находимся по адресу: Коканд, ул. Туркестан 57-А. Телефон: +998 99 363 33 66",
        unknown: "Я еще учусь, но буду рад помочь вам с нашими гостиничными услугами! Напишите 'номера', 'услуги' или 'контакты'."
    },
    // Uzbek
    uz: {
        welcome: "Assalomu alaykum! Men Silk Road AI yordamchisiman. Sizga qanday yordam bera olaman?",
        rooms: "Bizning xonalarimiz zamonaviy va shinam. Siz ularni Mini Ilova 🏛️ orqali yoki +998 73 543 33 99 raqami orqali bron qilishingiz mumkin.",
        services: "Biz 5 yulduzli xizmatlarni taklif etamiz: Bepul Wi-Fi, 24/7 Xona xizmati, Restoran va Fitnes markazi.",
        contact: "Bizning manzil: Qo'qon sh., Turkiston ko'chasi 57-A. Telefon: +998 99 363 33 66",
        unknown: "Men hali o'rganyapman, ammo mehmonxonamiz xizmatlari bo'yicha yordam berishdan xursand bo'laman! 'xonalar', 'xizmatlar' yoki 'aloqa' deb yozishingiz mumkin."
    }
};

bot.on('text', async (ctx) => {
    const text = ctx.message.text.toLowerCase();
    const lang = ctx.from.language_code === 'ru' ? 'ru' : (ctx.from.language_code === 'uz' ? 'uz' : 'en');
    const r = AI_RESPONSES[lang] || AI_RESPONSES.uz;

    if (text.includes('assalom') || text.includes('hello') || text.includes('привет')) {
        return ctx.reply(`👋 ${r.welcome}`);
    } else if (text.includes('xona') || text.includes('room') || text.includes('номер')) {
        return ctx.reply(`🛏️ ${r.rooms}`);
    } else if (text.includes('xizmat') || text.includes('service') || text.includes('услуг')) {
        return ctx.reply(`💼 ${r.services}`);
    } else if (text.includes('manzil') || text.includes('adress') || text.includes('адрес') || text.includes('aloqa')) {
        return ctx.reply(`📍 ${r.contact}`);
    } else {
        return ctx.reply(`🤖 ${r.unknown}`);
    }
});

// Bot menyusini sozlash (Pastda turadigan asosiy tugma)
bot.telegram.setChatMenuButton({
    menuButton: {
        type: 'web_app',
        text: 'Silk Road',
        web_app: { url: WEB_APP_URL }
    }
});

console.log('--- Bot Premium AI Butler bilan ishga tushmoqda... ---');

bot.launch().then(() => {
    console.log('--- Bot muvaffaqiyatli ishga tushdi! ---');
});

// Stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
