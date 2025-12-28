import Badge from "@/components/ui/badge";
import ContactForm from "@/components/modules/common/ContactForm";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <Badge variant="secondary" className="mx-auto w-fit">
            Contact
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Get in touch with us
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question, feedback, or need support? Fill out the form below and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>
    </main>
  );
};


export default Contact;