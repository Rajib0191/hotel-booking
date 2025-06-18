const CardSkeleton = () => {
  return (
    <div className="max-w-full rounded-lg shadow-custom-border p-4 flex gap-4 animate-pulse bg-white">
      {/* Skeleton Image */}
      <div className="relative w-40 h-40 flex-shrink-0 bg-gray-200 rounded-md"></div>

      {/* Skeleton Content */}
      <div className="flex flex-col justify-between w-full space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between gap-2">
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 w-11/12 bg-gray-200 rounded"></div>
        </div>

        <div className="flex gap-2 mt-2">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>

        <div className="flex justify-between items-center mt-4 space-y-1">
          <div className="flex gap-2 flex-col">
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
            <div className="h-3 w-28 bg-gray-200 rounded"></div>
          </div>
          <div className="h-5 w-24 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
