export default function Footer() {
  return (
    <footer id="login" className="bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-2xl font-extrabold text-white">Cloud<span className="text-brand-500">Bite</span></p>
          <p className="mt-3 max-w-sm text-sm">
            A network of cloud kitchens cooking fresh meals for delivery only.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex max-w-sm gap-2">
            <input type="email" placeholder="Your email" className="min-w-0 flex-1 rounded-xl bg-stone-800 px-4 py-2 text-sm outline-none ring-1 ring-stone-700 focus:ring-brand-500" />
            <button className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Subscribe</button>
          </form>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#kitchens" className="hover:text-brand-500">Kitchens</a></li>
            <li><a href="#menu" className="hover:text-brand-500">Menu</a></li>
            <li><a href="#how" className="hover:text-brand-500">How it works</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>hello@cloudbite.example</li>
            <li>+91 99999 99999</li>
            <li>Open daily 10am to 11pm</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-stone-800 py-5 text-center text-xs">© {new Date().getFullYear()} CloudBite. All rights reserved.</p>
    </footer>
  );
}
