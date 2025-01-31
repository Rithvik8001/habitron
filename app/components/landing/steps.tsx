"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ClipboardList, UserPlus } from "lucide-react";

const steps = [
  {
    name: "Sign Up Easily",
    description:
      "Create your account in seconds using Google, email, or social logins.",
    icon: UserPlus,
  },
  {
    name: "Add Your First Habit",
    description:
      "Choose from our curated list or create your own custom habits to track.",
    icon: ClipboardList,
  },
  {
    name: "Track & Get Insights",
    description:
      "Mark habits complete and receive AI-powered insights to stay motivated.",
    icon: CheckCircle2,
  },
];

export function Steps() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-primary"
          >
            Getting Started
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Start building better habits in minutes
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, stepIdx) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + stepIdx * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
                  <step.icon
                    className="h-6 w-6 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 flex items-center gap-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary">
                    {stepIdx + 1}
                  </div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900 dark:text-white">
                    {step.name}
                  </h3>
                  {stepIdx !== steps.length - 1 && (
                    <div className="hidden lg:block">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
