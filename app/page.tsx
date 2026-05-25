import Link from "next/link";
import { LandingNav } from "@/components/landing/LandingNav";
import { Zap, Sparkles, Clock, Shield, Instagram, Linkedin, Twitter, Facebook, ChevronDown } from "lucide-react";

const features = [
  { icon: <Sparkles size={24} />, title: "AI متقدم", desc: "يفهم نبرة كل منصة ويكتب بأسلوبها" },
  { icon: <Clock size={24} />, title: "ثوانٍ وليس ساعات", desc: "ولّد 7 منشورات جاهزة في أقل من 10 ثوانٍ" },
  { icon: <Shield size={24} />, title: "آمن وخاص", desc: "مفاتيح API سرية دائماً على السيرفر فقط" },
  { icon: <Zap size={24} />, title: "قابل للتخصيص", desc: "عدّل وحسّن كل منشور بنقرة واحدة" },
];

const platforms = [
  { icon: <Instagram size={20} />, name: "Instagram", color: "text-pink-500" },
  { icon: <Linkedin size={20} />, name: "LinkedIn", color: "text-blue-600" },
  { icon: <Twitter size={20} />, name: "X", color: "text-sky-400" },
  { icon: <Facebook size={20} />, name: "Facebook", color: "text-blue-500" },
];

const faqs = [
  { q: "هل يعمل بالعربي؟", a: "نعم! Postly يدعم إنتاج محتوى عربي وإنجليزي حسب الفكرة التي تدخلها." },
  { q: "كم منشور يولّد في كل مرة؟", a: "تختار أنت: 3 أو 5 أو 7 منشورات لكل طلب." },
  { q: "هل أحتاج بطاقة ائتمان؟", a: "لا! يعتمد على Groq المجاني وClerk المجاني في المراحل الأولى." },
  { q: "هل البيانات محفوظة؟", a: "السجل والمسودات محفوظة في متصفحك فقط، لا يُشارك شيء." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <LandingNav />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6 border" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            <Zap size={14} className="text-sky-500" /> مدعوم بـ Groq AI
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            محتوى سوشيال ميديا
            <span className="text-sky-500"> احترافي</span>
            <br />في ثوانٍ معدودة
          </h1>
          <p className="text-xl mb-10" style={{ color: "var(--muted)" }}>
            صف فكرتك، اختر المنصة والنبرة، واحصل على عدة منشورات جاهزة للتعديل والنشر.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/auth/sign-up" className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition text-lg">
              ابدأ مجاناً ←
            </Link>
            <Link href="/auth/sign-in" className="px-8 py-3 rounded-xl font-semibold border transition text-lg hover:bg-slate-50 dark:hover:bg-slate-800" style={{ borderColor: "var(--border)" }}>
              دخول
            </Link>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-12 border-y" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-10 flex-wrap">
          <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>يدعم</p>
          {platforms.map((p) => (
            <div key={p.name} className={`flex items-center gap-2 font-semibold ${p.color}`}>
              {p.icon} {p.name}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">لماذا Postly؟</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card p-6">
                <div className="text-sky-500 mb-3">{f.icon}</div>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4" style={{ background: "var(--card)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">كيف يعمل؟</h2>
          <div className="space-y-8">
            {[
              { n: "1", title: "صف فكرتك", desc: "اكتب ما تريد قوله في مربع النص الكبير" },
              { n: "2", title: "اختر المنصة والنبرة", desc: "Instagram، LinkedIn، X، أو Facebook — رسمي أو مرح أو ملهم" },
              { n: "3", title: "ولّد وعدّل", desc: "اضغط Generate واحصل على منشورات متعددة، عدّلها أو حسّنها بنقرة" },
            ].map((s) => (
              <div key={s.n} className="flex gap-5 items-start">
                <span className="w-10 h-10 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center shrink-0 text-lg">{s.n}</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                  <p style={{ color: "var(--muted)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">أسئلة شائعة</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="card p-5 group cursor-pointer">
                <summary className="flex items-center justify-between font-semibold list-none">
                  {faq.q}
                  <ChevronDown size={18} className="group-open:rotate-180 transition-transform" style={{ color: "var(--muted)" }} />
                </summary>
                <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center" style={{ background: "var(--card)" }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">جاهز تبدأ؟</h2>
          <p className="mb-8" style={{ color: "var(--muted)" }}>انشئ حساباً مجانياً الآن وولّد أول منشور في أقل من دقيقة.</p>
          <Link href="/auth/sign-up" className="px-10 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-lg transition inline-block">
            ابدأ مجاناً ←
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
        © 2025 Postly — مشروع تخرج
      </footer>
    </div>
  );
}
