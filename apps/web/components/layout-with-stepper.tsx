"use client";

import { usePathname } from "next/navigation";
import { SearchBox } from "./search-box";
import { Stepper } from "./stepper";
import { BookingFooter } from "./booking-footer";
import { useFormSteps } from "@/context/form-context";

export function LayoutWithStepper({
  children,
  onContinue,
}: {
  children: React.ReactNode;
  onContinue: () => void;
}) {
  const pathname = usePathname();
  const isReviewPage = pathname === "/checkout";
  const { formData } = useFormSteps();

  return (
    <div>
      {!isReviewPage && <SearchBox />}
      <Stepper onContinue={onContinue} />
      <main className="flex p-4">
        {/* Add conditional Filters later */}
        <section className="flex-1">{children}</section>
        <section className="w-80 p-4 border-l max-h-[65vh] overflow-auto">
          <h3 className="font-semibold mb-4">Form Data</h3>
          <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
        </section>
      </main>
      {!isReviewPage && <BookingFooter onContinue={onContinue} />}
    </div>
  );
}
