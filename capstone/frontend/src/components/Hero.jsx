export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-brand-50 via-white to-brand-100">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-700">
            🔥 Free delivery on your first order
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Restaurant food, <span className="text-brand-600">cooked in the cloud</span>, at your door.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-stone-600">
            Order from our network of cloud kitchens. Fresh meals, no dine-in
            markup, delivered in about 30 minutes.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex max-w-lg flex-col gap-3 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-stone-200 sm:flex-row"
          >
            <input
              type="text"
              placeholder="Enter your delivery pincode"
              className="flex-1 rounded-xl px-4 py-3 outline-none"
            />
            <a href="#menu" className="rounded-xl bg-brand-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-brand-700">
              Find food
            </a>
          </form>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              ["50+", "Kitchens"],
              ["200+", "Dishes"],
              ["30 min", "Avg. delivery"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-2xl font-extrabold text-stone-900">{v}</dt>
                <dd className="text-sm text-stone-500">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-brand-500/20 blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=70"
            alt="A table of freshly cooked dishes"
            className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl"
          />
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="font-bold">4.7 rating</p>
              <p className="text-sm text-stone-500">from 12,000+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
