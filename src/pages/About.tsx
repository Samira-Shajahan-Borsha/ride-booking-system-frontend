import Badge from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Rocket } from "lucide-react";

const team = [
  {
    name: "Product Lead",
    role: "Platform & Experience",
    note: "Designing seamless rider and driver journeys.",
  },
  {
    name: "Engineering Lead",
    role: "Backend & Infrastructure",
    note: "Building scalable, secure ride systems.",
  },
  {
    name: "Operations Lead",
    role: "Trust & Safety",
    note: "Ensuring reliability and platform integrity.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <Badge variant="secondary" className="mx-auto w-fit">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Driving smarter urban mobility</h1>
          <p className="text-muted-foreground text-lg">
            We’re building a modern ride‑sharing platform focused on efficiency,
            transparency, and trust for riders, drivers, and administrators.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="rounded-2xl">
            <CardContent className="p-8 space-y-4">
              <Target className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground">
                To make everyday transportation reliable, transparent, and accessible
                through smart technology.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-8 space-y-4">
              <Rocket className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="text-muted-foreground">
                To empower cities with efficient ride networks that benefit riders,
                drivers, and platform operators equally.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-8 space-y-4">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Our Values</h3>
              <p className="text-muted-foreground">
                Trust, safety, simplicity, and continuous improvement guide every
                decision we make.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold">Our Story</h2>
          <p className="text-muted-foreground text-lg">
            This platform was created to solve real‑world transportation challenges
            by combining intuitive design, powerful analytics, and operational control.
            From riders requesting rides to admins monitoring the ecosystem, every
            feature is built with purpose.
          </p>
          <p className="text-muted-foreground text-lg">
            We focus on scalable systems, clear workflows, and data‑driven decisions
            to ensure long‑term sustainability.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground">{member.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}