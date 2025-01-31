"use client";

import {
  Brain,
  LineChart,
  MessageSquare,
  Trophy,
} from "lucide-react";

const features = [
  {
    name: "AI-Powered Insights",
    description:
      "Get personalized recommendations and insights to improve your habits based on your behavior patterns.",
    icon: Brain,
  },
  {
    name: "Progress Tracking",
    description:
      "Visualize your progress with beautiful charts and track your streaks to stay motivated.",
    icon: LineChart,
  },
  {
    name: "Daily Motivation",
    description:
      "Receive AI-generated motivational messages tailored to your goals and progress.",
    icon: MessageSquare,
  },
  {
    name: "Achievement System",
    description:
      "Earn badges and rewards as you build and maintain your habits.",
    icon: Trophy,
  },
];

export function Features() {
  return (
    <div className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Features
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Everything you need to build better habits
          </p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            Simple yet powerful tools to help you create and maintain good habits.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
