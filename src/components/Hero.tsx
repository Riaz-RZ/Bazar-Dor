
import Image from "next/image";
import Link from "next/link";
import DateDisplay from "./DateDisplay";

const Hero = () => {
    return (
        <section className="mt-4 sm:mt-6">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white">

                    {/* Left Content */}
                    <div className="py-6 px-5 sm:py-8 sm:px-8 lg:py-10 lg:pl-10 lg:pr-6">
                        <p className="mb-3 w-fit max-w-full rounded-xl bg-green-100 px-3 py-1 text-sm sm:text-base lg:text-lg text-green-600">
                            <DateDisplay />
                        </p>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                            আজকের বাজারের দাম এক নজরে
                        </h2>

                        <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-500">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
                            এবং দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <Link
                            href="#library"
                            className="mt-6 sm:mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center md:justify-end px-5 sm:px-8 md:px-0">
                        <Image
                            src="/bazar-hero.png"
                            alt="আজকের বাজারের দাম"
                            width={400}
                            height={400}
                            priority
                            className="w-full max-w-65 sm:max-w-[320px] md:max-w-full h-auto object-contain"
                            sizes="(max-width: 639px) 260px, (max-width: 1023px) 320px, 400px"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;