import Image from "next/image";
import Link from "next/link";
import DateDisplay from "./DateDisplay";


const Hero = () => {

  return (
    <section className="mt-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 items-center overflow-hidden rounded-3xl border border-gray-200">
          
          {/* Left Content */}
          <div className="py-10 pl-10">
            <p className="mb-3 w-fit rounded-2xl bg-green-100 px-3 py-1 text-xl text-green-600">
              <DateDisplay/>
            </p>

            <h2 className="text-4xl font-bold">
              আজকের বাজারের দাম এক নজরে
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-gray-400">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-
              <br />
              সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#library"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-lg font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex justify-end">
            <Image
              src="/bazar-hero.png"
              alt="আজকের বাজারের দাম"
              width={400}
              height={400}
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;