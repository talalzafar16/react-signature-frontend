import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = {
  Weekly: [
    { week: "Mon", sales: 18600 },
    { week: "Tue", sales: 30500 },
    { week: "Wed", sales: 23700 },
    { week: "Thur", sales: 53000 },
    { week: "Fri", sales: 53000 },
    { week: "Sat", sales: 53000 },
    { week: "Sun", sales: 53000 },
  ],
  Monthly: [
    { month: "Jan", sales: 18600 },
    { month: "Feb", sales: 30500 },
    { month: "Mar", sales: 23700 },
    { month: "Apr", sales: 43000 },
    { month: "May", sales: 20900 },
    { month: "Jun", sales: 21400 },
  ],
  Yearly: [
    { year: "2021", sales: 10000 },
    { year: "2022", sales: 20000 },
    { year: "2023", sales: 30000 },
    { year: "2024", sales: 40000 },
  ],
};

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SaleBarChart({ sortParam }: { sortParam: string }) {
  const formatYAxis = (tick) => {
    if (tick === 0) return "0";
    return `${tick / 1000}k`; // Convert to k format
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-lg">PKR 324,215.32</CardTitle>
        <CardDescription className="flex items-center gap-3">
            <span className="text-[#12B12C] bg-[#18D8371A] rounded-lg p-1 text-xs font-bold">+12.3%</span>
            <p className="text-xs">since last week</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-1">
        <ChartContainer config={chartConfig} className=" w-full flex justify-start">
          <BarChart accessibilityLayer data={chartData[sortParam]}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey={
                sortParam === "Yearly"
                  ? "year"
                  : sortParam === "Monthly"
                  ? "month"
                  : "week"
              }
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={5}
              tickFormatter={formatYAxis}
              domain={[0, 60000]}
              className="text-grayText"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="sales"
              fill="#8c8ed6"
              radius={8}
              activeBar={<Rectangle fill="#4C52EC" />}
              maxBarSize={10}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
