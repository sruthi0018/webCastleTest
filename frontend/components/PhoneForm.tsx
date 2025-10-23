"use client";
import React, { useState } from "react";
import axios from "axios";

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

      if (res.data.ok) setStatus("Saved ✓");
      else setStatus("Saved");
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
      <input
        type="tel"
        className={`w-full border p-3 rounded-lg focus:ring-2 focus:outline-none ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
        }`}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+919876543210"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow transition"
      >
        Save
      </button>
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </form>
  );
}
