import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Instagram, Facebook, Car, Coffee, Wind, ShieldCheck,
  Twitter, User, Maximize, Play, Clock, Cloud, Wifi,
  RotateCw, Maximize2, X, Search, ChevronLeft, ChevronRight, Phone, Mail, Send,
  Utensils, Droplets, MapPin, Bus, Soup, ParkingCircle, BellRing, Presentation,
  MessageSquare, UserCircle, Calendar, Bot, Award, Sparkles, Globe, LayoutDashboard,
  TrendingUp, Users, LogOut, Key, MousePointer2, CreditCard,
  Hotel, Wallet, Settings, ArrowUpRight, ArrowDownRight, Activity, Menu
} from "lucide-react";

import "./index.css";


const CONF_IMAGES = [
  "https://silkroad-kokand.uz/img/9ac0ec8c0e9dc251.webp",
  "https://silkroad-kokand.uz/img/cdd298379cca386e.webp",
  "https://silkroad-kokand.uz/img/62a3c9a2305970ee.webp",
  "https://silkroad-kokand.uz/img/d649f28fb59c9c0e.webp"
];

const RESTAURANT_IMAGES = [
  "https://silkroad-kokand.uz/img/35053f3e539edb41.webp",
  "https://silkroad-kokand.uz/img/a83bc715b82914fc.webp",
  "https://silkroad-kokand.uz/img/dae7eda8483c3ab8.webp",
  "https://silkroad-kokand.uz/img/0bb01cd593acd512.webp",
  "https://silkroad-kokand.uz/img/00c140ea8a0fc2f0.webp",
  "https://silkroad-kokand.uz/img/cc283d7cbef92a1d.webp"
];

