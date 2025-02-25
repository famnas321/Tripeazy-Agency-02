import * as React from "react";
import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Tooltip, Label, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pieChartData = [
  { browser: "Chrome", visitors: 275, fill: "#271A4B" },
  { browser: "Safari", visitors: 200, fill: "#FF5733" },
  { browser: "Firefox", visitors: 287, fill: "#FF9900" },
  { browser: "Edge", visitors: 173, fill: "#271A4B" },
  { browser: "Other", visitors: 190, fill: "#888888" },
];

const barChartData = [
  { browser: "Chrome", visitors: 275 },
  { browser: "Safari", visitors: 200 },
  { browser: "Firefox", visitors: 287 },
  { browser: "Edge", visitors: 173 },
  { browser: "Other", visitors: 190 },
];

const lineChartData = [
  { month: "Jan", visitors: 200 },
  { month: "Feb", visitors: 250 },
  { month: "Mar", visitors: 180 },
  { month: "Apr", visitors: 300 },
  { month: "May", visitors: 280 },
  { month: "Jun", visitors: 320 },
];

export function Component() {
  const totalVisitors = React.useMemo(() => {
    return pieChartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Pie Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Donut with Text</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <PieChart width={300} height={300}>
            <Tooltip />
            <Pie data={pieChartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return null;
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={viewBox.cy + 24} className="fill-muted-foreground">
                        Visitors
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
        </CardFooter>
      </Card>

      {/* Bar Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Bar Chart - Visitors by Browser</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <BarChart width={300} height={300} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="browser" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visitors" fill="#4285F4" />
          </BarChart>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">Browser-wise visitor count</div>
        </CardFooter>
      </Card>

      {/* Line Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Line Chart - Visitors Trend</CardTitle>
          <CardDescription>Monthly data from Jan - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <LineChart width={300} height={300} data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visitors" stroke="#FF5733" strokeWidth={2} />
          </LineChart>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">Trend of visitors over months</div>
        </CardFooter>
      </Card>
    </div>
  );
}
