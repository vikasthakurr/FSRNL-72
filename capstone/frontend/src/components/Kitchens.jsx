import SectionTitle from "./SectionTitle";
import { kitchens } from "../data/menu";

export default function Kitchens({ selected, onSelect }) {
  return (
    <section id="kitchens" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Our kitchens"
          title="Popular kitchens near you"
          subtitle="Select a kitchen to see only its dishes in the menu below."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kitchens.map((k) => {
            const active = selected === k.name;
            return (
              <article
                key={k.id}
                className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-2 transition hover:shadow-lg ${
                  active ? "ring-brand-500" : "ring-transparent"
                }`}
              >
                <img src={k.image} alt={k.name} loading="lazy" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold">{k.name}</h3>
                    <span className="shrink-0 rounded-md bg-green-600 px-2 py-0.5 text-sm font-semibold text-white">
                      {k.rating} ★
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-stone-500">{k.cuisine.join(" · ")}</p>
                  <p className="mt-3 text-sm text-stone-600">
                    ⏱ {k.time} min · {k.charge === 0 ? "Free delivery" : `₹${k.charge} delivery`}
                  </p>
                  <button
                    onClick={() => {
                      onSelect(active ? "All" : k.name);
                      if (!active) document.getElementById("menu")?.scrollIntoView();
                    }}
                    className={`mt-4 w-full rounded-xl py-2 text-sm font-semibold transition ${
                      active ? "bg-brand-600 text-white" : "border border-brand-500 text-brand-600 hover:bg-brand-50"
                    }`}
                  >
                    {active ? "Showing menu · Clear" : "View menu"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
