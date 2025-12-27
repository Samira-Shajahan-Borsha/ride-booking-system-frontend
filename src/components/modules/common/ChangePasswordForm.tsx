import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Password from "@/components/ui/password";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.Api";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod"

const changePasswordSchema = z.object({
    oldPassword: z.string().min(8, "Old password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

const ChangePasswordForm = () => {

    const [changePassword] = useChangePasswordMutation();

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        },
    });

    const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {

        const payload = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };

        try {
            const response = await changePassword(payload).unwrap();

            if (response.success) {
                toast.success("Password updated successfully");
                navigate("/")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)

            if (error?.data?.message === "Old password is incorrect") {
                form.setError("oldPassword", {
                    message: "Old password is incorrect",
                });
            }
        }
    };


    return (

        <Card className="w-full">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                    Enter your current password and a new password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form id="change-password-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button form="change-password-form" type="submit" className="w-full cursor-pointer">
                    Update Password
                </Button>
            </CardFooter>
        </Card>

    )
}

export default ChangePasswordForm