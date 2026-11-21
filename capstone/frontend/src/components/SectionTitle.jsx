export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-stone-600">{subtitle}</p>}
    </div>
  );
}
