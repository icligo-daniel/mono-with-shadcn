"use client";
import { useForm } from "react-hook-form";
import { LayoutWithStepper } from "@/components/layout-with-stepper";
import { useFormSteps } from "@/context/form-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@workspace/ui/components/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";

const formSchema = z.object({
  flightNumber: z.string().min(3).max(50),
});

export default function FlightsStep() {
  const router = useRouter();

  const { setFormData, formData, stepsConfig, setIsCurrentStepValid } =
    useFormSteps();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightNumber: "",
    },
  });

  useEffect(() => {
    if (formData?.flights) {
      form.reset(formData.flights);
    }
  }, [formData, form]);

  useEffect(() => {
    setIsCurrentStepValid(form.formState.isValid);
  }, [form.formState.isValid, setIsCurrentStepValid]);

  const onSubmit = (data: any) => {
    setFormData((prev: any) => ({ ...prev, flights: data }));
    const nextStep =
      stepsConfig[stepsConfig.findIndex((s: any) => s.key === "flights") + 1];
    if (nextStep) router.push(nextStep.path);
  };

  return (
    <LayoutWithStepper onContinue={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="flightNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flight Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Flight Number"
                    className="w-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the flight number of the flight you will be taking.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </LayoutWithStepper>
  );
}
