"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneForm from "@/components/PhoneForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
    const router = useRouter();
  const [me, setMe] = useState<any>(null);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await axios.get(`${backend}/api/user/me`, { withCredentials: true });
        setMe(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMe();
  }, [backend]);

  const goBack = () => router.push("/");
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-pink-100 to-blue-100">
      <button
        onClick={goBack}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded shadow transition"
      >
        ← Back
      </button>

      <Card className="w-full max-w-lg bg-white shadow-2xl border-none p-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 text-center">
            Welcome
          </CardTitle>
        </CardHeader>
        <CardContent>
          {me ? (
            <>
              <p className="mb-6 text-gray-700 text-center">
                Hello, <span className="font-semibold">{me.name || me.email}</span>
              </p>
              <PhoneForm email={me.email} />
            </>
          ) : (
            <>
              <p className="mb-4 text-gray-600 text-center">
                No active session found. Using redirect email (if available).
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
