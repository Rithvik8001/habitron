"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 ${
          hasScrolled ? "bg-background/80" : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 text-3xl tracking-tighter font-extrabold"
            >
              Habitron
            </Link>
          </div>
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              href="#features"
              className="text-sm font-semibold leading-6 hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <SignedOut>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <Link
                  href="/"
                  className="text-xl font-bold"
                  onClick={toggleMenu}
                >
                  Habitron
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-6">
                  <Link
                    href="#features"
                    className="block text-lg font-semibold hover:text-primary"
                    onClick={toggleMenu}
                  >
                    Features
                  </Link>
                  <Link
                    href="#testimonials"
                    className="block text-lg font-medium transition-colors hover:text-primary"
                    onClick={toggleMenu}
                  >
                    Testimonials
                  </Link>
                </div>
              </nav>
              <div className="border-t px-6 py-8">
                <SignedOut>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/sign-in" onClick={toggleMenu}>
                        Sign in
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/sign-up" onClick={toggleMenu}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard" onClick={toggleMenu}>
                        Dashboard
                      </Link>
                    </Button>
                    <div className="flex justify-center">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </div>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
