import React from "react";

export default function Home() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="p-10 bg-white rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Google Calendar → Call Reminder
        </h1>
        <p className="text-gray-600 mb-6">
          Sign in with Google to allow calendar access and receive automated call reminders.
        </p>
        <a
          href={`${backend}/api/auth/google`}
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition"
        >
          Sign in with Google
        </a>
      </div>
    </main>
  );
}
