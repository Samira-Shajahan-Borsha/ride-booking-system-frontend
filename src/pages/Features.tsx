import Badge from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Navigation,
  History,
  User,
  ToggleLeft,
  Bell,
  Activity,
  BarChart3,
  Users,
  ShieldCheck,
} from "lucide-react";

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <Card className="rounded-2xl">
    <CardContent className="p-6 space-y-3">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </CardContent>
  </Card>
);

const Features = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* PAGE HERO */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <Badge variant="secondary">Platform Features</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Built for riders, drivers, and admins
          </h1>
          <p className="text-muted-foreground text-lg">
            A complete ride‑sharing platform with powerful tools for every role.
          </p>
        </div>
      </section>

      {/* RIDER FEATURES */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12">Rider Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="h-5 w-5" />}
              title="Ride Request Form"
              description="Pickup and destination selection with upfront fare estimation and payment method choice."
            />
            <FeatureCard
              icon={<Navigation className="h-5 w-5" />}
              title="Live Ride Tracking"
              description="Track your ongoing ride in real time with driver details and live status updates."
            />
            <FeatureCard
              icon={<History className="h-5 w-5" />}
              title="Ride History"
              description="Paginated ride history with search and filters by date, fare range, and status."
            />
            <FeatureCard
              icon={<Navigation className="h-5 w-5" />}
              title="Ride Details Page"
              description="View route map, timestamps, driver info, and a clear ride status timeline."
            />
            <FeatureCard
              icon={<User className="h-5 w-5" />}
              title="Profile Management"
              description="Update personal information, phone number, and securely change password."
            />
          </div>
        </div>
      </section>

      {/* DRIVER FEATURES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12">Driver Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ToggleLeft className="h-5 w-5" />}
              title="Availability Control"
              description="Easily switch between online and offline to control ride availability."
            />
            <FeatureCard
              icon={<Bell className="h-5 w-5" />}
              title="Incoming Requests"
              description="Accept or reject ride requests instantly as they arrive."
            />
            <FeatureCard
              icon={<Activity className="h-5 w-5" />}
              title="Active Ride Management"
              description="Update ride status from accepted to completed or cancelled in real time."
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Earnings Dashboard"
              description="Visual breakdown of daily, weekly, and monthly earnings with charts."
            />
            <FeatureCard
              icon={<History className="h-5 w-5" />}
              title="Ride History"
              description="View and filter completed rides with pagination and status filters."
            />
            <FeatureCard
              icon={<User className="h-5 w-5" />}
              title="Profile Management"
              description="Manage vehicle details, contact information, and password settings."
            />
          </div>
        </div>
      </section>

      {/* ADMIN FEATURES */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12">Admin Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="User Management"
              description="Search, filter, block or unblock riders, and approve or suspend drivers."
            />
            <FeatureCard
              icon={<Navigation className="h-5 w-5" />}
              title="Ride Oversight"
              description="View all rides with advanced filtering by date, status, driver, or rider."
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Analytics Dashboard"
              description="Track ride volume, revenue trends, and driver activity through visual charts."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Search & Filter Tools"
              description="Consistent and powerful filtering tools across all admin listing pages."
            />
            <FeatureCard
              icon={<User className="h-5 w-5" />}
              title="Profile Management"
              description="Update admin profile information and manage account security."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Features;