const ProductGridSkeleton = ({
  count = 6,
}: {
  count?: number;
}) => (
  <div
    className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
    aria-hidden="true"
  >
    {Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-emerald-100" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-emerald-100" />
            <div className="h-3 w-1/2 rounded bg-gray-100" />
          </div>
        </div>
        <div className="mt-5 h-4 w-1/3 rounded bg-gray-100" />
        <div className="mt-2 h-6 w-1/2 rounded bg-emerald-100" />
      </div>
    ))}
  </div>
);

export default ProductGridSkeleton;
