import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";
import { useGetMyEarningStatsQuery } from "@/redux/features/driver/driver.api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const Earnings = () => {
  const { data, isLoading } = useGetMyEarningStatsQuery(null);

  const { theme } = useTheme();

  if (isLoading) return <div>Loading...</div>;

  const { today, weekly, monthly, total, chartData } = data.data;

  const formatTk = (amount: number) =>
    `${amount.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Tk`;

  const lineColor = theme === "dark" ? "#e5e5e5" : "#1f1f1f";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>Today</CardHeader>
          <CardContent>
            <p>Earnings: {formatTk(today.earnings)}</p>
            <p>Rides: {today.rides}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>This Week</CardHeader>
          <CardContent>
            <p>Earnings: {formatTk(weekly.earnings)}</p>
            <p>Rides: {weekly.rides}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>This Month</CardHeader>
          <CardContent>
            <p>Earnings: {formatTk(monthly.earnings)}</p>
            <p>Rides: {monthly.rides}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Total Earnings</CardHeader>
          <CardContent>
            <p>Earnings: {formatTk(total.earnings)}</p>
            <p>Rides: {total.rides}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>Earnings Over Last 30 Days</CardHeader>
        <CardContent style={{ height: 300 }}>
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              You have not earned any rides in the last 30 days.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis tickFormatter={(value) => `Tk ${value.toLocaleString()}`} />
                <Tooltip formatter={(value: number) => formatTk(value)} />
                <Line type="monotone" dataKey="total" stroke={lineColor} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Earnings;
