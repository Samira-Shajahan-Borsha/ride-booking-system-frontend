import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Car, MapPin, ShieldCheck, Star, Wallet } from "lucide-react";
import { Link } from "react-router";

import heroImage from "@/assets/photo-1731082154898-2e63df0f2a42.webp";
import offerImage from "@/assets/photo-1536825591064-574efec257f2.webp";
import { useUserInfoQuery } from "@/redux/features/auth/auth.Api";

const howItWorksSteps = [
  {
    title: "Request a ride",
    description:
      "Enter your pickup and destination, choose payment method, and see the fare upfront.",
  },
  {
    title: "Get matched instantly",
    description:
      "We find a nearby driver and let you track your ride in real time with live updates.",
  },
  {
    title: "Arrive and pay seamlessly",
    description:
      "Track ride progress, arrive safely, and complete payment without hassle.",
  },
];

const testimonials = [
  {
    role: "Rider",
    message:
      "Booking a ride is effortless. I love seeing the fare upfront and tracking my driver in real time.",
    name: "Rider • Verified",
  },
  {
    role: "Driver",
    message:
      "The earnings dashboard is clear and motivating. I can track daily and monthly income without confusion.",
    name: "Driver • Verified",
  },
  {
    role: "Admin",
    message:
      "Managing users and monitoring rides from a single dashboard saves hours every day.",
    name: "Admin • Verified",
  },
];

const Highlight = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-8 space-y-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

const Home = () => {
  
  const { data: user } = useUserInfoQuery(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">Ride smarter</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your ride, <span className="text-primary">on demand</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Fast, reliable, and affordable rides — built for riders, drivers, and admins with real‑time tracking and seamless payments.
            </p>
            {!user?.data &&
              <div className="flex gap-4">
                <Link to="/login">
                  <Button size="lg">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline">Register</Button>
                </Link>
              </div>
            }
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="rounded-2xl border bg-muted flex items-center justify-center text-muted-foreground">
              <img src={heroImage} alt="hero-img" className="rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps?.map((step, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-8 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{step?.title}</h3>
                  <p className="text-muted-foreground">
                    {step?.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Why choose us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Highlight icon={<Car />} title="Smart Ride Management" description="Live tracking, ride timelines, and seamless status updates." />
            <Highlight icon={<Wallet />} title="Transparent Earnings" description="Daily, weekly, and monthly earnings insights for drivers." />
            <Highlight icon={<ShieldCheck />} title="Admin Control" description="Advanced analytics, ride oversight, and user management." />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Loved by riders & drivers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((item, index) => (
              <Card key={index} className="rounded-2xl">
                <CardContent className="p-8 space-y-4">
                  <Badge variant="secondary">{item.role}</Badge>
                  <p className="text-muted-foreground">“{item.message}”</p>
                  <p className="font-semibold">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOTIONS / OFFERS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Special offers to get you started
              </h2>
              <p className="text-muted-foreground text-lg">
                Enjoy discounted rides for new users and exclusive bonus earnings for new drivers during your first weeks.
              </p>
              {!user?.data &&
                <div className="flex gap-4">
                  <Link to="/login">
                    <Button size="lg">Claim Rider Offer</Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline">Driver Bonuses</Button>
                  </Link>
                </div>
              }
            </div>
            <div className="rounded-2xl border bg-muted flex items-center justify-center text-muted-foreground">
              <img src={offerImage} alt="hero-img" className="rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & SECURITY */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Built with safety & trust in mind
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-2xl">
              <CardContent className="p-8 space-y-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Verified Users</h3>
                <p className="text-muted-foreground">
                  Riders and drivers go through verification to ensure platform safety.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardContent className="p-8 space-y-4">
                <Car className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Real-time Monitoring</h3>
                <p className="text-muted-foreground">
                  Admins monitor rides, statuses, and activities to prevent misuse.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardContent className="p-8 space-y-4">
                <Star className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">High Rider & Driver Ratings</h3>
                <p className="text-muted-foreground">
                  Maintain a reliable platform with consistent 5-star experiences for riders and drivers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-4xl font-bold">
            Ready to get moving?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join as a rider or driver and experience a smarter ride-sharing platform.
          </p>
          <div className="flex justify-center gap-4">
            {!user?.data &&
              <Link to="/register">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            }
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;