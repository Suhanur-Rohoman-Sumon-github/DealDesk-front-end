import Image from "next/image";
import Link from "next/link";
import { SiBinance } from "react-icons/si";
import { TbBrandCoinbase } from "react-icons/tb";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { SiBitcoin } from "react-icons/si";
const MainFooter = () => {
  return (
    <footer className="backdrop-blur-lg text-white py-10 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Text */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Logo and Icons on the Left */}
          <div className="flex flex-col items-start">
            <Link href="/">
              <Image
                src="https://i.ibb.co.com/rGrLVCZs/Chat-GPT-Image-Apr-24-2025-02-07-44-PM-removebg-preview.png"
                alt="Deal Desk Logo"
                width={80}
                height={80}
                className="mb-2"
              />
            </Link>
            <h2 className="text-xl font-semibold">Deal Desk</h2>
            <p className="text-secondary">
              Make your marketplace experience better with us.
            </p>
            <div className="flex gap-4 mt-4 text-2xl text-gray-300">
              <SiBinance title="Finance" />
              <TbBrandCoinbase title="Webull" />
              <FaDollarSign title="Coinbase" />
              <FaEthereum title="Coinbase" />
              <SiBitcoin title="Coinbase" />
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-medium mb-3">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#">About Centure</Link>
              </li>
              <li>
                <Link href="#">Our news</Link>
              </li>
              <li>
                <Link href="#">License</Link>
              </li>
              <li>
                <Link href="#">Contacts</Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-medium mb-3">Services & Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#">Invest</Link>
              </li>
              <li>
                <Link href="#">Token</Link>
              </li>
              <li>
                <Link href="#">Affiliate</Link>
              </li>
              <li>
                <Link href="#">Contest</Link>
              </li>
              <li>
                <Link href="#">Safety</Link>
              </li>
              <li>
                <Link href="#">Automatization</Link>
              </li>
              <li>
                <Link href="#">Analytics</Link>
              </li>
              <li>
                <Link href="#">Reports</Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-medium mb-3">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#">Help center</Link>
              </li>
              <li>
                <Link href="#">How it works</Link>
              </li>
              <li>
                <Link href="#">Privacy policy</Link>
              </li>
              <li>
                <Link href="#">Terms & conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-gray-400 text-sm">
          © Deal Desk, {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