// --- PROFESSIONAL DATA ---
const TRANSLATIONS = {
  UZ: {
    nav: ["Meros", "Xizmatlar", "Xonalar", "Aloqa"],
    brand: "SILK ROAD KOKAND",
    heroTitlePrefix: "Shaffoflik &",
    heroTitleGold: "Hashamat.",
    heroSub: "EKSKLYUZIV DIZAYN",
    heroDesc: "Qo'qon shahrining boy tarixi va zamonaviy hashamat uyg'unlashgan makon. Siz uchun maxsus yaratilgan tajriba.",
    servicesTitle: "Eksklyuziv Xizmatlar",
    servicesIntro: "Silk Road Kokand mehmonxonasi restoran xizmati va konsyerjdan tortib yig'ilish xonalari va mehmonlarning to'liq qulayligini ta'minlaydigan qo'shimcha qulayliklargacha bo'lgan qulay va yoqimli turar joy uchun keng ko'lamli xizmatlarni taklif etadi.",
    confTitle: "Konferentsiya Zali",
    confDesc: "Silk Road Kokand mehmonxonasining zamonaviy yig'ilish xonasi ish uchrashuvlari, taqdimotlar va korporativ tadbirlar uchun zarur bo'lgan barcha narsalar bilan jihozlangan.",
    roomsTitle: "Bizning Xonalar",
    roomsSub: "ZAMONAVIY TO'PLAM",
    explore: "BATAFSIL KO'RISH",
    watchVideo: "VIDEONI KO'RISH",
    discover: "KASHF ETING",
    followUs: "BIZGA QO'SHILING",
    reserve: "BAND QILISH",
    priceSub: "1 kecha uchun",
    checkPrice: "Sanalarni tekshirish",
    people: "kishi",
    roomsCount: "xona",
    loading: "Jarayon...",
    kokand: "Qo'qon",
    soundOn: "Ovoz Yoniq",
    soundOff: "Ovoz O'chiq",
    badgeLabel: "ELITE STAY",
    stats: [
      { num: "5*", label: "Oliy darajada" },
      { num: "100+", label: "Eksklyuziv Suitlar" },
      { num: "24/7", label: "Mukammal Xizmat" }
    ],
    roomsIntroTitle: "Silk Road Kokand Mehmonxonasi Xonalari",
    roomsIntroDesc: "Silk Road Kokand mehmonxonasi qulaylik, uslub va o'ylangan dizaynni o'zida mujassam etgan turli xil xonalarni taklif etadi:",
    roomsIntroList: [
      { name: "Standart xona", desc: "qulaylik va funksionallikni qidirayotgan do'stlar yoki hamkasblar uchun juda mos keladi." },
      { name: "Yaxshilangan (Superior) xona", desc: "bu kichik guruhlar yoki oilalar uchun keng turar joy." },
      { name: "Junior Suite", desc: "bu sizning dam olishingiz uchun qulaylik va kengaytirilgan makonning kombinatsiyasi." },
      { name: "Suite Luxe", desc: "bu aqlli interyer va barcha zamonaviy qulayliklarga ega oqlangan xona." },
      { name: "Executive Suite", desc: "bu yuqori darajadagi qulaylik va maxsus holatlar uchun zamonaviy muhit." },
      { name: "Grand Suite", desc: "premium ta'tilni qadrlaydigan mehmonlar uchun makon, hashamat va xizmatning maksimal darajasi." }
    ],
    rooms: [
      { name: "Standart Bir Kishilik", price: "450,000", cap: "1", area: "25" },
      { name: "Standart Ikki Kishilik", price: "550,000", cap: "2", area: "35" },
      { name: "Superior Ikki Kishilik", price: "650,000", cap: "2", area: "40" },
      { name: "Superior Uch Kishilik", price: "850,000", cap: "3", area: "45" },
      { name: "Superior To'rt Kishilik", price: "1,100,000", cap: "4", area: "55" },
      { name: "Junior Suite", price: "1,300,000", cap: "2", area: "65" },
    ],
    hotelServices: [
      { title: "MINDAL restorani", desc: "Mehmonlarni oqlangan muhitda lazzatli tushlik yoki kechki ovqatdan bahramand bo'lishga taklif qilamiz.", icon: <Utensils size={32} /> },
      { title: "Shved stoli nonushtasi", desc: "Har kuni 07:00 dan 10:00 gacha (yakshanba 11:00 gacha) keng turdagi sara taomlardan bahramand bo'ling.", icon: <Soup size={32} /> },
      { title: "Bepul Avtoturargoh", desc: "Mehmonlar uchun 24/7 qo'riqlanadigan, mikroavtobuslar uchun ham mos keladigan bepul to'xtash joyi.", icon: <ParkingCircle size={32} /> },
      { title: "Konsyerj xizmati", desc: "Ekskursiyalar, restoranlarni bron qilish va diqqatga sazovor joylar bo'yicha professional operativ yordam.", icon: <BellRing size={32} /> },
      { title: "Kir yuvish va Dazmollash", desc: "Yuqori sifatli yuvish vositalari bilan kiyimlaringizni yangilaymiz.", icon: <Droplets size={32} /> },
      { title: "Transfer xizmati", desc: "Aeroport, vokzal va mehmonxona o'rtasida qulay va xavfsiz harakatlanishni ta'minlaymiz.", icon: <Bus size={32} /> }
    ],
    restLabel: "MINDAL RESTAURANT",
    restTitle: "Mehmonxona Restorani",
    restDesc: "Mehmonxonamizning restorani - bu ajoyib ta'm, qulay muhit va yuqori darajadagi xizmat bilan birlashtirilgan joy. Menyuda yangi va sifatli ingredientlardan tayyorlangan milliy va Yevropa taomlari mavjud.",
    restFeatures: [
      { title: "Milliy va Yevropa taomlari", sub: "Professional oshpazlar tomonidan" },
      { title: "Nonushta: 07:00 - 10:00", sub: "Yakshanba 11:00 gacha" },
      { title: "Biznes tushlik", sub: "Qulay kechki ovqat" }
    ],
    restMenu: "MENYU KO'RISH",
    contactTitle: "Kontaktlar / Silk Road Kokand",
    contactAddress: "Manzil va yo'nalishlar",
    contactAddressText: "Farg'ona viloyati, Qo'qon shahri, Turkiston ko'chasi, 57 A",
    contactPhoneTitle: "Aloqa telefonlari",
    contactEmailTitle: "Elektron pochta",
    vipTitle: "VIP TAKLIF",
    vipDesc: "Bugun bron qiling va bepul transferga ega bo'ling!",
    contactAdmin: "Xizmat ko'rsatuvchi ma'muriyat",
    contactManager: "Bosh Menejer",
    bookTitle: "Xonani Band Qilish",
    bookSub: "Ma'lumotlaringizni qoldiring, biz sizga aloqaga chiqamiz.",
    fullName: "To'liq Ismingiz",
    fullNamePh: "Masalan: Aziz Azizov",
    phone: "Telefon Raqamingiz",
    phonePh: "+998 -- --- -- --",
    checkIn: "Kelish Sanasi",
    checkOut: "Ketish Sanasi",
    adults: "Kattalar Soni",
    children: "Bolalar Soni",
    childAgeLabel: "BOLALARNING YOSHI (ILTIMOS KIRITING)",
    childAgePh: "bola yoshi",
    roomType: "Xona Turi",
    bookConfirm: "BAND QILISHNI YAKUNLASH",
    aiButler: "AI BUTLER",
    aiStatus: "Online / Silk Road Help",
    aiPh: "Savolingizni yozing...",
    aiSteps: [
      "Assalomu alaykum! Silk Road Kokand AI Butler xizmatiga xush kelibsiz. Ismingizni bilsam bo'ladimi?",
      "Xursandman, {name}! Qaysi sanalarga xona qidiryapsiz? (Masalan: 20-25 mart)",
      "Tushunarli. Necha kishi (kattalar va bolalar) bo'lasizlar?",
      "Ajoyib! Farzandlaringiz bo'lsa, ularning yoshi nechada? Bu bizga eng zo'r xonani taklif qilish uchun kerak.",
      "Ma'lumotlar uchun rahmat! Men hamma ma'lumotlarni yozib oldim. To'liq bron qilish uchun 'Band qilish' tugmasini bosishingiz mumkin yoki menejerimiz sizga o'zi aloqaga chiqadi."
    ],
    login: "Kirish",
    profile: "Profil",
    cabTitle: "Shaxsiy Kabinet",
    adminTitle: "Admin Panel",
    dashboard: "Dashboard",
    statsLabel: "Statistika",
    visitors: "Tashrif buyuruvchilar",
    revenue: "Tushum",
    bookedRooms: "Bron qilingan xonalar",
    topClients: "Top Mijozlar",
    geoStats: "Geografik statistika",
    usersList: "Foydalanuvchilar ro'yxati",
    regDate: "Ro'yxatdan o'tgan sana",
    logout: "Chiqish",
    welcome: "Xush kelibsiz",
    admin: {
      dashboard: "Boshqaruv",
      rooms: "Xonalar",
      guests: "Mehmonlar",
      finances: "Moliya",
      occupancy: "Bandlik darajasi",
      revenue: "Tushum",
      nps: "Mamnuniyat",
      feed: "Jonli Bronlar",
      staff: "Xodimlar holati",
      welcome: "Xush kelibsiz",
      updates: "Jonli yangilanishlar",
      priority: "Ustuvorlik"
    }
  },
  RU: {
    nav: ["История", "Услуги", "Номера", "Контакты"],
    brand: "SILK ROAD KOKAND",
    heroTitlePrefix: "Чистота &",
    heroTitleGold: "Роскошь.",
    heroSub: "ЭКСКЛЮЗИВНЫЙ ДИЗАЙН",
    heroDesc: "Гармония древней истории и современной роскоши Коканда. Опыт, созданный для вас.",
    servicesTitle: "Эксклюзивные Услуги",
    servicesIntro: "Отель Silk Road Kokand предлагает широкий спектр услуг для комфортного проживания.",
    confTitle: "Конференц-Зал",
    confDesc: "Современный конференц-зал отеля Silk Road Kokand оснащен всем необходимым для деловых встреч.",
    roomsTitle: "Наши Номера",
    roomsSub: "СОВРЕМЕННАЯ КОЛЛЕКЦИЯ",
    explore: "УЗНАТЬ БОЛЬШЕ",
    watchVideo: "СМОТРЕТЬ ВИДЕО",
    discover: "ОТКРЫТЬ ЭЛИТУ",
    followUs: "ПОДПИСЫВАЙТЕСЬ",
    reserve: "ЗАБРОНИРОВАТЬ",
    priceSub: "за 1 ночь",
    checkPrice: "Узнать цену",
    people: "места",
    roomsCount: "комн.",
    loading: "Загрузка...",
    kokand: "Коканд",
    soundOn: "Звук Вкл",
    soundOff: "Звук Выкл",
    badgeLabel: "ЭЛИТНЫЙ КЛАСС",
    stats: [
      { num: "5*", label: "Высший класс" },
      { num: "100+", label: "Элитные номера" },
      { num: "24/7", label: "Полный сервис" }
    ],
    rooms: [
      { name: "Стандарт Одноместный", price: "450,000", cap: "1", area: "25" },
      { name: "Стандарт Двухместный", price: "550,000", cap: "2", area: "35" },
      { name: "Супериор Двухместный", price: "650,000", cap: "2", area: "40" },
      { name: "Супериор Трехместный", price: "850,000", cap: "3", area: "45" },
      { name: "Супериор Четырехместный", price: "1,100,000", cap: "4", area: "55" },
      { name: "Джуниор Сюит", price: "1,300,000", cap: "2", area: "65" },
    ],
    hotelServices: [
      { title: "Ресторан MINDAL", desc: "Элегантная атмосфера для обедов и ужинов.", icon: <Utensils size={32} /> },
      { title: "Завтрак 'Шведский стол'", desc: "Каждый день широкий выбор свежих блюд.", icon: <Soup size={32} /> },
      { title: "Парковка", desc: "Охраняемая парковка доступна круглосуточно.", icon: <ParkingCircle size={32} /> },
      { title: "Услуги консьержа", desc: "Помощь в организации вашего досуга.", icon: <BellRing size={32} /> },
      { title: "Стирка и глажка", desc: "Профессиональный уход за вашей одеждой.", icon: <Droplets size={32} /> },
      { title: "Трансфер", desc: "Комфортный трансфер от аэропорта и вокзала.", icon: <Bus size={32} /> }
    ],
    restLabel: "\u0420\u0415\u0421\u0422\u041e\u0420\u0410\u041d MINDAL",
    restTitle: "\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d \u041e\u0442\u0435\u043b\u044f",
    restDesc: "\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d \u043d\u0430\u0448\u0435\u0433\u043e \u043e\u0442\u0435\u043b\u044f \u2014 \u044d\u0442\u043e \u043c\u0435\u0441\u0442\u043e, \u0433\u0434\u0435 \u0438\u0437\u044b\u0441\u043a\u0430\u043d\u043d\u044b\u0439 \u0432\u043a\u0443\u0441 \u0441\u043e\u0447\u0435\u0442\u0430\u0435\u0442\u0441\u044f \u0441 \u0443\u044e\u0442\u043d\u043e\u0439 \u0430\u0442\u043c\u043e\u0441\u0444\u0435\u0440\u043e\u0439 \u0438 \u0432\u044b\u0441\u043e\u043a\u043e\u043a\u043b\u0430\u0441\u0441\u043d\u044b\u043c \u043e\u0431\u0441\u043b\u0443\u0436\u0438\u0432\u0430\u043d\u0438\u0435\u043c. \u0412 \u043c\u0435\u043d\u044e \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u044b \u043d\u0430\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u0438 \u0435\u0432\u0440\u043e\u043f\u0435\u0439\u0441\u043a\u0438\u0435 \u0431\u043b\u044e\u0434\u0430 \u0438\u0437 \u0441\u0432\u0435\u0436\u0438\u0445 \u0438\u043d\u0433\u0440\u0435\u0434\u0438\u0435\u043d\u0442\u043e\u0432.",
    restFeatures: [
      { title: "\u041d\u0430\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u0430\u044f \u0438 \u0435\u0432\u0440\u043e\u043f\u0435\u0439\u0441\u043a\u0430\u044f \u043a\u0443\u0445\u043d\u044f", sub: "\u041e\u0442 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0448\u0435\u0444-\u043f\u043e\u0432\u0430\u0440\u043e\u0432" },
      { title: "\u0417\u0430\u0432\u0442\u0440\u0430\u043a: 07:00 - 10:00", sub: "\u041f\u043e \u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u044f\u043c \u0434\u043e 11:00" },
      { title: "\u0411\u0438\u0437\u043d\u0435\u0441-\u043b\u0430\u043d\u0447", sub: "\u0423\u044e\u0442\u043d\u044b\u0439 \u0443\u0436\u0438\u043d" }
    ],
    restMenu: "ПОСМОТРЕТЬ МЕНЮ",
    contactTitle: "Контакты / Silk Road Kokand",
    contactAddress: "Адрес и направления",
    contactAddressText: "Ферганская область, город Коканд, улица Туркистон, 57 А",
    contactPhoneTitle: "Контактные телефоны",
    contactEmailTitle: "Электронная почта",
    vipTitle: "VIP ПРЕДЛОЖЕНИЕ",
    vipDesc: "Забронируйте сегодня и получите бесплатный трансфер!",
    contactAdmin: "Администрация отеля",
    contactManager: "Главный менеджер",
    bookTitle: "Бронирование Номера",
    bookSub: "Оставьте свои данные, и мы свяжемся с вами.",
    fullName: "Полное Имя",
    fullNamePh: "Например: Азиз Азизов",
    phone: "Номер Телефона",
    phonePh: "+998 -- --- -- --",
    checkIn: "Дата Заезда",
    checkOut: "Дата Выезда",
    adults: "Кол-во Взрослых",
    children: "Кол-во Детей",
    childAgeLabel: "ВОЗРАСТ ДЕТЕЙ (ПОЖАЛУЙСТА, УКАЖИТЕ)",
    childAgePh: "ребенок",
    roomType: "Тип Номера",
    bookConfirm: "ЗАВЕРШИТЬ БРОНИРОВАНИЕ",
    aiButler: "AI БАТЛЕР",
    aiStatus: "В сети / Помощь Silk Road",
    aiPh: "Введите ваш вопрос...",
    aiSteps: [
      "Здравствуйте! Добро пожаловать в AI Butler Silk Road Kokand. Как я могу к вам обращаться?",
      "Рад знакомству, {name}! На какие даты вы планируете поездку? (Например: 20-25 марта)",
      "Понятно. Сколько человек (взрослых и детей) будет в вашей группе?",
      "Замечательно! Какого возраста ваши дети? Это поможет нам предложить лучший вариант.",
      "Спасибо за информацию! Я все записал. Для завершения бронирования нажмите кнопку 'Забронировать' или наш менеджер свяжется с вами."
    ],
    login: "Вход",
    profile: "Профиль",
    cabTitle: "Личный Кабинет",
    adminTitle: "Панель Админа",
    dashboard: "Дашборд",
    statsLabel: "Статистика",
    visitors: "Посетители",
    revenue: "Доход",
    bookedRooms: "Забронированные номера",
    topClients: "Топ Клиенты",
    geoStats: "Географическая статистика",
    usersList: "Список пользователей",
    geoStats: "География",
    usersList: "Клиенты",
    regDate: "Рег. дата",
    logout: "Выйти",
    welcome: "Добро пожаловать",
    roomsIntroTitle: "Номера отеля Silk Road Kokand",
    roomsIntroDesc: "Отель Silk Road Kokand предлагает разнообразные номера, сочетающие в себе комфорт, стиль и продуманный дизайн:",
    roomsIntroList: [
      { name: "Стандартный номер", desc: "идеально подходит для друзей или коллег, ищущих комфорт и функциональность." },
      { name: "Улучшенный (Superior) номер", desc: "просторное размещение для небольших групп или семей." },
      { name: "Джуниор Сюит", desc: "сочетание комфорта и расширенного пространства для вашего отдыха." },
      { name: "Сюит Люкс", desc: "элегантный номер с изысканным интерьером и всеми современными удобствами." },
      { name: "Представительский (Executive) сюит", desc: "высокий уровень комфорта и стильная обстановка для особых случаев." },
      { name: "Гранд Сюит", desc: "максимальное пространство, роскошь и уровень сервиса для ценителей премиального отдыха." }
    ],
    admin: {
      dashboard: "Панель управления",
      rooms: "Номера",
      guests: "Гости",
      finances: "Финансы",
      occupancy: "Загрузка отеля",
      revenue: "Доход",
      nps: "Лояльность",
      feed: "Лента бронирований",
      staff: "Статус персонала",
      welcome: "Добро пожаловать",
      updates: "Живые обновления",
      priority: "Приоритет"
    }
  },
  EN: {
    nav: ["Heritage", "Services", "Rooms", "Contact"],
    brand: "SILK ROAD KOKAND",
    heroTitlePrefix: "Heritage &",
    heroTitleGold: "Luxury.",
    heroSub: "EXCLUSIVE DESIGN",
    heroDesc: "Where Kokand's rich history meets modern luxury. An experience crafted just for you.",
    servicesTitle: "Exclusive Services",
    servicesIntro: "Silk Road Kokand Hotel offers a wide range of services for a comfortable stay.",
    confTitle: "Conference Hall",
    confDesc: "The modern conference hall of Silk Road Kokand is equipped with everything necessary.",
    roomsTitle: "Elite Rooms",
    roomsSub: "ULTRA-MODERN COLLECTION",
    explore: "EXPLORE NOW",
    watchVideo: "WATCH VIDEO",
    discover: "DISCOVER ELITE",
    followUs: "FOLLOW US",
    reserve: "BOOK NOW",
    priceSub: "per night",
    checkPrice: "Check Price",
    people: "people",
    roomsCount: "rooms",
    loading: "Loading...",
    kokand: "Kokand",
    soundOn: "Sound On",
    soundOff: "Sound Off",
    badgeLabel: "ELITE STAY",
    stats: [
      { num: "5*", label: "Hotel Rating" },
      { num: "100+", label: "Exclusive Suites" },
      { num: "24/7", label: "Full Concierge" }
    ],
    rooms: [
      { name: "Standard Single", price: "450,000", cap: "1", area: "25" },
      { name: "Standard Twin", price: "550,000", cap: "2", area: "35" },
      { name: "Superior Twin", price: "650,000", cap: "2", area: "40" },
      { name: "Superior Triple", price: "850,000", cap: "3", area: "45" },
      { name: "Superior Quad", price: "1,100,000", cap: "4", area: "55" },
      { name: "Junior Suite", price: "1,300,000", cap: "2", area: "65" },
    ],
    hotelServices: [
      { title: "MINDAL Restaurant", desc: "Lunch or dinner in an elegant atmosphere.", icon: <Utensils size={32} /> },
      { title: "Buffet Breakfast", desc: "Fresh dishes from 07:00 to 10:00 every morning.", icon: <Soup size={32} /> },
      { title: "Free Parking", desc: "Secure 24/7 parking available for all guests.", icon: <ParkingCircle size={32} /> },
      { title: "Concierge Service", desc: "Expert help with bookings and personalization.", icon: <BellRing size={32} /> },
      { title: "Laundry & Ironing", desc: "Professional wash and iron services.", icon: <Droplets size={32} /> },
      { title: "Transfer Service", desc: "Safe transportation to and from the hotel.", icon: <Bus size={32} /> }
    ],
    restLabel: "MINDAL RESTAURANT",
    restTitle: "Hotel Restaurant",
    restDesc: "Our hotel restaurant is a place where exquisite taste meets a cozy atmosphere and top-notch service. The menu features national and European dishes made from fresh, quality ingredients.",
    restFeatures: [
      { title: "National & European Cuisine", sub: "By professional chefs" },
      { title: "Breakfast: 07:00 - 10:00", sub: "Sundays until 11:00" },
      { title: "Business Lunch", sub: "Cozy dinner" }
    ],
    restMenu: "VIEW MENU",
    contactTitle: "Contacts / Silk Road Kokand",
    contactAddress: "Address & Directions",
    contactAddressText: "57 A, Turkiston street, Kokand city, Fergana region",
    contactPhoneTitle: "Contact Phones",
    contactEmailTitle: "Email",
    vipTitle: "VIP OFFER",
    vipDesc: "Book today and get a free airport transfer!",
    contactDesc: "The hotel is conveniently located in the center of Kokand, making it easily accessible for all city guests.",
    contactAdmin: "Hotel Administration",
    contactManager: "General Manager",
    bookTitle: "Book a Room",
    bookSub: "Leave your details and we will contact you.",
    fullName: "Full Name",
    fullNamePh: "John Doe",
    phone: "Phone",
    phonePh: "+998 -- --- -- --",
    checkIn: "Check-in Date",
    checkOut: "Check-out Date",
    adults: "Adults",
    children: "Children",
    childAgeLabel: "CHILDREN'S AGE (PLEASE SPECIFY)",
    childAgePh: "child age",
    roomType: "Room Type",
    bookConfirm: "FINISH BOOKING",
    aiButler: "AI Butler",
    aiStatus: "Online / Silk Road Help",
    aiPh: "Type your question...",
    aiSteps: [
      "Hello! Welcome to Silk Road Kokand AI Butler service. May I know your name?",
      "Nice to meet you, {name}! For which dates are you looking for a room? (e.g. March 20-25)",
      "Understood. How many guests (adults and children) will you be?",
      "Great! If you have children, how old are they? This helps us suggest the best room.",
      "Thank you for the information! I have recorded everything. You can click 'Book now' or our manager will contact you."
    ],
    login: "Login",
    profile: "Profile",
    cabTitle: "Personal Cabinet",
    adminTitle: "Admin Panel",
    dashboard: "Dashboard",
    statsLabel: "Statistics",
    visitors: "Visitors",
    revenue: "Revenue",
    bookedRooms: "Booked",
    topClients: "Top Clients",
    geoStats: "Geo Stats",
    usersList: "Users List",
    regDate: "Reg. Date",
    logout: "Logout",
    welcome: "Welcome",
    roomsIntroTitle: "Rooms of Silk Road Kokand Hotel",
    roomsIntroDesc: "Silk Road Kokand Hotel offers a variety of rooms that combine comfort, style, and thoughtful design:",
    roomsIntroList: [
      { name: "Standard Room", desc: "perfect for friends or colleagues seeking comfort and functionality." },
      { name: "Superior Room", desc: "spacious accommodation for small groups or families." },
      { name: "Junior Suite", desc: "a combination of comfort and expanded space for your relaxation." },
      { name: "Suite Luxe", desc: "an elegant room with a smart interior and all modern amenities." },
      { name: "Executive Suite", desc: "high-level comfort and a stylish setting for special occasions." },
      { name: "Grand Suite", desc: "maximum space, luxury, and service level for guests who value premium stay." }
    ]
  },
  ZH: {
    nav: ["传承", "服务", "客房", "联系"],
    brand: "浩罕丝路酒店",
    heroTitlePrefix: "传承与",
    heroTitleGold: "奢华.",
    heroSub: "独家设计",
    heroDesc: "浩罕丰富的历史与现代奢华的交汇。为您量身打造的体验。",
    servicesTitle: "独家服务",
    servicesIntro: "Silk Road Kokand酒店提供全方位服务，确保您的舒适住宿。",
    confTitle: "会议厅",
    confDesc: "Silk Road Kokand酒店的现代化会议厅配备了商务会议所需的一切设施。",
    roomsTitle: "顶级客房",
    roomsSub: "现代系列",
    explore: "了解更多",
    watchVideo: "观看视频",
    discover: "探索精英",
    followUs: "关注我们",
    reserve: "立即预订",
    priceSub: "每晚",
    checkPrice: "查询价格",
    people: "人",
    roomsCount: "间",
    loading: "加载中...",
    kokand: "浩罕",
    soundOn: "声音开",
    soundOff: "声音关",
    badgeLabel: "尊贵入住",
    stats: [
      { num: "5*", label: "酒店评级" },
      { num: "100+", label: "豪华套房" },
      { num: "24/7", label: "全天服务" }
    ],
    rooms: [
      { name: "标准单人间", price: "450,000", cap: "1", area: "25" },
      { name: "标准双人间", price: "550,000", cap: "2", area: "35" },
      { name: "高级双人间", price: "650,000", cap: "2", area: "40" },
      { name: "高级三人间", price: "850,000", cap: "3", area: "45" },
      { name: "高级四人间", price: "1,100,000", cap: "4", area: "55" },
      { name: "初级套房", price: "1,300,000", cap: "2", area: "65" },
    ],
    hotelServices: [
      { title: "MINDAL餐厅", desc: "在优雅的氛围中享用午餐或晚餐。", icon: <Utensils size={32} /> },
      { title: "自助早餐", desc: "每天07:00至10:00提供新鲜菜品。", icon: <Soup size={32} /> },
      { title: "免费停车", desc: "全天候安全停车场。", icon: <ParkingCircle size={32} /> },
      { title: "礼宾服务", desc: "专业的预订和个性化协助。", icon: <BellRing size={32} /> },
      { title: "洗衣熨烫", desc: "专业洗涤和熨烫服务。", icon: <Droplets size={32} /> },
      { title: "接送服务", desc: "安全便捷的酒店往返交通。", icon: <Bus size={32} /> }
    ],
    restLabel: "MINDAL 餐厅",
    restTitle: "酒店餐厅",
    restDesc: "我们的酒店餐厅是美味佳肴、温馨氛围和优质服务的完美结合。菜单提供由新鲜优质食材烹制的民族和欧洲菜肴。",
    restFeatures: [
      { title: "民族和欧洲美食", sub: "由专业厨师烹制" },
      { title: "早餐: 07:00 - 10:00", sub: "周日至11:00" },
      { title: "商务午餐", sub: "温馨晚餐" }
    ],
    restMenu: "查看菜单",
    contactTitle: "联系我们 / Silk Road Kokand",
    contactAddress: "地址和路线",
    contactAddressText: "费尔干纳州，浩罕市，突厥斯坦街，57 A",
    contactPhoneTitle: "联系电话",
    contactEmailTitle: "电子邮件",
    vipTitle: "VIP 特惠",
    vipDesc: "今日预订即可享受免费接送服务！",
    contactDesc: "酒店位于浩罕市中心交通便利的位置，方便各位宾客出行。",
    contactAdmin: "酒店管理处",
    contactManager: "总经理",
    bookTitle: "预订客房",
    bookSub: "请留下您的联系方式，我们会与您联系。",
    fullName: "全名",
    fullNamePh: "例如：叶问",
    phone: "电话号码",
    phonePh: "+998 -- --- -- --",
    checkIn: "入住日期",
    checkOut: "退房日期",
    adults: "成人",
    children: "儿童",
    childAgeLabel: "儿童年龄（请注明）",
    childAgePh: "孩子年龄",
    roomType: "客房类型",
    bookConfirm: "完成预订",
    aiButler: "AI 管家",
    aiStatus: "在线 / 丝绸之路帮助",
    aiPh: "输入您的问题...",
    aiSteps: [
      "您好！欢迎使用 Silk Road Kokand AI 管家服务。请问您怎么称呼？",
      "很高兴认识您，{name}！您打算什么时候入住？（例如：3月20日至25日）",
      "明白了。请问您一共有多少人（成人和儿童）？",
      "太棒了！如果您带了孩子，他们多大了？这将帮助我们为您推荐最好的选择。",
      "感谢您提供的信息！我已经全部记录下来了。您可以点击“立即预订”或等待我们的管理员与您联系。"
    ],
    login: "登录",
    profile: "个人资料",
    cabTitle: "个人中心",
    adminTitle: "管理员面板",
    dashboard: "仪表板",
    statsLabel: "统计数据",
    visitors: "访客",
    revenue: "收入",
    bookedRooms: "已预订客房",
    topClients: "顶级客户",
    geoStats: "地理统计",
    usersList: "用户列表",
    regDate: "注册日期",
    logout: "退出",
    welcome: "欢迎",
    roomsIntroTitle: "浩罕丝绸之路酒店客房",
    roomsIntroDesc: "Silk Road Kokand 酒店提供各种精品客房，融合了舒适、时尚和周到的设计：",
    roomsIntroList: [
      { name: "标准客房", desc: "非常适合追求舒适和功能性的朋友或同事。" },
      { name: "高级客房", desc: "为小型团体或家庭提供宽敞的住宿。" },
      { name: "初级套房", desc: "舒适与宽敞空间的完美结合，让您尽情放松。" },
      { name: "豪华套房", desc: "一间专为尊贵客人设计的优雅客房，配备了所有现代化设施。" },
      { name: "行政套房", desc: "为特殊场合提供高标准的舒适合时尚的环境。" },
      { name: "全景套房", desc: "为追求顶级休闲体验的宾客提供最大的空间、奢华和服务。" }
    ]
  }
};

