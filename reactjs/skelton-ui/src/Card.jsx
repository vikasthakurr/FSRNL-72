const Card = () => {
  return (
    <div className="mx-auto mt-10 max-w-sm overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
      <img
        className="h-48 w-full object-cover"
        src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80"
        alt="A happy dog"
      />
      <div className="p-5">
        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          Pets
        </span>
        <h2 className="mt-3 text-xl font-bold text-gray-900">
          Meet Your New Best Friend
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Loyal, playful, and always happy to see you. Adopting a companion
          brings joy to every single day of your life.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://i.pravatar.cc/100?img=12"
            alt="Author avatar"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">Jamie Rivera</p>
            <p className="text-xs text-gray-500">Posted 2 hours ago</p>
          </div>
          <button className="ml-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Adopt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
