import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const packageId = searchParams.get("packageId");

  const allSteps = [
    { path: "lodgings", label: "Lodgings", key: "lodgings" },
    { path: "flights", label: "Flights", key: "flights" },
    { path: "services", label: "Services", key: "services" },
    { path: "checkout", label: "Checkout", key: "checkout" },
  ];

  const servicesAndCheckout = [
    { path: "services", label: "Services", key: "services" },
    { path: "checkout", label: "Checkout", key: "checkout" },
  ];

  const lodgingsServicesAndCheckout = [
    { path: "lodgings", label: "Lodgings", key: "lodgings" },
    { path: "services", label: "Services", key: "services" },
    { path: "checkout", label: "Checkout", key: "checkout" },
  ];

  switch (packageId) {
    case "2":
      return NextResponse.json(servicesAndCheckout);
    case "3":
      return NextResponse.json(lodgingsServicesAndCheckout);
    default:
      return NextResponse.json(allSteps);
  }
}
