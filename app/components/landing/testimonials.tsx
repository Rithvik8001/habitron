"use client";

const testimonials = [
  {
    content:
      "Habitron's AI insights have completely transformed how I approach my daily routines. The personalized suggestions are spot-on!",
    author: "Sarah M.",
    role: "Fitness Coach",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    content:
      "The streak system keeps me incredibly motivated. I've never stuck to my habits this consistently before!",
    author: "Michael R.",
    role: "Software Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    content:
      "As a student, the flexible scheduling is perfect for my changing routine. Plus, the AI motivation keeps me going!",
    author: "Emily K.",
    role: "Graduate Student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
];

export function Testimonials() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by thousands
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our community of habit builders and transform your life
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="flex h-full flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
              >
                <div>
                  <p className="text-lg font-medium leading-8">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={`Avatar of ${testimonial.author}`}
                      className="h-10 w-10 rounded-full bg-gray-100"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
