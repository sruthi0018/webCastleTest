"use client";

import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function PhoneForm({ email }: { email: string }) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setError("");

    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }

    const e164Regex = /^\+\d{10,15}$/;
    if (!e164Regex.test(phone)) {
      setError("Phone number must be in E.164 format (e.g., +919876543210)");
      return;
    }

    try {
      const res = await axios.post(
        `${backend}/api/user/phone`,
        { phone },
        { withCredentials: true }
      );
      setStatus(res.data.ok ? "Saved successfully" : "Saved");
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <Card className="border-2 border-gray-100 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Enter Your Phone Number
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+9198*******4"
              className={error ? "border-red-500 focus:ring-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Save
          </Button>
        </form>
      </CardContent>
      {status && (
        <CardFooter>
          <p className="text-sm text-gray-600">{status}</p>
        </CardFooter>
      )}
    </Card>
  );
}
