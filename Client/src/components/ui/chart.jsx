import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const ChartConfig = {
  strokeColor: "#4F46E5",
};

export const ChartTooltipContent = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md">
        <p className="text-sm font-bold">{label}</p>
        <p className="text-sm text-gray-700">Bookings: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export const ChartTooltip = ChartTooltipContent;


export const ChartContainer = ({ data }) => {
  return (
    <Card className="p-4 shadow-md">
      <CardHeader>
        <CardTitle>Monthly Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke={ChartConfig.strokeColor}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
