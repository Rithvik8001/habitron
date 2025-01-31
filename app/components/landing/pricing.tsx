"use client";

import { Check } from "lucide-react";
import { Button } from "../ui/button";

const tiers = [
  {
    name: "Free",
    id: "free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Unlimited habits",
      "Progress tracking",
      "Achievement system",
      "Advanced Analytics",
    ],
  },
  {
    name: "Lifetime",
    id: "premium",
    price: "$5",
    description: "One-time payment for lifetime access",
    features: [
      "Unlimited habits",
      "Progress tracking",
      "Daily reminders",
      "Achievement system",
      "AI-powered insights",
      "Daily AI motivation",
    ],
    featured: true,
  },
];

export function Pricing() {
  return (
    <div className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Simple, transparent pricing
          </p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            Start for free, upgrade once when you need more features
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-3xl p-6 sm:p-8 ${
                tier.featured
                  ? "bg-primary text-primary-foreground ring-primary"
                  : "bg-white ring-gray-200"
              } shadow-lg ring-1`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8">{tier.name}</h3>
                {tier.featured && (
                  <p className="rounded-full bg-primary-foreground/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-foreground">
                    Most popular
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {tier.description}
              </p>
              <div className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
                <span
                  className={`text-sm font-semibold leading-6 ${
                    tier.featured
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {tier.id === "free" ? "forever" : "one-time"}
                </span>
              </div>
              <Button
                className="mt-6"
                variant={tier.featured ? "secondary" : "outline"}
              >
                Get started
              </Button>
              <ul
                role="list"
                className={`mt-8 space-y-3 text-sm leading-6 ${
                  tier.featured
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className={`h-5 w-5 flex-none ${
                        tier.featured
                          ? "text-primary-foreground"
                          : "text-primary"
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
