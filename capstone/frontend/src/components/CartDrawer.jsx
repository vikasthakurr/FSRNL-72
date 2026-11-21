// Cart state is not wired yet. Pass items and handlers from Redux.
export default function CartDrawer({
  open,
  items = [],
  onClose,
  onChangeQty = () => {},
  onClear = () => {},
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = items.length ? 30 : 0;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 p-5">
          <h2 className="text-xl font-extrabold">Your cart</h2>
          <button onClick={onClose} className="text-2xl" aria-label="Close cart">✕</button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="mt-20 text-center text-stone-500">Your cart is empty. Add something tasty!</p>
          ) : (
            items.map((i) => (
              <div key={i.id} className="flex gap-3">
                <img src={i.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">{i.name}</p>
                  <p className="text-sm text-stone-500">₹{i.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onChangeQty(i.id, -1)} className="h-8 w-8 rounded-full border border-stone-300 font-bold hover:bg-stone-100">−</button>
                  <span className="w-5 text-center font-semibold">{i.qty}</span>
                  <button onClick={() => onChangeQty(i.id, 1)} className="h-8 w-8 rounded-full border border-stone-300 font-bold hover:bg-stone-100">+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-2 border-t border-stone-200 p-5">
            <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between text-stone-600"><span>Delivery</span><span>₹{delivery}</span></div>
            <div className="flex justify-between text-lg font-extrabold"><span>Total</span><span>₹{subtotal + delivery}</span></div>
            <button className="mt-3 w-full rounded-xl bg-brand-600 py-3 font-bold text-white hover:bg-brand-700">Checkout</button>
            <button onClick={onClear} className="w-full text-sm text-stone-500 hover:text-red-600">Clear cart</button>
          </div>
        )}
      </aside>
    </>
  );
}
