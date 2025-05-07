import "@workspace/ui/globals.css";
import { FormProvider } from "@/context/form-context";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <FormProvider>{children}</FormProvider>
    </>
  );
}
