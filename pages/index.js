import React from "react";
import { useRouter } from "next/router"; // Next.js router for navigation

export default function Home() {
  const router = useRouter(); // Hook for navigation

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-5 font-sans bg-gray-50">
      {/* Short single-line tagline in all caps and italic */}
      <h1 className="font-bold text-4xl text-gray-800 mb-8 italic uppercase">
        PERSONALIZED CARE AT HOME FOR A BETTER QUALITY OF LIFE.
      </h1>

      {/* Signup and Login Buttons */}
      <div className="mt-5 flex gap-4">
        <button
          onClick={() => router.push("/register")} // Redirect to /register
          className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-pink-700 hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          Signup
        </button>
        <button
          onClick={() => router.push("/login")} // Redirect to /login
          className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-pink-700 hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}