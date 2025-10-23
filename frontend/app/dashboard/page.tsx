"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PhoneForm from "@/components/PhoneForm";
import axios from "axios";


export default function Dashboard() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
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

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        {me ? (
          <>
            <p className="mb-4 text-gray-700">Hello, <span className="font-medium">{me.name || me.email}</span></p>
            <PhoneForm email={me.email} />
          </>
        ) : (
          <>
            <p className="mb-4 text-gray-600">
              Logged-in user not found via session. Using redirect email (if present).
            </p>
            {email ? <PhoneForm email={email} /> : <p className="text-gray-500">Please login first.</p>}
          </>
        )}
      </div>
    </div>
  );
}