const HERO_IMAGES = [
  "https://silkroad-kokand.uz/img/67782364611c65c5.webp",
  "https://silkroad-kokand.uz/img/123915fc51264554.webp",
  "https://silkroad-kokand.uz/img/caae39234b600613.webp"
];

const EXELY_IMGS = [
  "https://silkroad-kokand.uz/img/123915fc51264554.webp",
  "https://secure.exely.com/resource/thumb/1000x600/rt/5060666/638999277645967267-882ec1a2-18c2-4140-89c4-9f634b150fbe",
  "https://secure.exely.com/resource/thumb/1000x600/rt/5060667/638999277676589453-289c959f-67f2-40b9-9886-769e6d8855ae",
  "https://silkroad-kokand.uz/img/b63a22da30ca55fd.webp",
  "https://silkroad-kokand.uz/img/caae39234b600613.webp",
  "https://secure.exely.com/resource/thumb/1000x600/rt/5060669/638999277688422466-883cfc75-7d39-4359-b9db-ffdb534eadf1"
];

const ROOM_CAROUSELS = [
  [EXELY_IMGS[0], EXELY_IMGS[1], EXELY_IMGS[4]],
  [EXELY_IMGS[1], EXELY_IMGS[2], EXELY_IMGS[3]],
  [EXELY_IMGS[2], EXELY_IMGS[3], EXELY_IMGS[5]],
  [EXELY_IMGS[3], EXELY_IMGS[4], EXELY_IMGS[0]],
  [EXELY_IMGS[4], EXELY_IMGS[5], EXELY_IMGS[1]],
  [EXELY_IMGS[5], EXELY_IMGS[0], EXELY_IMGS[2]],
];

