"use client";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            2025 All rights reserved. Made with by{" "}
            <span className="relative inline-block font-medium text-foreground">
              Rithvik
              <svg
                className="absolute -bottom-0.5 left-0 w-full animate-scribble"
                viewBox="0 0 55 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 3C16 3 36 3 53 3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="stroke-primary"
                />
              </svg>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
