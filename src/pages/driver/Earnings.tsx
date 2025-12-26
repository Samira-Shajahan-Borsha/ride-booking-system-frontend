import Loading from "@/components/modules/common/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";
import { useGetMyEarningStatsQuery } from "@/redux/features/driver/driver.api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Earnings = () => {
  const { data, isLoading } = useGetMyEarningStatsQuery(null);
  const { theme } = useTheme();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No earnings data available.
      </div>
    );
  }

  const { today, weekly, monthly, total, chartData } = data.data;

  const formatTk = (amount: number) =>
    `${amount.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} Tk`;

  const lineColor = theme === "dark" ? "#e5e7eb" : "#18181b";
  const gridColor = theme === "dark" ? "#3f3f46" : "#e4e4e7";

  return (
    <div className="space-y-8">
      <CardTitle>Earnings Overview</CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Today</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Earnings</p>
            <p className="text-xl font-semibold">{formatTk(today.earnings)}</p>
            <p className="text-sm text-muted-foreground">Rides</p>
            <p className="text-xl font-semibold">{today.rides}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Earnings</p>
            <p className="text-xl font-semibold">{formatTk(weekly.earnings)}</p>
            <p className="text-sm text-muted-foreground">Rides</p>
            <p className="text-xl font-semibold">{weekly.rides}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Earnings</p>
            <p className="text-xl font-semibold">{formatTk(monthly.earnings)}</p>
            <p className="text-sm text-muted-foreground">Rides</p>
            <p className="text-xl font-semibold">{monthly.rides}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Earnings</p>
            <p className="text-xl font-semibold">{formatTk(total.earnings)}</p>
            <p className="text-sm text-muted-foreground">Rides</p>
            <p className="text-xl font-semibold">{total.rides}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Over Last 30 Days</CardTitle>
        </CardHeader>
        <CardContent className="h-[280px]">
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              You have not earned any rides in the last 30 days.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[...chartData].reverse()}>
                <CartesianGrid stroke={gridColor} />
                <XAxis dataKey="_id" stroke={lineColor} />
                <YAxis stroke={lineColor} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: gridColor,
                    borderColor: gridColor,
                  }}
                  itemStyle={{
                    color: lineColor,
                  }}
                  labelStyle={{
                    color: lineColor,
                  }}
                  formatter={(v: number) => formatTk(v)}
                />
                <Line
                  dataKey="total"
                  stroke={lineColor}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Earnings;
