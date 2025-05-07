"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

interface FormContextType {
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  stepsConfig: any[];
  lastUpdated: string | null;
  isCurrentStepValid: boolean;
  setIsCurrentStepValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormSteps = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useFormSteps must be used within a FormProvider");
  }
  return context;
};

export function FormProvider({ children }: { children: React.ReactNode }) {
  const { packageId } = useParams();
  const previousPackageId = useRef<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepsConfig, setStepsConfig] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState<boolean>(false);

  // Load saved draft and step config on mount or when packageId changes
  useEffect(() => {
    const loadDraft = async () => {
      const res = await fetch("/api/draft");
      const data = await res.json();

      // If packageId has changed, refetch steps
      if (previousPackageId.current !== packageId) {
        const resSteps = await fetch(`/api/steps?packageId=${packageId}`);
        const steps = await resSteps.json();
        setStepsConfig(steps);

        // Update form data with new steps
        const updatedDraft = {
          stepsConfig: steps,
          lastUpdated: new Date().toISOString(),
        };
        setFormData(updatedDraft);
        setLastUpdated(updatedDraft.lastUpdated);

        // Update previous packageId
        previousPackageId.current = packageId as string;
      } else {
        // If packageId hasn't changed, use existing data
        setFormData(data);
        if (data.stepsConfig) {
          setStepsConfig(data.stepsConfig);
          if (data.lastUpdated) setLastUpdated(data.lastUpdated);
        }
      }
    };

    loadDraft();
  }, [packageId]);

  // Auto-save draft to API
  useEffect(() => {
    const saveDraft = async () => {
      await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lastUpdated: new Date().toISOString(),
        }),
      });
    };

    if (Object.keys(formData).length > 0) {
      const timeout = setTimeout(saveDraft, 1000);
      return () => clearTimeout(timeout);
    }
  }, [formData]);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        currentStep,
        setCurrentStep,
        stepsConfig,
        lastUpdated,
        isCurrentStepValid,
        setIsCurrentStepValid,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
