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
  hotelName: z.string().min(2).max(50),
});

export default function LodgingsStep() {
  const router = useRouter();

  const { setFormData, formData, stepsConfig, setIsCurrentStepValid } =
    useFormSteps();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelName: "",
    },
  });

  useEffect(() => {
    if (formData?.lodgings) {
      form.reset(formData.lodgings);
    }
  }, [formData, form]);

  useEffect(() => {
    setIsCurrentStepValid(form.formState.isValid);
  }, [form.formState.isValid, setIsCurrentStepValid]);

  const onSubmit = (data: any) => {
    setFormData((prev: any) => ({ ...prev, lodgings: data }));
    const nextStep =
      stepsConfig[stepsConfig.findIndex((s: any) => s.key === "lodgings") + 1];
    if (nextStep) router.push(nextStep.path);
  };

  return (
    <LayoutWithStepper onContinue={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="hotelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Hotel Name"
                    className="w-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the name of the hotel you will be staying at.
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
