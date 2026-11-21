import SectionTitle from "./SectionTitle";
import { testimonials } from "../data/menu";

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Reviews" title="Loved by hungry people" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-brand-500">★★★★★</p>
              <blockquote className="mt-3 text-stone-700">“{t.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">
                  {t.name[0]}
                </span>
                <span>
                  <span className="block text-sm font-bold">{t.name}</span>
                  <span className="block text-xs text-stone-500">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
