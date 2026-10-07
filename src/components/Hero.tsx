import Image from "next/image";
import Link from "next/link";

const Hero = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    return (
        <section className="mt-6">
            <div className="container mx-auto px-28">

                <div className="grid grid-cols-2 items-center overflow-hidden rounded-3xl border border-gray-200">

                    {/* Left Content */}
                    <div className="ps-10 py-6">

                        <p className="mb-3 w-fit text-xl text-green-600 rounded-2xl border-0 bg-green-100 px-2">
                            {date}
                        </p>

                        <h2 className="font-bold text-4xl ">
                            আজকের বাজারের দাম এক নজরে
                        </h2>

                        <p className="mt-5 text-gray-400 text-lg">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-
                            <br />
                            সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <Link
                            href="#library"
                            className="cursor-pointer mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-lg font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
                        >
                            
                            সব পণ্য দেখুন
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className=" flex justify-end">
                        <Image
                            src={'/bazar-hero.png'}
                            alt="FitLog workout banner"
                            height={400}
                            width={400}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;