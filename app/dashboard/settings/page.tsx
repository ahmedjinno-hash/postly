"use client";
import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">الإعدادات</h1>
      <UserProfile />
    </div>
  );
}
