import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm, type SubmitHandler } from "react-hook-form"

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { role } from "@/constants/role"
import Password from "@/components/ui/password"
import { useRegisterMutation } from "@/redux/features/auth/auth.Api"
import { toast } from "sonner"

const registerFormSchema = z.object({
    name: z
        .string()
        .min(2, { error: "Name must be at least 2 characters long." })
        .max(50, { error: "Name cannot exceed 50 characters." }),
    email: z.email({ pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ }),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&^#()[\]{}\-_=+|;:'",.<>/~`]/, "Password must contain at least one special character"),
    confirmPassword: z.string({ error: "Confirm password is required" }),
    role: z.enum([role.rider, role.driver], {
        error: "Please select your role"
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
});

type TInput = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
}

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [register] = useRegisterMutation();

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        },
    });

    const onSubmit: SubmitHandler<TInput> = async (data: z.infer<typeof registerFormSchema>) => {
        const toastId = toast.loading("Creating user....");

        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        }

        try {
            const response = await register(userInfo).unwrap();

            if (response.success) {
                toast.success("User registered successfully", { id: toastId });
                navigate("/login");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast.dismiss(toastId);

            const message =
                error?.data?.message ||
                "Something went wrong while creating your account. Please try again later.";

            if (error?.status === 400 && error?.data?.message === "User with this email already exists") {
                toast.error("This email is already registered. Please log in.", { id: toastId });
                form.setError("email", {
                    message: "An account with this email already exists. Try logging in instead.",
                });
            } else {
                form.setError("root", { message });
                toast.error(message, { id: toastId });
            }
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john.doe@company.com" {...field} />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Register as</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex flex-col"
                                            >
                                                <FormItem className="flex items-center gap-3">
                                                    <FormControl>
                                                        <RadioGroupItem value={role.rider} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Rider</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center gap-3">
                                                    <FormControl>
                                                        <RadioGroupItem value={role.driver} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Driver</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {
                                form.formState.errors.root && <p className="text-destructive text-sm">{form.formState.errors.root.message}</p>
                            }

                            <Field>
                                <Button type="submit">Create Account</Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <Link to="/login">Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
