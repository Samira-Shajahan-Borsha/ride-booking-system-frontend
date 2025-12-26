/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  useGetUserStatsQuery,
  useGetDriverStatsQuery,
  useGetRideStatsQuery,
} from "@/redux/features/admin/admin.api";
import { useTheme } from "@/hooks/useTheme";
import Loading from "@/components/modules/common/Loading";

const Stat = ({ label, value }: { label: string; value: any }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);

const Analytics = () => {
  const { theme } = useTheme();

  const { data: userStats } = useGetUserStatsQuery(null);
  const { data: driverStats } = useGetDriverStatsQuery(null);
  const { data: rideStats } = useGetRideStatsQuery(null);

  if (!userStats || !driverStats || !rideStats) {
    return <Loading />;
  }

  const {
    totalUsers,
    totalActiveRiders,
    totalBlockedRiders,
    newUsersInLast7Days,
    newUsersInLast30Days,
    usersByRole,
  } = userStats.data;

  const { driversByApprovalStatus, topDrivers } = driverStats.data;

  const {
    totalRides,
    completedRides,
    canceledRides,
    totalRevenue,
    dailyRideTrends,
    dailyRevenueTrends,
  } = rideStats.data;

  const lineColor = theme === "dark" ? "#e5e7eb" : "#18181b";
  const gridColor = theme === "dark" ? "#3f3f46" : "#e4e4e7";

  const formatTk = (value: number) =>
    `${value.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} Tk`;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>User Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Stat label="Total Users" value={totalUsers} />
          <Stat label="Active Riders" value={totalActiveRiders} />
          <Stat label="Blocked Riders" value={totalBlockedRiders} />
          <Stat label="New Users (7 Days)" value={newUsersInLast7Days} />
          <Stat label="New Users (30 Days)" value={newUsersInLast30Days} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersByRole}>
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
                />
                <Bar dataKey="count" fill={lineColor} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Driver Approval Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={driversByApprovalStatus}
                  dataKey="count"
                  nameKey="_id"
                  outerRadius={90}
                  label
                >
                  {driversByApprovalStatus.map((_: any, i: number) => (
                    <Cell key={i} fill={lineColor} />
                  ))}
                </Pie>
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
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ride & Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Total Rides" value={totalRides} />
          <Stat label="Completed Rides" value={completedRides} />
          <Stat label="Canceled Rides" value={canceledRides} />
          <Stat label="Total Revenue" value={formatTk(totalRevenue)} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Ride Volume</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[...dailyRideTrends].reverse()}>
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
                />
                <Line dataKey="count" stroke={lineColor} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[...dailyRevenueTrends].reverse()}>
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
                />
                <Line dataKey="revenue" stroke={lineColor} strokeWidth={2} />
                <Line
                  dataKey="rides"
                  stroke={lineColor}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Drivers</CardTitle>
          </CardHeader>

          <CardContent className="max-h-[320px] overflow-y-auto space-y-3">
            {topDrivers.map((driver: any) => (
              <div
                key={driver.driverId}
                className="flex items-center justify-between border-b last:border-none pb-2"
              >
                <div>
                  <p className="font-medium">{driver.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {driver.email}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm">{driver.totalRides} rides</p>
                  <p className="font-medium">
                    {formatTk(driver.totalEarnings)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;

