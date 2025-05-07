"use client";

import { LayoutWithStepper } from "@/components/layout-with-stepper";
import { useFormSteps } from "@/context/form-context";

export default function LodgingsStep() {
  const { formData } = useFormSteps();

  return (
    <LayoutWithStepper onContinue={() => {}}>
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="w-full">
        <h2 className="text-2xl font-bold">Form Data</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </LayoutWithStepper>
  );
}
