import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link, useNavigate } from "react-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Password from "@/components/ui/password"
import { useLoginMutation } from "@/redux/features/auth/auth.Api"
import { toast } from "sonner"

import { Shield, Truck, User } from "lucide-react"

const loginFormSchema = z.object({
    email: z.email({
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        error: "Email is required"
    }),
    password: z.string().min(8, "Password is required")
})

type TInput = {
    email: string,
    password: string,
}

// DEMO ACCOUNTS
const demoAccounts = [
    {
        label: "Super Admin",
        email: "super@gmail.com",
        password: "12345678",
        icon: Shield,
    },
    {
        label: "Driver",
        email: "arif@gmail.com",
        password: "1234@Arif",
        icon: Truck,
    },
    {
        label: "Rider",
        email: "ayon@gmail.com",
        password: "1234@Ayon",
        icon: User,
    }
]

export function LoginForm() {

    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit: SubmitHandler<TInput> = async (data) => {
        const toastId = toast.loading("Signing in...");

        try {
            const response = await login(data).unwrap();

            if (response.success) {
                toast.success("User logged in successfully", { id: toastId });
                navigate("/");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.dismiss(toastId);

            if (error?.data?.message === "Incorrect password") {
                form.setError("password", {
                    message: "The email or password you entered is incorrect.",
                });
            }

            if (error?.data?.message === "User doesn't exist") {
                form.setError("email", {
                    message: "The email or password you entered is incorrect.",
                });
            }
        }
    }

    const fillDemo = (email: string, password: string) => {
        form.setValue("email", email);
        form.setValue("password", password);
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>

                <CardAction>
                    <Link to="/register">
                        <Button variant="link" className="cursor-pointer">
                            Sign Up
                        </Button>
                    </Link>
                </CardAction>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        id="login-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 md:space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center">
                                        <FormLabel>Password</FormLabel>
                                        <Button
                                            variant="link"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </Button>
                                    </div>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                {/* DEMO ACCOUNTS' BUTTONS*/}
                <div className="mt-6 space-y-3">
                    <div>
                        <p className="text-sm font-semibold">Quick Access Accounts</p>
                        <p className="text-xs text-muted-foreground">
                            Try demo accounts instantly
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {demoAccounts.map((demo) => (
                            <Button
                                key={demo.label}
                                type="button"
                                variant="outline"
                                className="h-11 gap-2"
                                onClick={() => fillDemo(demo.email, demo.password)}
                            >
                                <demo.icon className="w-4 h-4 text-primary" />
                                <span className="text-xs">
                                    {demo.label}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex-col gap-2">
                <Button
                    form="login-form"
                    type="submit"
                    className="w-full cursor-pointer"
                >
                    Login
                </Button>
            </CardFooter>
        </Card>
    )
}