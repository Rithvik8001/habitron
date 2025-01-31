"use client";

import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-xl font-bold">Habitron</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={toggleMenu}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold leading-6">
              Features
            </a>
            <a href="#pricing" className="text-sm font-semibold leading-6">
              Pricing
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Button variant="outline">Log in</Button>
            <Button>Sign up</Button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 z-[100] w-full bg-white flex flex-col h-[100dvh] sm:max-w-sm">
            <div className="flex items-center justify-between p-6">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="text-xl font-bold">Habitron</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={closeMenu}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col flex-1 justify-center px-6">
              <div className="space-y-4">
                <a
                  href="#features"
                  className="block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 hover:bg-gray-50 text-center"
                  onClick={closeMenu}
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 hover:bg-gray-50 text-center"
                  onClick={closeMenu}
                >
                  Pricing
                </a>
              </div>
              <div className="mt-8 space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={closeMenu}
                >
                  Log in
                </Button>
                <Button className="w-full" onClick={closeMenu}>
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
