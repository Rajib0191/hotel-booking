import React from "react";

import { ArrowUp, ArrowDown } from "lucide-react";

export type DashboardCardProps = {
  title: string;
  value: number | string;
  change: number;
  period: string;
  icon: React.ReactNode;
};

const DashboardCard = ({
  title,
  value,
  change,
  period,
  icon,
}: DashboardCardProps) => {
  const isPositive = change >= 0;
  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div className="bg-white rounded-md p-6 border border-custom-border transition-all hover:shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
        <div className="bg-sky-50 rounded-full p-3 mr-4">{icon}</div>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold text-gray-800">
          {formattedValue}
        </span>
      </div>

      <div
        className={`flex items-center text-sm ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? (
          <ArrowUp size={14} className="mr-1" />
        ) : (
          <ArrowDown size={14} className="mr-1" />
        )}
        <span>{Math.abs(change)}%</span>
        <span className="text-gray-500 ml-1">{period}</span>
      </div>
    </div>
  );
};

export default DashboardCard;
