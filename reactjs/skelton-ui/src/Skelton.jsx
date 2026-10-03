const Skelton = () => {
  return (
    <div className="mx-auto mt-10 max-w-sm overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
      {/* image placeholder */}
      <div className="h-48 w-full animate-pulse bg-gray-200" />

      <div className="p-5">
        {/* badge placeholder */}
        <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />

        {/* title placeholder */}
        <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* description placeholder */}
        <div className="mt-3 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>

        {/* footer placeholder */}
        <div className="mt-5 flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="ml-auto h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Skelton;
