import { RegisterForm } from "@/components/modules/authentication/RegisterForm"
import Badge from "@/components/ui/badge"

const Register = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-12">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-4">
          <Badge variant="secondary" className="w-fit mx-auto">Join Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Join the <span className="text-primary">ride-sharing revolution</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sign up as a rider or driver to experience smarter ride-sharing with real-time tracking and easy management.
          </p>
        </div>
      </section>

      {/* REGISTER FORM SECTION */}
      <section className="flex flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <RegisterForm />
        </div>
      </section>
    </main>
  )
}

export default Register