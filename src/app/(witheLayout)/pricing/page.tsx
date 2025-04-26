import Title from "@/components/title/Title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <section className="min-h-screen bg-gradient-to-b  flex flex-col items-center justify-center py-20 px-4 text-white">
      <div className="text-center ">
        <Title
          subTitle="Flexible and transparent pricing plans tailored for every type of explorer"
          title="Find the perfect plan to start your journey"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Free Plan */}
        <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-lg border border-white/20 bg-white/10 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4">Free</h2>
          <p className="text-gray-300 mb-8">
            Get started with the essentials — no cost
          </p>
          <ul className="space-y-4 mb-8">
            <li>✅ Basic access</li>
            <li>✅ Limited data</li>
            <li>✅ Community support</li>
          </ul>
          <Button className="w-full button-secondary">
            Your Current package
          </Button>
        </div>

        {/* Pro Plan */}
        <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-lg border border-pink-500/30 bg-white/10 shadow-2xl">
          {/* Most Popular Badge */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white  rounded-full text-sm ">
              Most Popular
            </Badge>
          </div>

          <h2 className="text-2xl font-semibold mb-4 mt-6">Partnar</h2>
          <p className="text-gray-300 mb-8">
            Unlock full potential with Partnar
          </p>
          <ul className="space-y-4 mb-8">
            <li>🚀 Unlimited access</li>
            <li>🚀 Priority support</li>
            <li>🚀 Advanced features</li>
          </ul>
          <Button className="button-primary w-full">Rcharge now</Button>
        </div>
      </div>
    </section>
  );
}
