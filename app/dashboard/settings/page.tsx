"use client";

import { ThemeToggle } from "./components/theme-toggle";
import { ProfileSettings } from "./components/profile-settings";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:space-y-6 md:p-8 md:pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h2>
      </div>
      <div className="max-w-2xl space-y-4 md:space-y-6">
        <ProfileSettings />
        <ThemeToggle />
      </div>
    </div>
  );
}
