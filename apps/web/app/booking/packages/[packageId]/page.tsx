"use client";

import { useFormSteps } from "@/context/form-context";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PackagesPage() {
  const { formData } = useFormSteps();
  const { packageId } = useParams();

  if (!formData?.stepsConfig) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main className="flex p-4 w-full">
        <div className="w-full">
          <h2 className="text-2xl font-bold">Steps</h2>
          {formData.stepsConfig.map((step: any, index: number) => {
            return index === 0 ? (
              <span key={index}>
                <Link href={`/booking/packages/${packageId}/${step.path}`}>
                  {`${step.path}`}
                </Link>
              </span>
            ) : (
              <span key={index}>{` > ${step.path}`}</span>
            );
          })}
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-bold">Form Data</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </main>
    </div>
  );
}
