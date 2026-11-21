import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { categories, menuItems } from "../data/menu";

const typeStyle = {
  veg: "border-green-600 text-green-600",
  vegan: "border-emerald-600 text-emerald-600",
  egg: "border-yellow-600 text-yellow-600",
  "non-veg": "border-red-600 text-red-600",
};

function TypeDot({ type }) {
  return (
    <span title={type} className={`grid h-5 w-5 place-items-center rounded-sm border-2 ${typeStyle[type]}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
    </span>
  );
}

export default function Menu({ kitchen, onClearKitchen, onAdd = () => {} }) {
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");

  const items = menuItems.filter(
    (m) =>
      (category === "All" || m.category === category) &&
      (type === "all" || m.type === type) &&
      (kitchen === "All" || m.kitchen === kitchen) &&
      m.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionTitle
        eyebrow="Menu"
        title={kitchen === "All" ? "What are you craving?" : kitchen}
        subtitle={kitchen === "All" ? "Dishes from all our kitchens." : undefined}
      />

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === c ? "bg-brand-600 text-white" : "bg-stone-100 hover:bg-brand-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes"
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm outline-none focus:border-brand-500"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="all">All food types</option>
            <option value="veg">Veg</option>
            <option value="vegan">Vegan</option>
            <option value="egg">Egg</option>
            <option value="non-veg">Non-veg</option>
          </select>
        </div>
      </div>

      {kitchen !== "All" && (
        <button onClick={onClearKitchen} className="mb-6 text-sm font-semibold text-brand-600 hover:underline">
          ← Show all kitchens
        </button>
      )}

      {items.length === 0 ? (
        <p className="rounded-2xl bg-stone-50 py-16 text-center text-stone-500">No dishes match your filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((m) => (
            <article key={m.id} className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:shadow-lg">
              <img src={m.image} alt={m.name} loading="lazy" className="h-40 w-full object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                  <TypeDot type={m.type} />
                  <span className="text-sm font-semibold text-stone-600">{m.rating} ★</span>
                </div>
                <h3 className="mt-2 font-bold">{m.name}</h3>
                <p className="text-xs text-stone-400">{m.kitchen}</p>
                <p className="mt-2 flex-1 text-sm text-stone-600">{m.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-extrabold">₹{m.price}</span>
                  <button
                    onClick={() => onAdd(m)}
                    className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-95"
                  >
                    Add +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
