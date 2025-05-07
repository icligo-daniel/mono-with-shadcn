"use client";
import { usePathname, useRouter } from "next/navigation";
import { useFormSteps } from "@/context/form-context";
import { Badge } from "@workspace/ui/components/badge";

export function Stepper({ onContinue }: { onContinue: () => void }) {
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop() || "";
  const router = useRouter();
  const { formData, stepsConfig, isCurrentStepValid, currentStep } =
    useFormSteps();

  const isStepAllowed = (index: number) => {
    // If this is the next step, check if current one is valid in order to enable continuing throught the stepper
    const currentStepIndex = stepsConfig.findIndex(
      (s: any) => s.path === currentPath
    );
    if (currentStepIndex === -1) return false;
    if (index === currentStepIndex + 1) {
      return isCurrentStepValid;
    }

    // Check if all previous steps are filled
    for (let i = 0; i < index; i++) {
      const key = stepsConfig[i]?.key;
      if (key && !formData?.[key]) return false;
    }

    return true;
  };

  return (
    <nav className="flex gap-4 p-4 justify-center items-center">
      {stepsConfig.map((step: any, index: number) => (
        <div key={`stepper-${index}`} className="flex items-center gap-2">
          <Badge
            key={step.path}
            className={`px-4 py-2 ${currentPath === step.path ? "bg-primary text-black outline outline-green-300 cursor-not-allowed" : "bg-gray-200 cursor-pointer"} ${!isStepAllowed(index) ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={() => {
              if (isStepAllowed(index)) {
                router.push(step.path);
              }
            }}
          >
            {`${index + 1}. ${step.label}`}
          </Badge>
          {index !== stepsConfig.length - 1 && (
            <span className="text-gray-500">{">"}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
