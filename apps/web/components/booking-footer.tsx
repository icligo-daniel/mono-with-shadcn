"use client";
import { Button } from "@workspace/ui/components/button";
import { useFormSteps } from "@/context/form-context";

export function BookingFooter({ onContinue }: { onContinue: () => void }) {
  const { isCurrentStepValid } = useFormSteps();

  return (
    <footer className="p-4 border-t flex justify-center items-center outline outline-blue-500">
      <Button
        className="cursor-pointer"
        onClick={onContinue}
        disabled={!isCurrentStepValid}
      >
        Continue
      </Button>
    </footer>
  );
}
