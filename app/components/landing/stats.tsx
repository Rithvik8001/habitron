"use client";

import { motion } from "framer-motion";

const stats = [
  { id: 1, name: "Active Users", value: "23,415" },
  { id: 2, name: "Habits Tracked", value: "150K+" },
  { id: 3, name: "Completion Rate", value: "89%" },
];

const testimonials = [
  {
    content:
      "Habitron helped me build a consistent workout routine. The AI insights are game-changing!",
    author: "Sarah M.",
    role: "Fitness Enthusiast",
  },
  {
    content:
      "The streak system keeps me motivated. I've never stuck to my habits this long before.",
    author: "Mike R.",
    role: "Software Developer",
  },
  {
    content:
      "AI suggestions are spot-on! It's like having a personal habit coach.",
    author: "Emily K.",
    role: "Student",
  },
];

export function Stats() {
  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Trusted by thousands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
          >
            Join thousands of people who have transformed their lives using
            Habitron
          </motion.p>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start"
          >
            <div className="flex flex-col-reverse gap-y-4 sm:flex-row sm:items-center sm:gap-x-6 sm:gap-y-0 lg:flex-col lg:gap-y-4">
              <div className="flex gap-x-2 sm:gap-x-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-1.5 w-4 rounded-full bg-primary" />
                ))}
              </div>
              <div className="text-base leading-6 text-gray-600 dark:text-gray-400">
                Rated 5/5 stars by our users
              </div>
            </div>
            <div className="sm:w-80 sm:shrink lg:w-auto">
              <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                4.9/5
              </p>
              <p className="mt-2 text-base leading-6 text-gray-600 dark:text-gray-400">
                Average customer rating
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col-reverse gap-y-4 border-l border-gray-900/10 dark:border-white/10 pl-6"
              >
                <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">
                  {stat.name}
                </dt>
                <dd className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative mt-20"
        >
          <div className="flex gap-8 overflow-hidden py-4">
            <div className="flex animate-infinite-scroll gap-8">
              {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="relative flex-none rounded-2xl bg-white dark:bg-gray-900/50 p-6 shadow-xl shadow-gray-900/10 dark:shadow-none border border-gray-200 dark:border-gray-800 w-[350px]"
                >
                  <p className="text-gray-900 dark:text-white">
                    {testimonial.content}
                  </p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
