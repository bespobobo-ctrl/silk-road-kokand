const { Telegraf, Markup } = require('telegraf');

// Bot tokeni (foydalanuvchi tomonidan taqdim etilgan)
const TOKEN = '8771174586:AAHDZ4e9tdzbFTqAwkfBRfraOfcyIMBC0kY';

// WebApp URL (Vercel'da mehmonxona sayti joylashgan link)
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

// Bot menyusini sozlash (Pastda turadigan asosiy tugma)
bot.telegram.setChatMenuButton({
    menuButton: {
        type: 'web_app',
        text: 'Silk Road',
        web_app: { url: WEB_APP_URL }
    }
});

bot.launch().then(() => {
    console.log('--- Bot Premium darajada ishga tushdi! ---');
});

// Stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
