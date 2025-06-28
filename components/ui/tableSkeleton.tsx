import React from "react";

const TableSkeleton = ({
  rows = 5,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Header Skeleton */}
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} scope="col" className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body Skeleton */}
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