const CinemaTour = ({ image, onClose }) => {
  return (
    <div className="vr-container cinematic-tour">
      <button className="close-vr" onClick={onClose}><X size={32} /></button>
      <div className="panorama-overflow">
        <motion.div
          className="panorama-strips"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          animate={{ x: [-1000, 0] }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          style={{ cursor: 'grab' }}
        >
          <img src={image} alt="Panorama" className="cinematic-img" />
        </motion.div>
      </div>
      <div className="vr-notice">
        <div style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '2px', fontSize: '12px' }}>🎥 CINEMATIC TOUR</div>
        <p>Xonani ko'rish uchun rasmni surishingiz mumkin.</p>
      </div>
    </div>
  );
}

function PremiumRoomCard({ r, images, t, index, onZoom, on360, onBook }) {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <div className="booking-card-wrapper">
      <div className="booking-img-container" style={{ position: "relative" }}>
        <img src={images[imgIdx]} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

        {/* Hover Navigation Details */}
        <div style={{ position: "absolute", bottom: "15px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 10 }}>
          {images.map((_, i) => (
            <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: i === imgIdx ? "var(--primary)" : "rgba(255,255,255,0.4)", transition: "0.3s" }} />
          ))}
        </div>

        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px", pointerEvents: "none" }}>
          <button onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx - 1 + images.length) % images.length); }} style={{ pointerEvents: "auto", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.8)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}><ChevronLeft size={20} color="#1a1a1a" /></button>
          <button onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx + 1) % images.length); }} style={{ pointerEvents: "auto", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.8)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}><ChevronRight size={20} color="#1a1a1a" /></button>
        </div>

        <div style={{ position: "absolute", top: "15px", right: "15px", display: "flex", gap: "10px", zIndex: 10 }}>
          <button onClick={() => onZoom(images, imgIdx)} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>
            <Maximize2 size={16} color="white" />
          </button>
          <button onClick={() => on360(images[0])} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
            <RotateCw size={16} color="white" />
          </button>
        </div>
      </div>

      <div className="booking-content">
        <h3 className="booking-room-type">{r.name}</h3>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", opacity: 0.6, fontSize: "13px" }}>
          <span><User size={14} style={{ marginBottom: "-3px", marginRight: "5px" }} /> {r.cap} {t.people}</span>
          <span><Maximize size={14} style={{ marginBottom: "-3px", marginRight: "5px" }} /> {r.area} m²</span>
        </div>
        <div className="price-main">{r.price} <span style={{ fontSize: "1rem", fontWeight: 500, opacity: 0.6 }}>UZS</span></div>
        <button className="booking-cta-full" onClick={onBook}>{t.checkPrice}</button>
      </div>
    </div>
  );
}


