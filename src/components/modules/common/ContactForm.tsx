import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useSubmitMessageMutation } from "@/redux/features/auth/auth.Api";


const contactSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    email: z
        .string()
        .email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const [submitMessage, { isLoading }] = useSubmitMessageMutation();

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof contactSchema>) => {
        try {
            await submitMessage(data).unwrap();
            setSubmitted(true);
            form.reset();
        } catch (error) {
            console.error("Failed to submit message:", error);
            alert("Something went wrong. Please try again later.");
        }
    };


    return (
        <Card className="rounded-2xl">
            <CardContent className="p-8 md:p-10">
                {!submitted ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your full name" {...field} />
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
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your message here..."
                                                className="h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button size="lg" type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </Form>
                ) : (
                    <div className="text-center space-y-4">
                        <h3 className="text-2xl font-semibold">Message sent 🎉</h3>
                        <p className="text-muted-foreground">
                            Thanks for reaching out. Your message has been successfully submitted.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setSubmitted(false)}
                        >
                            Send another message
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default ContactForm
