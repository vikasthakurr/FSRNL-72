import { useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#how", label: "How it works" },
  { href: "#kitchens", label: "Kitchens" },
  { href: "#menu", label: "Menu" },
  { href: "#reviews", label: "Reviews" },
];

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2 text-xl font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">☁</span>
          Cloud<span className="text-brand-600">Bite</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-stone-600 transition hover:text-brand-600">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold transition hover:border-brand-500 hover:text-brand-600"
            aria-label="Open cart"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-xs text-white">
                {cartCount}
              </span>
            )}
          </button>
          <a href="#login" className="hidden rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 sm:block">
            Login
          </a>
          <button
            className="rounded-lg p-2 text-2xl md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-stone-100 bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 font-medium hover:bg-brand-50">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
