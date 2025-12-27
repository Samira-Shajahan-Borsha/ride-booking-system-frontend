import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
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
import { Input } from "@/components/ui/input";
import { useUpdateProfileMutation } from "@/redux/features/auth/auth.Api";
import type { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"

const bdPhoneRegex = /^(?:\+8801\d{9}|01\d{9})$/;

const profileSchema = z.object({
    name: z.string().min(2),
    phone: z
        .string()
        .regex(bdPhoneRegex, {
            message:
                "Phone number must be valid for Bangladesh (+8801XXXXXXXXX or 01XXXXXXXXX)",
        }),
    email: z.string().email(),
});


const ProfileForm = ({ user }: { user: User }) => {

    const [updateProfile] = useUpdateProfileMutation();

    const initialValues = {
        name: user?.name ?? "",
        phone: user?.phone ?? "",
        email: user?.email ?? "",
    };

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: initialValues
    });

    const watchedName = form.watch("name");
    const watchedPhone = form.watch("phone");

    const hasChanges = watchedName !== initialValues.name || watchedPhone !== initialValues.phone;

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        const payload = {
            name: data.name,
            phone: data.phone,
        };

        try {
            await updateProfile({
                userId: user?._id as string,
                data: payload,
            }).unwrap();

            toast.success("Profile updated successfully");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message || "Failed to update profile");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                        <Input {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={!hasChanges || form.formState.isSubmitting}>
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default ProfileForm
