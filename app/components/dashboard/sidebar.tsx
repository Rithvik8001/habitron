"use client";

import { cn } from "@/lib/utils";
import { BarChart, Home, Settings, Target, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const routes = [
  {
    label: "Overview",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Habits",
    icon: Target,
    href: "/dashboard/habits",
    color: "text-violet-500",
  },
  {
    label: "Analytics",
    icon: BarChart,
    color: "text-orange-700",
    href: "/dashboard/analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="border-r-2">
      <div
        className={cn(
          "fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full w-72 flex-col bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 lg:hidden">
          <span className="text-lg font-bold">Habitron</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  pathname === route.href
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : ""
                )}
              >
                <route.icon className={cn("h-4 w-4", route.color)} />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
