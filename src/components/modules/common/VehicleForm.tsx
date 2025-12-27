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
import { useGetMyDriverProfileQuery, useUpdateVehicleMutation } from "@/redux/features/driver/driver.api";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"

const vehicleSchema = z.object({
    vehicleName: z.string().min(2, "Vehicle name required"),
});

const VehicleForm = () => {
    const { data: driver } = useGetMyDriverProfileQuery(null);
    const [updateVehicle] = useUpdateVehicleMutation();

    const initialValue = {
        vehicleName: driver?.data?.vehicle ?? "",
    }

    const form = useForm({
        resolver: zodResolver(vehicleSchema),
        defaultValues: initialValue,
    });

    const watchedVehicleName = form.watch("vehicleName");

    const hasChanges = watchedVehicleName !== initialValue.vehicleName;

    const onSubmit = async (data: z.infer<typeof vehicleSchema>) => {
        const payload = {
            vehicle: data?.vehicleName
        }
        try {
            await updateVehicle(payload).unwrap();

            toast.success("Vehicle info updated successfully");
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="vehicleName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Toyota Prius" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={!hasChanges || form.formState.isSubmitting}>
                            Update Vehicle
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};


export default VehicleForm