"use client";
import { useRouter } from "next/navigation";


const AccountStatusPage = () => {
  const router = useRouter();
  

 
  

 

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#04091d] text-white px-4">
      <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Please Contact Us 📞</h1>

        <div className="space-y-6">
          <div className="bg-white/20 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Community Channel</h2>
            <a
              href="https://t.me/+okCFY5-LKnc2MTY1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline hover:text-blue-400"
            >
              #Deal Desk Community 🌱
            </a>
          </div>

          <div className="bg-blue-500/20 p-4 rounded-md border border-blue-400">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">
              Customer Support
            </h3>
            <p className="text-blue-200 mb-2">
              For any questions, please contact us:
            </p>
            <a
              href="https://t.me/dealdeskcomunity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline hover:text-blue-400 font-semibold"
            >
              @dealdeskcomunity
            </a>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="w-full button-primary mt-6"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountStatusPage;
