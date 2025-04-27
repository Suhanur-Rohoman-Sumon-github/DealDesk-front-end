import Image from "next/image";
import Link from "next/link";

const MarketplaceFooter = () => {
  return (
    <footer className=" backdrop-blur-md  text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Overview */}
        <div className="">
          <Link className="" href="/">
            <Image
              src={
                "https://i.ibb.co.com/rGrLVCZs/Chat-GPT-Image-Apr-24-2025-02-07-44-PM-removebg-preview.png"
              }
              alt="logo"
              height={80}
              width={80}
            />
          </Link>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold">Explore</h3>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li>
              <Link href="/categories" className="hover:text-white">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/new-arrivals" className="hover:text-white">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/top-deals" className="hover:text-white">
                Top Deals
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-lg font-semibold">Help</h3>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li>
              <Link href="/support" className="hover:text-white">
                Support
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li>
              <Link href="#" className="hover:text-white">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-gray-300 text-sm py-6 mt-6 border-t border-white/10">
        DealDesk All rights reserved
      </div>
    </footer>
  );
};

export default MarketplaceFooter;