function App() {
  const [lang, setLang] = useState("UZ");
  const t = TRANSLATIONS[lang];

  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null); // {name, role}
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [view, setView] = useState('site'); // 'site', 'cabinet', 'admin'
  const [adminTab, setAdminTab] = useState("dashboard");
  const [lightboxData, setLightboxData] = useState(null);
  const [activeVRImage, setActiveVRImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [confImgIdx, setConfImgIdx] = useState(0);
  const [restImgIdx, setRestImgIdx] = useState(0);
  const [isBottomReached, setIsBottomReached] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const horizontalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    // SDK TG
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.headerColor = "#0d0d0d";
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- NEW PREMIUM STATES ---
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showVipToast, setShowVipToast] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Assalomu alaykum! Silk Road Kokand AI Butler xizmatiga xush kelibsiz. Ismingizni bilsam bo\'ladimi?' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: 'Standard',
    adults: 1,
    children: 0,
    childAges: []
  });

  const openBooking = () => {
    setIsBookingOpen(true);
  };

  const handleChildCountChange = (count) => {
    const val = parseInt(count) || 0;
    setBookingForm({
      ...bookingForm,
      children: val,
      childAges: Array(val).fill("")
    });
  };

  const updateChildAge = (index, age) => {
    const newAges = [...bookingForm.childAges];
    newAges[index] = age;
    setBookingForm({ ...bookingForm, childAges: newAges });
  };

  const [chatStep, setChatStep] = useState(0); // 0: Name, 1: Dates, 2: Guests, 3: Children

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    const newMsgs = [...chatMessages, { role: 'user', text: userMsg }];
    setChatMessages(newMsgs);
    setChatInput("");

    setTimeout(() => {
      let aiResponse = "";
      const currentSteps = t.aiSteps;
      if (chatStep === 0) {
        setBookingForm(prev => ({ ...prev, name: userMsg }));
        aiResponse = currentSteps[1].replace("{name}", userMsg);
        setChatStep(1);
      } else if (chatStep === 1) {
        aiResponse = currentSteps[2];
        setChatStep(2);
      } else if (chatStep === 2) {
        aiResponse = currentSteps[3];
        setChatStep(3);
      } else {
        aiResponse = currentSteps[4];
      }

      setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 1000);
  };

  useEffect(() => {
    setChatMessages([{ role: 'ai', text: TRANSLATIONS[lang].aiSteps[0] }]);
    setChatStep(0);
  }, [lang]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (authForm.username === 'admin' && authForm.password === 'admin') {
      setUser({ name: 'Admin', role: 'admin' });
      setView('admin');
    } else {
      setUser({ name: authForm.username || 'Mehmon', role: 'user' });
      setView('cabinet');
    }
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setView('site');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const ageString = bookingForm.childAges.length > 0 ? ` (Yoshlari: ${bookingForm.childAges.join(', ')})` : '';
    const details = `
      Ism: ${bookingForm.name}
      Tel: ${bookingForm.phone}
      Sana: ${bookingForm.checkIn} - ${bookingForm.checkOut}
      Xona: ${bookingForm.roomType}
      Kattalar: ${bookingForm.adults}
      Bolalar: ${bookingForm.children}${ageString}
    `;
    alert(`Rahmat, ${bookingForm.name}! So'rovingiz qabul qilindi.\n\n${details}\n\nMenejerimiz tez orada bog'lanadi.`);
    setIsBookingOpen(false);
  };

  const audioRef = useRef(null);
  const cursorRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const watermarkX = useTransform(scrollYProgress, [0.4, 0.9], [0, 600]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    const timeTimer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }));
    }, 1000);

    // Show VIP Toast after 5 seconds
    const vipTimer = setTimeout(() => setShowVipToast(true), 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeTimer);
      clearTimeout(vipTimer);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (!isMuted) audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
      else audioRef.current.pause();
    }
  }, [isMuted]);

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 10000);
    return () => clearInterval(sliderTimer);
  }, [currentImgIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.75);
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 350;
      setIsBottomReached(isAtBottom);
    };
    window.addEventListener("scroll", handleScroll);
    const updateMouseObj = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("mousemove", updateMouseObj);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", updateMouseObj);
    };
  }, []);

  const slideTo = (index) => {
    if (horizontalRef.current) {
      horizontalRef.current.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
      setCurrentSlide(index);
    }
  };

  const handleHorizontalScroll = (e) => {
    const scrollX = e.target.scrollLeft;
    const index = Math.round(scrollX / window.innerWidth);
    if (index !== currentSlide) setCurrentSlide(index);
  };
  if (view === 'admin' && user?.role === 'admin') {
    const adminStats = [
      { id: "dashboard", label: t.admin.occupancy, val: "94%", trend: "+4%", icon: <Hotel size={22} />, color: "var(--accent-gold)" },
      { id: "finances", label: t.admin.revenue, val: "1.2M UZS", trend: "+12%", icon: <TrendingUp size={22} />, color: "var(--accent-green)" },
      { id: "guests", label: t.admin.nps, val: "4.9/5", trend: "+0.2", icon: <Award size={22} />, color: "var(--accent-blue)" },
      { id: "rooms", label: "Cleaning Status", val: "98%", trend: "12 Pending", icon: <Clock size={22} />, color: "var(--primary)" },
    ];

    const recentBookings = [
      { user: "Aziz Azizov", room: "Superior Suite 402", checkIn: "Today", value: "2.4M", status: "Active" },
      { user: "Sardor Ahmedov", room: "Deluxe King 105", checkIn: "Tomorrow", value: "1.8M", status: "Premium" },
      { user: "Elena Ivanova", room: "Standard Twin 208", checkIn: "Today", value: "950K", status: "Active" },
      { user: "John Smith", room: "Royal Silk Suite 501", checkIn: "In 2 days", value: "5.2M", status: "VIP" },
    ];

    // Admin-only language toggle
    const toggleAdminLang = () => {
      setLang(lang === "UZ" ? "RU" : "UZ");
    };

    return (
      <div className="admin-bg">
        <aside className="admin-sidebar-lux">
          <div className="brand-area-admin">
            <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.8rem', color: 'var(--primary)', letterSpacing: '4px' }}>SRK</h1>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '2px' }}>Luxury Management</p>
          </div>

          <nav style={{ flex: 1 }}>
            <button key="dashboard" onClick={() => setAdminTab("dashboard")} className={`sidebar-item-lux ${adminTab === 'dashboard' ? 'active' : ''}`}>
              <LayoutDashboard size={20} /> {t.admin.dashboard}
            </button>
            <button key="rooms" onClick={() => setAdminTab("rooms")} className={`sidebar-item-lux ${adminTab === 'rooms' ? 'active' : ''}`}>
              <Hotel size={20} /> {t.admin.rooms}
            </button>
            <button key="guests" onClick={() => setAdminTab("guests")} className={`sidebar-item-lux ${adminTab === 'guests' ? 'active' : ''}`}>
              <Users size={20} /> {t.admin.guests}
            </button>
            <button key="finances" onClick={() => setAdminTab("finances")} className={`sidebar-item-lux ${adminTab === 'finances' ? 'active' : ''}`}>
              <Wallet size={20} /> {t.admin.finances}
            </button>
          </nav>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={toggleAdminLang} className="sidebar-item-lux" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '15px' }}><Globe size={20} /> {lang}</div>
              <div style={{ fontSize: '10px', opacity: 0.5 }}>Switch to {lang === 'UZ' ? 'RU' : 'UZ'}</div>
            </button>
            <button className="sidebar-item-lux logout" onClick={handleLogout} style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}>
              <LogOut size={20} /> {t.logout}
            </button>
          </div>
        </aside>

        <main className="admin-main-viewport">
          <AnimatePresence mode="wait">
            {adminTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} key="dash">
                <section className="manager-banner">
                  <div className="banner-glow" />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <span className="lux-label" style={{ color: 'var(--primary)' }}>{t.admin.updates}</span>
                    <h2 className="title-serif-huge" style={{ fontSize: '2.8rem', marginBottom: '16px', color: 'white' }}>{t.admin.welcome}, {user.name}</h2>
                    <p style={{ opacity: 0.6, maxWidth: '500px' }}>
                      {lang === 'UZ' ? "Sizning binoingiz bugun eng yuqori darajada ishlamoqda. Kelgusi 2 soat ichida 4 ta VIP mehmon kelishi kutilmoqda." : "Ваш объект сегодня работает на пике эффективности. В ближайшие 2 часа ожидаются 4 VIP-прилета."}
                    </p>

                    <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                      <button className="admin-action-btn">VIP List</button>
                      <button className="lux-btn" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>Inventory</button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>24°C</div>
                    <p style={{ opacity: 0.4 }}>Kokand, Uzbekistan</p>
                  </div>
                </section>

                <div className="admin-grid-lux">
                  {adminStats.map((s, i) => (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} key={s.label} className="kpi-card-reborn">
                      <div className="kpi-icon-glow" style={{ color: s.color }}>{s.icon}</div>
                      <span className="kpi-label-lux">{s.label}</span>
                      <div className="kpi-value-huge">{s.val}</div>
                      <div className={`trend-indicator ${s.trend.startsWith('+') ? 'up' : 'down'}`}>
                        {s.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span>{s.trend} last wk</span>
                      </div>
                    </motion.div>
                  ))}

                  <motion.div className="main-chart-lux" transition={{ delay: 0.2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                      <h3 style={{ fontSize: '1.4rem' }}>{t.admin.occupancy}</h3>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--primary)' }}>● Live</span>
                      </div>
                    </div>
                    <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                      <svg viewBox="0 0 1000 300" style={{ width: '100%', height: '100%' }}>
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2.5 }}
                          d="M0,250 Q100,200 200,220 T400,100 T600,150 T800,50 T1000,80"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="4"
                        />
                        <path d="M0,250 Q100,200 200,220 T400,100 T600,150 T800,50 T1000,80 L1000,300 L0,300 Z" fill="url(#chartGrad)" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div className="activity-widget">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                      <h3>{t.admin.staff}</h3>
                      <Activity size={18} color="var(--primary)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                      {[
                        { name: "Reception", status: "Active", color: "var(--accent-blue)" },
                        { name: "Butlers", status: "On Duty", color: "var(--accent-green)" },
                        { name: "Security", status: "Patrol", color: "var(--accent-gold)" },
                      ].map((st, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: st.color, boxShadow: `0 0 15px ${st.color}` }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: 600 }}>{st.name}</div>
                            <div style={{ fontSize: '11px', opacity: 0.5 }}>{st.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div className="table-container-2026">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                      <h3>{t.admin.feed}</h3>
                      <div className="status-badge-lux active">HOTEL LIVE</div>
                    </div>
                    <table className="lux-table-reborn">
                      <thead>
                        <tr>
                          <th>Guest</th>
                          <th>Accom</th>
                          <th>Period</th>
                          <th>Value</th>
                          <th>{t.admin.priority}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((b, i) => (
                          <tr key={i} className="lux-table-row-reborn">
                            <td><div style={{ fontWeight: 700 }}>{b.user}</div></td>
                            <td>{b.room}</td>
                            <td>{b.checkIn}</td>
                            <td style={{ color: 'var(--primary)', fontWeight: 800 }}>{b.value} UZS</td>
                            <td><span className={`status-badge-lux ${b.status.toLowerCase()}`}>{b.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {adminTab === 'rooms' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key="rooms_v">
                <header style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '2rem' }}>{t.admin.rooms} Management</h2>
                  <p style={{ opacity: 0.5 }}>Real-time inventory and status control</p>
                </header>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="kpi-card-reborn" style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>10{i + 1}</div>
                      <div className="status-badge-lux active" style={{ fontSize: '9px' }}>AVAILABLE</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {adminTab === 'guests' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key="guests_v">
                <header style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '2rem' }}>{t.admin.guests} Database</h2>
                </header>
                <div className="table-container-2026">
                  <p style={{ padding: '60px', textAlign: 'center', opacity: 0.5 }}>Guest profiles and history data loading...</p>
                </div>
              </motion.div>
            )}

            {adminTab === 'finances' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key="fin_v">
                <header style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '2rem' }}>{t.admin.finances} Insight</h2>
                </header>
                <div className="admin-grid-lux">
                  <div className="kpi-card-reborn" style={{ gridColumn: 'span 12' }}>
                    <p style={{ padding: '60px', textAlign: 'center', opacity: 0.5 }}>Financial reports and projections generating...</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    );
  }

  if (view === 'cabinet' && user) {
    return (
      <div className="cab-bg">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <button onClick={() => setView('site')} className="cab-back" style={{ opacity: 1, color: 'var(--primary)' }}>
            <ChevronLeft size={20} /> Back to Experience
          </button>
          <div className="page-status-badge">Active Session</div>
        </header>

        <div className="cab-container">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="cab-user-profile cab-card-lux">
            <div className="cab-avatar" style={{ width: '100px', height: '100px', fontSize: '2rem' }}>{user.name[0]}</div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{user.name}</h2>
            <div className="status-pill-lux" style={{ display: 'inline-block' }}>GOLD MEMBER</div>

            <nav className="cab-nav" style={{ marginTop: '40px' }}>
              <button className="active"><LayoutDashboard size={18} /> {t.dashboard}</button>
              <button><Calendar size={18} /> My Bookings</button>
              <button><CreditCard size={18} /> Payments</button>
              <button onClick={handleLogout} style={{ marginTop: '20px', color: '#ff4d4d' }}><LogOut size={18} /> {t.logout}</button>
            </nav>
          </motion.div>

          <div className="cab-content">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="kpi-card-2026" style={{ gridColumn: 'span 12' }}>
              <div className="kpi-card-glow" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="kpi-icon"><Award size={28} /></div>
                <div>
                  <span className="kpi-title-2026">LOYALTY BALANCE</span>
                  <span className="kpi-value-2026">24,500 points</span>
                </div>
              </div>
              <div className="progress-bar-neon" style={{ height: '8px' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1.5 }} className="progress-fill-neon" />
              </div>
              <p style={{ fontSize: '11px', marginTop: '10px', opacity: 0.4 }}>Next reward: Free Airport Transfer (500 pts left)</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="cab-card-lux" style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h3>Recent Activity</h3>
                <TrendingUp size={20} color="var(--primary)" />
              </div>
              <div style={{ padding: '60px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '20px' }}>
                <p style={{ opacity: 0.3 }}>No active bookings at the moment.</p>
                <button className="lux-btn" style={{ marginTop: '20px' }}>Start New Booking</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="elite-wrapper">
      <div ref={cursorRef} className="cursor-aura" />

      {/* 🌟 AUTH MODAL */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div className="booking-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 1000000 }}>
            <div className="booking-modal-bg-blur" onClick={() => setIsAuthModalOpen(false)} />
            <motion.div className="booking-modal-content login-box" initial={{ y: 50, scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 30, scale: 0.95, opacity: 0 }}>
              <div className="booking-form-wrap">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2 className="title-serif-huge" style={{ fontSize: '2rem', color: 'white' }}>{t.login}</h2>
                  <p style={{ opacity: 0.5, fontSize: '12px' }}>Shaxsiy kabinetga kirish</p>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="lux-input-group">
                    <label>Foydalanuvchi nomi / Email</label>
                    <div className="lux-input-with-icon">
                      <User className="lux-icon" size={18} />
                      <input type="text" className="lux-input" required placeholder="admin" value={authForm.username} onChange={e => setAuthForm({ ...authForm, username: e.target.value })} />
                    </div>
                  </div>
                  <div className="lux-input-group">
                    <label>Parol</label>
                    <div className="lux-input-with-icon">
                      <Key className="lux-icon" size={18} />
                      <input type="password" required className="lux-input" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} />
                    </div>
                  </div>
                  <button type="submit" className="booking-cta-full shimmer-btn" style={{ marginTop: '20px' }}>{t.login}</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '11px', opacity: 0.4 }}>Admin uchun: admin / admin</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 OVERLAYS */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div className="lightbox-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="close-lightbox" onClick={() => setLightboxData(null)}><X size={40} /></button>
            <div className="lightbox-nav-container">
              <button className="nav-btn-lux left" onClick={() => setLightboxData({ ...lightboxData, index: (lightboxData.index - 1 + lightboxData.images.length) % lightboxData.images.length })}><ChevronLeft size={32} /></button>
              <motion.img key={lightboxData.index} src={lightboxData.images[lightboxData.index]} onClick={(e) => e.stopPropagation()} />
              <button className="nav-btn-lux right" onClick={() => setLightboxData({ ...lightboxData, index: (lightboxData.index + 1) % lightboxData.images.length })}><ChevronRight size={32} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeVRImage && (
          <motion.div className="vr-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CinemaTour image={activeVRImage} onClose={() => setActiveVRImage(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 PREMIUM CUSTOM BOOKING MODAL */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div className="booking-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="booking-modal-bg-blur" onClick={() => setIsBookingOpen(false)} />
            <motion.div className="booking-modal-content" initial={{ y: 50, scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 30, scale: 0.95, opacity: 0 }} transition={{ type: "spring", damping: 30, stiffness: 250 }}>
              <button className="close-booking-btn" onClick={() => setIsBookingOpen(false)} style={{ zIndex: 1000 }}>
                <X size={28} />
              </button>
              <div className="booking-form-wrap">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <span className="lux-label">RESERVATION</span>
                  <h2 className="title-serif-huge" style={{ fontSize: '2.5rem', color: 'white' }}>{t.bookTitle}</h2>
                  <p style={{ opacity: 0.5, fontSize: '13px' }}>{t.bookSub}</p>
                </div>

                <form onSubmit={handleBookingSubmit}>
                  <div className="lux-input-group">
                    <label>{t.fullName}</label>
                    <div className="lux-input-with-icon">
                      <User className="lux-icon" size={18} />
                      <input type="text" required placeholder={t.fullNamePh} className="lux-input" value={bookingForm.name} onChange={e => setBookingForm({ ...bookingForm, name: e.target.value })} />
                    </div>
                  </div>
                  <div className="lux-input-group">
                    <label>{t.phone}</label>
                    <div className="lux-input-with-icon">
                      <Phone className="lux-icon" size={18} />
                      <input type="tel" required placeholder={t.phonePh} className="lux-input" value={bookingForm.phone} onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="lux-input-group">
                      <label>{t.checkIn}</label>
                      <div className="lux-input-with-icon">
                        <Calendar className="lux-icon" size={18} />
                        <input type="date" required className="lux-input" value={bookingForm.checkIn} onChange={e => setBookingForm({ ...bookingForm, checkIn: e.target.value })} />
                      </div>
                    </div>
                    <div className="lux-input-group">
                      <label>{t.checkOut}</label>
                      <div className="lux-input-with-icon">
                        <Calendar className="lux-icon" size={18} />
                        <input type="date" required className="lux-input" value={bookingForm.checkOut} onChange={e => setBookingForm({ ...bookingForm, checkOut: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="lux-input-group">
                      <label>{t.adults}</label>
                      <div className="lux-input-with-icon">
                        <UserCircle className="lux-icon" size={18} />
                        <input type="number" min="1" max="10" required className="lux-input" value={bookingForm.adults} onChange={e => setBookingForm({ ...bookingForm, adults: e.target.value })} />
                      </div>
                    </div>
                    <div className="lux-input-group">
                      <label>{t.children}</label>
                      <div className="lux-input-with-icon">
                        <Bot className="lux-icon" size={18} />
                        <input type="number" min="0" max="10" required className="lux-input" value={bookingForm.children} onChange={e => handleChildCountChange(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {bookingForm.children > 0 && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '15px', marginBottom: '24px', padding: '20px', background: 'rgba(194, 169, 139, 0.08)', borderRadius: '16px', border: '1px solid var(--primary)' }}
                      >
                        <div style={{ gridColumn: '1/-1', fontSize: '11px', letterSpacing: '1px', color: 'var(--primary)', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Bot size={14} /> {t.childAgeLabel}
                        </div>
                        {bookingForm.childAges.map((age, idx) => (
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} key={idx} className="lux-input-group" style={{ marginBottom: 0 }}>
                            <label style={{ fontSize: '10px', color: 'white', opacity: 0.8 }}>{idx + 1}-{t.childAgePh}</label>
                            <input type="number" min="0" max="17" required placeholder="Yosh" className="lux-input" style={{ padding: '10px 15px', border: '1px solid rgba(194,169,139,0.3)' }} value={age} onChange={e => updateChildAge(idx, e.target.value)} />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="lux-input-group">
                    <label>{t.roomType}</label>
                    <div className="lux-input-with-icon">
                      <MapPin className="lux-icon" size={18} />
                      <select className="lux-input lux-select" value={bookingForm.roomType} onChange={e => setBookingForm({ ...bookingForm, roomType: e.target.value })}>
                        {t.rooms.map((rm, idx) => (
                          <option key={idx} value={rm.name} style={{ background: '#1a1a1a' }}>{rm.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} type="submit" className="booking-cta-full shimmer-btn" style={{ marginTop: '20px', padding: '22px', fontSize: '14px', letterSpacing: '2px' }}>
                    {t.bookConfirm}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎬 IN-APP VIDEO MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              className="video-modal-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-video-modal" onClick={() => setIsVideoModalOpen(false)}>
                <X size={24} />
              </button>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/av9SnPEmTl0?autoplay=1"
                title="Silk Road Kokand Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '20px' }}
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🤖 SMART AI BUTLER CHAT */}
      <div className="ai-assistant-fab" onClick={() => setIsChatOpen(!isChatOpen)}>
        <div className="ai-glow" />
        <Bot size={28} />
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div className="ai-chat-window" initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.8 }}>
            <div className="ai-chat-header">
              <div className="ai-avatar"><User size={18} /></div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '1px' }}>{t.aiButler}</div>
                <div style={{ fontSize: '10px', opacity: 0.7 }}>{t.aiStatus}</div>
              </div>
              <button onClick={() => setIsChatOpen(false)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#0d0d0d' }}><X size={20} /></button>
            </div>
            <div className="ai-chat-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.role}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="ai-chat-input-wrap">
              <input type="text" className="ai-chat-input" placeholder={t.aiPh} value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} />
              <button className="ai-send-btn" onClick={handleSendMessage}><Send size={18} color="#0d0d0d" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏆 VIP TOAST */}
      <AnimatePresence>
        {showVipToast && (
          <motion.div className="vip-toast" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
            <div className="play-btn-pulse" style={{ width: '40px', height: '40px' }}><Sparkles size={16} color="white" /></div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '12px', color: 'var(--primary)' }}>{t.vipTitle}</div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>{t.vipDesc}</div>
            </div>
            <X size={16} style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => setShowVipToast(false)} />
          </motion.div>
        )}
      </AnimatePresence>



      <AnimatePresence>
        {loading && (
          <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="preloader-3d">
            <div className="logo-rotation-3d" />
            <motion.h1 style={{ position: "absolute", bottom: "40%", fontFamily: "var(--f-serif)", letterSpacing: "8px", color: "var(--primary)" }}>{t.brand}</motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="social-vertical-fixed" style={{ color: isScrolled ? "var(--primary)" : "white", opacity: isBottomReached ? 0 : 1, pointerEvents: isBottomReached ? 'none' : 'auto', transition: 'opacity 0.4s' }}>
        <Instagram size={18} /> <Facebook size={18} /> <Twitter size={18} />
        <div className="social-line" />
        <span style={{ writingMode: "vertical-rl", fontSize: "10px", opacity: 0.3, letterSpacing: "4px" }}>{t.followUs}</span>
      </div>

      <div className="local-widget-lux" style={{ opacity: isBottomReached ? 0 : 1, pointerEvents: isBottomReached ? 'none' : 'auto', transition: 'opacity 0.4s' }}>
        <Clock size={16} color="var(--primary)" /> <span>{time} {t.kokand}</span>
        <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.2)", margin: "0 5px" }} />
        <Cloud size={16} color="var(--primary)" /> <span>+24°C</span>
        <div className={`ambient-toggle ${!isMuted ? 'playing' : ''}`} onClick={() => setIsMuted(!isMuted)}>
          <div className="sound-bars"><div className="sound-bar" style={{ height: "4px" }} /><div className="sound-bar" style={{ height: "8px" }} /><div className="sound-bar" style={{ height: "12px" }} /></div>
          <span style={{ fontSize: "9px" }}>{isMuted ? "OFF" : "ON"}</span>
        </div>
      </div>

      <nav className="nav-elite" style={{ background: isScrolled ? "rgba(13,13,13,0.9)" : "transparent" }}>
        <div className="nav-brand-elite">SILK ROAD KOKAND</div>
        <div className="nav-links-elite">
          {t.nav.map((link, i) => (<a key={i} href={i === 1 ? "#services-horizontal" : i === 2 ? "#rooms" : "#"} className="nav-link-item">{link}</a>))}
        </div>
        <div className="nav-actions-elite">
          <div className="lang-switcher-elite">
            {["UZ", "RU", "EN", "ZH"].map((l) => (<span key={l} onClick={() => setLang(l)} className={`lang-dot ${lang === l ? 'active' : ''}`}>{l}</span>))}
          </div>
          <div style={{ color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setIsAuthModalOpen(true)}>
            <UserCircle size={24} color={user ? "var(--primary)" : "white"} />
          </div>
          <button className="lux-btn hide-mobile" onClick={openBooking}>{t.reserve}</button>
          <button className="mobile-menu-trigger" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} color="white" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="mobile-menu-overlay" initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}>
            <div className="mobile-menu-content">
              <button className="close-mobile-menu" onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
              <div className="mobile-menu-links">
                {t.nav.map((link, i) => (
                  <a key={i} href={i === 1 ? "#services-horizontal" : i === 2 ? "#rooms" : "#"} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>{link}</a>
                ))}
              </div>
              <div style={{ marginTop: 'auto', padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button className="lux-btn" style={{ width: '100%' }} onClick={() => { setIsMobileMenuOpen(false); openBooking(); }}>{t.reserve}</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏛️ HERO */}
      <section className="hero-intareo">
        <motion.div style={{ position: "absolute", inset: "-60px", zIndex: -3, transformStyle: "preserve-3d", pointerEvents: "none" }} animate={{ rotateX: mousePos.y * -8, rotateY: mousePos.x * 8, x: mousePos.x * -30, y: mousePos.y * -30 }} transition={{ type: "spring", stiffness: 60, damping: 30 }}>
          {HERO_IMAGES.map((img, i) => (<motion.div key={`m-${i}`} className="hero-bg-layer" style={{ backgroundImage: `url("${img}")` }} animate={{ opacity: currentImgIndex === i ? 1 : 0 }} transition={{ duration: 2.5 }} />))}
        </motion.div>
        <div className="hero-overlay-dark" />
        <div className="hero-content-grid container-lux">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }} className="hero-text-block">
            <span className="hero-badge">{t.badgeLabel}</span>
            <h1 className="hero-title-intareo">{t.heroTitlePrefix} <span className="hero-italic-gold">{t.heroTitleGold}</span></h1>
            <p>{t.heroDesc}</p>
            <div className="hero-cta-group">
              <button className="book-conf-btn pulse-glow" onClick={openBooking}>{t.reserve} <ChevronRight size={18} /></button>
              <button onClick={() => setIsVideoModalOpen(true)} className="video-btn-lux">
                <div className="play-icon-wrap"><Play size={12} fill="white" /></div>
                <span>{t.watchVideo}</span>
              </button>
            </div>

            <div className="glass-stats-panel-v2">
              {t.stats.map((s, i) => (
                <div key={i} className="stat-unit">
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="hero-visual-block" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.3 }}>
            <div className="hero-image-vignette">
              {HERO_IMAGES.map((img, i) => (
                <motion.img
                  key={`h-${i}`}
                  src={img}
                  alt="Luxury"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentImgIndex === i ? 1 : 0 }}
                  transition={{ duration: 2.5 }}
                />
              ))}
              <div className="vignette-overlay" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🏨 ROOMS */}
      <section id="rooms" className="booking-section">
        <div className="container-lux">

          {t.roomsIntroTitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: "80px", maxWidth: "1200px", margin: "0 auto 80px auto" }}
            >
              <div style={{ textAlign: "center", marginBottom: "60px" }}>
                <h3 style={{ fontSize: "3rem", fontFamily: 'var(--f-serif)', color: "var(--primary)", marginBottom: "20px", fontWeight: 500 }}>
                  {t.roomsIntroTitle}
                </h3>
                <p style={{ fontSize: "1.2rem", color: "var(--text-dim)", maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>
                  {t.roomsIntroDesc}
                </p>
              </div>

              <div className="rooms-intro-grid">
                {t.roomsIntroList?.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="room-spec-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <h4 style={{ color: "var(--primary)", fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>
                      {item.name}
                    </h4>
                    <p style={{ color: "var(--text-dim)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                      {item.desc.replace(/^-/, '').trim()}
                    </p>
                    <div className="arrow-icon">→</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          <div className="rooms-main-grid">
            {t.rooms.map((r, i) => (
              <PremiumRoomCard
                key={i}
                r={r}
                images={ROOM_CAROUSELS[i]}
                t={t}
                index={i}
                onZoom={(imgs, idx) => setLightboxData({ images: imgs, index: idx })}
                on360={setActiveVRImage}
                onBook={openBooking}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 🛎️ SERVICES */}
      <div id="services-horizontal" className="horizontal-lux-container" ref={horizontalRef} onScroll={handleHorizontalScroll}>
        <section className="horizontal-slide">
          <div className="slide-bg-wrap"><div className="services-bg-image-overlay" /></div>
          <div className="container-lux" style={{ position: "relative", zIndex: 10 }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "4.5rem", fontFamily: "var(--f-serif)", color: "white" }}>{t.servicesTitle}</h2>
              <p style={{ maxWidth: "800px", margin: "0 auto", color: "rgba(255,255,255,0.7)" }}>{t.servicesIntro}</p>
            </div>
            <div className="services-main-grid">
              {t.hotelServices.map((service, idx) => (
                <div key={idx} className="service-card-premium">
                  <div className="service-icon-wrap">{service.icon}</div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>
                </div>
              ))}
            </div>

            {/* 🎯 NEXT BUTTON - MOVED TO BOTTOM CENTER */}
            <div className="slide-footer-centered">
              <motion.button whileHover={{ y: -5 }} className="slide-next-btn-internal center" onClick={() => slideTo(1)}>
                <span>{t.confTitle}</span><ChevronRight size={20} />
              </motion.button>
              <div className="services-pagination-local integrated">
                <div className={`dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => slideTo(0)} />
                <div className={`dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => slideTo(1)} />
              </div>
            </div>
          </div>
          <motion.div className="service-bg-text-watermark centered" style={{ x: watermarkX }}>KOKAND</motion.div>
        </section>

        <section className="horizontal-slide">
          <div className="slide-bg-wrap" style={{ backgroundImage: `url('https://silkroad-kokand.uz/img/9ac0ec8c0e9dc251.webp')` }}><div className="services-bg-image-overlay" /></div>
          <div className="container-lux" style={{ position: "relative", zIndex: 10 }}>
            <div className="modern-split-info">
              <div className="conference-text-side">
                <h2 className="title-serif-huge">{t.confTitle}</h2>
                <p className="p-desc-lux">{t.confDesc}</p>
                <div className="conf-stats-elite" style={{ marginBottom: "40px" }}>
                  <div className="conf-stat-item"><div className="num">50+</div><div className="label">MEHMONLAR</div></div>
                  <div className="conf-stat-item"><div className="num">4K</div><div className="label">SIFAT</div></div>
                </div>
                <button className="book-conf-btn" onClick={openBooking}><span>BAND QILISH</span></button>
              </div>
              <div className="conference-visual-side">
                <div className="conf-img-frame" style={{ cursor: 'pointer' }} onClick={() => setConfImgIdx((confImgIdx + 1) % CONF_IMAGES.length)}>
                  <AnimatePresence mode="wait">
                    <motion.img key={confImgIdx} src={CONF_IMAGES[confImgIdx]} alt="Conference Hall" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                  </AnimatePresence>
                  <div className="lux-border-overlay" />
                </div>
                <div className="conf-carousel-dots">
                  {CONF_IMAGES.map((_, i) => (<div key={i} className={`conf-dot ${i === confImgIdx ? 'active' : ''}`} onClick={() => setConfImgIdx(i)} />))}
                </div>
              </div>
            </div>

            <div className="slide-footer-centered">
              <motion.button whileHover={{ y: -5 }} className="slide-prev-btn-internal center" onClick={() => slideTo(0)}>
                <ChevronLeft size={20} /><span>{t.servicesTitle}</span>
              </motion.button>
              <div className="services-pagination-local integrated">
                <div className={`dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => slideTo(0)} />
                <div className={`dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => slideTo(1)} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 🍽️ RESTAURANT SECTION */}
      <section className="restaurant-section">
        <div className="restaurant-bg-img" style={{ backgroundImage: `url('${RESTAURANT_IMAGES[0]}')` }}>
          <div className="restaurant-bg-overlay" />
        </div>
        <div className="container-lux" style={{ position: 'relative', zIndex: 10 }}>
          <div className="restaurant-split">
            <motion.div className="restaurant-gallery-side" initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
              <div className="restaurant-img-main">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img key={restImgIdx} src={RESTAURANT_IMAGES[restImgIdx]} alt="Restaurant" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                </AnimatePresence>
                <button className="rest-nav-btn left" onClick={() => setRestImgIdx((restImgIdx - 1 + RESTAURANT_IMAGES.length) % RESTAURANT_IMAGES.length)}><ChevronLeft size={20} /></button>
                <button className="rest-nav-btn right" onClick={() => setRestImgIdx((restImgIdx + 1) % RESTAURANT_IMAGES.length)}><ChevronRight size={20} /></button>
                <div className="rest-img-counter">0{restImgIdx + 1} / 0{RESTAURANT_IMAGES.length}</div>
                <div className="rest-zoom-btn" onClick={() => setLightboxData({ images: RESTAURANT_IMAGES, index: restImgIdx })}><Maximize2 size={18} color="white" /></div>
              </div>
              <div className="rest-thumbs">
                {RESTAURANT_IMAGES.map((img, i) => (<div key={i} className={`rest-thumb ${i === restImgIdx ? 'active' : ''}`} onClick={() => setRestImgIdx(i)}><img src={img} alt="" /></div>))}
              </div>
            </motion.div>

            <motion.div className="restaurant-text-side" initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
              <span className="lux-label">{t.restLabel}</span>
              <h2 className="title-serif-huge">{t.restTitle}</h2>
              <p className="p-desc-lux">{t.restDesc}</p>
              <div className="rest-features">
                <div className="rest-feature"><Utensils size={20} color="var(--primary)" /><div><strong>{t.restFeatures[0].title}</strong><span>{t.restFeatures[0].sub}</span></div></div>
                <div className="rest-feature"><Clock size={20} color="var(--primary)" /><div><strong>{t.restFeatures[1].title}</strong><span>{t.restFeatures[1].sub}</span></div></div>
                <div className="rest-feature"><Coffee size={20} color="var(--primary)" /><div><strong>{t.restFeatures[2].title}</strong><span>{t.restFeatures[2].sub}</span></div></div>
              </div>
              <a href="https://silkroad-kokand.uz/docs/639017377392190163-68f514d8-cacc-473c-a502-26c16dc0e680.pdf" target="_blank" className="book-conf-btn" style={{ display: 'inline-flex', textDecoration: 'none', marginTop: '20px' }}><span>{t.restMenu}</span></a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📞 CONTACT SECTION */}
      <section id="contact" className="contact-section">
        <div className="container-lux">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="lux-label">{t.contactTitle.split('/')[0]}</span>
            <h2 className="title-serif-huge" style={{ marginBottom: "60px" }}>{t.contactTitle}</h2>
          </motion.div>

          <div className="contact-grid">
            {/* CONTACT INFO */}
            <motion.div className="contact-info-col" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>

              <div className="contact-item">
                <div className="contact-icon"><MapPin size={24} /></div>
                <div>
                  <h4 className="contact-subtitle">{t.contactAddress}</h4>
                  <p className="contact-text">{t.contactAddressText}</p>
                  <div className="contact-gps">
                    <span>GPS: Kenglik: 40.5495675</span>
                    <span>Uzunlik: 70.9373619</span>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Phone size={24} /></div>
                <div>
                  <h4 className="contact-subtitle">{t.contactPhoneTitle}</h4>
                  <a href="tel:+998993633366" className="contact-link">+998 99 363-33-66 <span className="contact-sub">({t.contactAdmin})</span></a>
                  <a href="tel:+998735433399" className="contact-link">+998 73 543 33 99 <span className="contact-sub">({t.contactAdmin})</span></a>
                  <a href="tel:+998735433366" className="contact-link">+998 73 543 33 66 <span className="contact-sub">({t.contactManager})</span></a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Mail size={24} /></div>
                <div>
                  <h4 className="contact-subtitle">{t.contactEmailTitle}</h4>
                  <a href="mailto:info@silkroadkokand.com" className="contact-link highlight">info@silkroadkokand.com</a>
                </div>
              </div>

              <div className="contact-socials-wrapper">
                <h4 className="contact-subtitle">Ijtimoiy tarmoqlar:</h4>
                <div className="contact-socials">
                  <a href="tg://resolve?domain=kokandsilkroad" className="contact-social-btn"><Send size={18} /> Telegram</a>
                  <a href="whatsapp://send?phone=998910551441" className="contact-social-btn"><Phone size={18} /> WhatsApp</a>
                </div>
              </div>

            </motion.div>

            {/* MAP / MORE INFO */}
            <motion.div className="contact-map-col" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="map-placeholder" style={{ padding: 0 }}>
                <iframe
                  title="Silk Road Kokand Location"
                  src="https://maps.google.com/maps?q=40.5495675,70.9373619&hl=uz&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "contrast(1.1)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer style={{ padding: "30px 0", textAlign: "center", background: "var(--bg-dark)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container-lux" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <h2 style={{ fontSize: "1.2rem", fontFamily: 'var(--f-serif)', color: "white", letterSpacing: "6px", margin: 0 }}>{t.brand}</h2>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>
            © {new Date().getFullYear()} Silk Road Kokand Hotel. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "30px", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
            <span>+998 73 543 33 66</span>
            <span><MapPin size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--primary)' }} />Turkiston 57 A</span>
          </div>
        </div>
      </footer>
      {isMobile && (
        <div className="mobile-bottom-nav">
          {t.nav.map((link, i) => (
            <a key={i} href={i === 1 ? "#services-horizontal" : i === 2 ? "#rooms" : "#"} className="mobile-bottom-tab">
              {i === 0 ? <Hotel size={20} /> : i === 1 ? <Activity size={20} /> : i === 2 ? <LayoutDashboard size={20} /> : <Phone size={20} />}
              <span>{link}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
