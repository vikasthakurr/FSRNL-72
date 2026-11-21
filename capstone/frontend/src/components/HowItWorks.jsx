import SectionTitle from "./SectionTitle";

const steps = [
  { icon: "📍", title: "Choose a kitchen", text: "Browse kitchens near you by cuisine, rating and delivery time." },
  { icon: "🍛", title: "Pick your meal", text: "Add dishes from one kitchen to your cart and set your address." },
  { icon: "🛵", title: "Get it delivered", text: "Your order is cooked fresh and reaches you in about 30 minutes." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionTitle eyebrow="How it works" title="From kitchen to doorstep in three steps" />
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-2xl border border-stone-200 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-3xl">{s.icon}</div>
            <p className="mt-5 text-sm font-bold text-brand-600">Step {i + 1}</p>
            <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-stone-600">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
