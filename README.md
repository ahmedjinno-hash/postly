# 🚀 Postly — دليل التشغيل خطوة بخطوة

> مولّد محتوى سوشيال ميديا بالذكاء الاصطناعي | مشروع تخرج

---

## ✅ المتطلبات قبل البدء

| الأداة | الإصدار | رابط التنزيل |
|--------|---------|--------------|
| Node.js | 18 أو أحدث | https://nodejs.org |
| npm | يأتي مع Node | — |
| حساب Clerk | مجاني | https://clerk.com |
| حساب Groq | مجاني | https://console.groq.com |

---

## 📁 هيكل المشروع

```
postly/
├── app/
│   ├── api/
│   │   ├── generate/route.ts   ← API توليد المنشورات
│   │   └── rewrite/route.ts    ← API تحسين المنشور
│   ├── auth/
│   │   ├── sign-in/            ← صفحة تسجيل الدخول
│   │   └── sign-up/            ← صفحة التسجيل
│   ├── dashboard/
│   │   ├── history/page.tsx    ← صفحة السجل
│   │   ├── settings/page.tsx   ← الإعدادات
│   │   ├── layout.tsx
│   │   └── page.tsx            ← المولّد الرئيسي
│   ├── layout.tsx              ← Layout أساسي
│   ├── page.tsx                ← الصفحة الرئيسية
│   └── globals.css
├── components/
│   ├── generator/
│   │   ├── GeneratorForm.tsx   ← نموذج الإدخال
│   │   └── VariationCard.tsx   ← بطاقة المنشور
│   ├── landing/
│   │   └── LandingNav.tsx      ← شريط التنقل
│   └── layout/
│       └── DashboardLayout.tsx ← هيكل Dashboard
├── hooks/
│   ├── useGenerateContent.ts
│   ├── useCopy.ts
│   └── useDraftPersistence.ts
├── lib/
│   ├── groq.ts                 ← التواصل مع Groq AI
│   ├── prompts.ts              ← بناء الـ Prompts
│   ├── schemas.ts              ← التحقق من البيانات
│   └── utils.ts
├── middleware.ts               ← حماية المسارات
├── .env.example                ← نموذج المتغيرات
├── package.json
└── tailwind.config.ts
```

---

## 🔧 خطوات التشغيل (مفصّلة للمبتدئ)

### الخطوة 1 — تحضير حساب Clerk (المصادقة)

1. اذهب إلى https://clerk.com وأنشئ حساباً مجانياً
2. اضغط **"Create application"**
3. اختر اسم التطبيق: `Postly`
4. فعّل **Email** كطريقة دخول (ممكن تفعّل Google أيضاً)
5. اضغط **Create application**
6. ستظهر لك الـ API Keys — انسخها:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (يبدأ بـ `pk_test_`)
   - `CLERK_SECRET_KEY` (يبدأ بـ `sk_test_`)

### الخطوة 2 — تحضير Groq API Key

1. اذهب إلى https://console.groq.com
2. سجّل بحساب Google أو GitHub
3. اضغط **"API Keys"** من القائمة الجانبية
4. اضغط **"Create API Key"**
5. انسخ الـ Key (يبدأ بـ `gsk_`)
   ⚠️ احفظه الآن لأنه لن يظهر مرة ثانية!

### الخطوة 3 — تثبيت المشروع

افتح Terminal (أو Command Prompt) وشغّل:

```bash
# انتقل لمجلد المشروع
cd postly

# ثبّت المكتبات (قد تأخذ 2-3 دقائق)
npm install
```

### الخطوة 4 — إعداد المتغيرات السرية

```bash
# انسخ ملف المثال
cp .env.example .env.local
```

افتح `.env.local` بأي محرر نصوص وأضف قيمك:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_أضف_قيمتك_هنا
CLERK_SECRET_KEY=sk_test_أضف_قيمتك_هنا
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
GROQ_API_KEY=gsk_أضف_قيمتك_هنا
```

### الخطوة 5 — تشغيل المشروع

```bash
npm run dev
```

افتح المتصفح على: **http://localhost:3000** 🎉

---

## 🌐 النشر على Vercel (اختياري)

1. ارفع المشروع على GitHub (بدون `.env.local`!)
2. اذهب إلى https://vercel.com وسجّل دخول
3. اضغط **"New Project"** واختر الـ repository
4. في قسم **Environment Variables**، أضف نفس متغيرات `.env.local`
5. اضغط **Deploy** ✅

---

## ⚠️ مشاكل شائعة وحلولها

| المشكلة | الحل |
|---------|------|
| `GROQ_API_KEY غير موجود` | تأكد من وجود `.env.local` وأنك أعدت تشغيل السيرفر |
| صفحة بيضاء بعد تسجيل الدخول | تحقق من CLERK keys في `.env.local` |
| `npm install` يعطي خطأ | تأكد Node.js 18+ بكتابة `node --version` |
| خطأ 429 من Groq | انتظر دقيقة — تجاوزت الحد المجاني مؤقتاً |
| المنشورات بالإنجليزي | اكتب فكرتك بالعربي في مربع النص |

---

## 🎯 ميزات المشروع

- ✅ تسجيل دخول آمن عبر Clerk
- ✅ توليد 3، 5، أو 7 منشورات دفعة واحدة
- ✅ دعم Instagram, LinkedIn, X, Facebook
- ✅ 5 أنماط كتابة مختلفة
- ✅ تعديل كل منشور يدوياً
- ✅ تحسين المنشور (اختصار / توسيع / إعادة كتابة)
- ✅ نسخ بنقرة واحدة
- ✅ حفظ المسودة تلقائياً في المتصفح
- ✅ سجل الجلسات السابقة
- ✅ وضع ليلي / نهاري
- ✅ يعمل على الموبايل
- ✅ اختصار Ctrl+Enter للتوليد السريع

---

## 🔒 الأمان

- مفتاح Groq API **لا يُرسل للمتصفح أبداً** — يبقى على السيرفر فقط
- جميع طلبات API تتحقق من هوية المستخدم أولاً
- لا قاعدة بيانات خارجية — السجل في المتصفح فقط
"# postly" 
"# postly" 
