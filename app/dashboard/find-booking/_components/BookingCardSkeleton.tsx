const BookingCardSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-custom-shadow overflow-hidden animate-pulse">
      {/* Card Header Skeleton */}
      <div className="bg-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="h-4 w-48 bg-gray-300 rounded mt-2"></div>
      </div>

      {/* Card Body Skeleton */}
      <div className="p-6">
        {/* Guest Information Skeleton */}
        <div className="mb-6">
          <div className="h-5 w-40 bg-gray-300 rounded mb-3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-36 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Room Details Skeleton */}
        <div className="mb-6">
          <div className="h-5 w-32 bg-gray-300 rounded mb-3"></div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-300 rounded-lg h-32 w-full"></div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stay Period Skeleton */}
        <div className="mb-6">
          <div className="h-5 w-28 bg-gray-300 rounded mb-3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-28 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
        </div>

        {/* Status & Payment Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
          </div>
          <div>
            <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
