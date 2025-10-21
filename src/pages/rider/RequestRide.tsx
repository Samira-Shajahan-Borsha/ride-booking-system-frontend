import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { paymentMethod } from "@/constants/paymentMethod"
import { toast } from "sonner"
import { useUserInfoQuery } from "@/redux/features/auth/auth.Api"
import { useRequestRideMutation } from "@/redux/features/ride/ride.api"


const rideRequestForm = z.object({
  pickUp: z.string().min(2, {
    message: "Pick-up location must be at least 2 characters.",
  }),
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  distance: z.number().positive("Distance must be a positive number."),
  paymentMethod: z.enum(Object.values(paymentMethod), {
    error: "Please select a payment method."
  }),
})

const RequestRide = () => {

  const { data: riderInfo } = useUserInfoQuery(null);

  const [requestRide] = useRequestRideMutation();

  console.log(riderInfo);

  const form = useForm<z.infer<typeof rideRequestForm>>({
    resolver: zodResolver(rideRequestForm),
    defaultValues: {
      pickUp: "",
      destination: "",
      distance: 1,
      paymentMethod: paymentMethod.cash,
    },
  })

  const onSubmit = async (data: z.infer<typeof rideRequestForm>) => {

    const toastId = toast.loading("Requesting ride...");

    const rideInfo = {
      rider: riderInfo?.data?._id as string,
      pickUp: {
        address: data?.pickUp
      },
      destination: {
        address: data?.destination
      },
      distance: data?.distance,
      paymentMethod: data?.paymentMethod
    }

    console.log("Form submitted:", rideInfo);

    try {
      const response = await requestRide(rideInfo).unwrap();

      if (response.success) {
        toast.success("Requested ride successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 400 && error?.data?.message) {
        form.setError("root", {
          message: "You already have an active ride. Please complete or cancel it before requesting a new one.",
        });
      }
      toast.error("Failed to request ride", { id: toastId });
    }
  }

  return (
    <div className="max-w-lg container mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Pick-up */}
          <FormField
            control={form.control}
            name="pickUp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup location</FormLabel>
                <FormControl>
                  <Input placeholder="Pickup location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Destination */}
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination location</FormLabel>
                <FormControl>
                  <Input placeholder="Destination location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Distance */}
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance (km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter distance"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Method */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={paymentMethod.cash}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup {...field}>
                        <SelectItem value={paymentMethod.cash} defaultValue={paymentMethod.cash}>Cash</SelectItem>
                        <SelectItem value={paymentMethod.card}>Card</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {
            form.formState.errors.root && <p className="text-destructive text-sm">{form.formState.errors.root.message}</p>
          }

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default RequestRide
