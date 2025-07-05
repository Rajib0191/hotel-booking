import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./button";
import TableSkeleton from "./tableSkeleton";

export type ColumnAlignment = "left" | "center" | "right";

export interface ColumnDef<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode | string | number);
  cell?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: ColumnAlignment;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  loading?: boolean;
}

const getAlignmentClass = (align?: ColumnAlignment) => {
  switch (align) {
    case "left":
      return "text-left";
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
};

export function DashboardTable<T>({
  data,
  columns,
  pageSize = 10,
  loading = false,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return <TableSkeleton columns={10} />;
  }

  if (data.length === 0) {
    return <strong>No Data Found!</strong>;
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-3 py-2 text-xs font-bold text-background uppercase tracking-wider ${getAlignmentClass(
                    column.align
                  )}`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 border border-custom-border ">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((column, colIndex) => {
                  const value =
                    typeof column.accessor === "function"
                      ? column.accessor(row)
                      : row[column.accessor as keyof T];

                  return (
                    <td
                      key={colIndex}
                      className={`px-3 py-0.5 text-sm whitespace-nowrap ${getAlignmentClass(
                        column.align
                      )}`}
                    >
                      {column.cell ? column.cell(value, row) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-3 py-2 flex justify-end gap-1 items-center border border-custom-border rounded-lg border-t-0 rounded-tl-none rounded-tr-none">
        <div className="flex-1 flex justify-end gap-1 items-center">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ChevronLeft size={18} />}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            rightIcon={<ChevronRight size={18} />}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
