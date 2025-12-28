import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Badge from "@/components/ui/badge";

const faqs = [
  {
    category: "Rider",
    items: [
      { q: "How do I request a ride?", a: "Enter pickup and destination, review the fare estimate, and confirm." },
      { q: "Can I see the fare before confirming?", a: "Yes, fare estimation is shown before confirmation." },
      { q: "How do I track my ride?", a: "Track your ride in real time once a driver accepts." },
      { q: "Where is my ride history?", a: "Ride history includes filters for date, fare, and status." },
      { q: "Can I update my profile?", a: "Update name, phone number, and password from profile settings." },
    ],
  },
  {
    category: "Driver",
    items: [
      { q: "How do I go online/offline?", a: "Use the availability toggle to control ride requests." },
      { q: "Can I reject a ride?", a: "Yes, drivers can accept or reject requests." },
      { q: "How do I manage an active ride?", a: "Update status from Accepted to Completed or Cancelled." },
      { q: "Where can I see earnings?", a: "The dashboard shows daily, weekly, and monthly earnings." },
      { q: "Can I edit vehicle info?", a: "Vehicle and contact details are editable in profile." },
    ],
  },
  {
    category: "Admin",
    items: [
      { q: "How do I manage users?", a: "Search, filter, block/unblock riders and approve drivers." },
      { q: "Can I view all rides?", a: "Admins can filter all rides by status, driver, or rider." },
      { q: "What analytics are available?", a: "Ride volume, revenue trends, and driver activity." },
      { q: "Are filters consistent?", a: "Yes, filters are consistent across admin pages." },
      { q: "Can I update my profile?", a: "Admins can update profile info and passwords." },
    ],
  },
];

const Faq = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <Badge variant="secondary" className="mx-auto w-fit">Support</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">Find answers for riders, drivers, and admins.</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          {faqs?.map((group) => (
            <Card key={group.category} className="rounded-2xl">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold">{group.category} FAQs</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {group.items.map((item, idx) => (
                    <AccordionItem key={idx} value={`${group.category}-${idx}`}>
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}

        </div>
      </section>
    </main>
  );
}

export default Faq;