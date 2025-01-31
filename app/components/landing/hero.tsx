"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <div className="relative isolate pt-14">
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <a href="#" className="inline-flex items-center space-x-2">
                <span className="inline-flex items-center text-sm font-medium leading-6 text-muted-foreground">
                  <span>Just shipped v1.0</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </a>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build better habits with AI-powered insights
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              Track your habits, get personalized recommendations, and stay
              motivated with AI-powered feedback. Simple, effective, and designed
              for real progress.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
