"use client";
import { useState } from "react";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle Google login (you would integrate this with your backend later)
  const handleGoogleLogin = () => {
    console.log("Login with Google clicked!");
    // You can add Google authentication here (e.g., using Firebase, OAuth, etc.)
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Login</h1>
          <p className="text-white text-lg">
            Please enter your details to login
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/60"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/60"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Log In
          </button>
        </form>

        {/* Google Login Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center items-center bg-white text-black py-2 rounded-md shadow-md hover:bg-gray-200 transition"
          >
            <Image
              width={20}
              height={20}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJg75LWB1zIJt1VTZO7O68yKciaDSkk3KMdw&s"
              alt="Google Logo"
              className="mr-2"
            />
            Login with Google
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white text-sm">
          <p>
            Donot have an account?{" "}
            <a href="/signup" className="text-purple-400 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
