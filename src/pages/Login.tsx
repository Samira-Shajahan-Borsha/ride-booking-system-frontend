import { LoginForm } from "@/components/modules/authentication/LoginForm"
import Badge from "@/components/ui/badge"

const Login = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-12">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-4">
          <Badge variant="secondary" className="w-fit mx-auto">Welcome Back</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Fast, safe, and <span className="text-primary">reliable</span> — login now
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access your dashboard, track rides, or manage your profile with ease.
          </p>
        </div>
      </section>

      {/* LOGIN FORM SECTION */}
      <section className="flex flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <LoginForm />
        </div>
      </section>
    </main>
  )
}

export default Login