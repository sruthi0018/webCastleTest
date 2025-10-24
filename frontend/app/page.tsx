"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Card className="p-10 bg-white rounded-3xl shadow-2xl text-center max-w-md border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-3">
            Google Calendar → Call Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-8">
            Sign in with Google to grant calendar access and receive automated call reminders.
          </p>
          <Button asChild className="w-full text-lg py-3">
            <a href={`${backend}/api/auth/google`}>Sign in with Google</a>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
