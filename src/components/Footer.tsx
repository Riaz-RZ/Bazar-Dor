
const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col gap-3 text-sm text-gray-600 text-center sm:text-left md:flex-row md:items-center md:justify-between md:gap-6">
                <div className="min-w-0">
                    <p className="font-semibold text-gray-800">
                        বাজার দর
                    </p>
                    <p>
                        প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </div>

                <div className="min-w-0 md:max-w-md md:text-right">
                    <p>
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
                        পরিবর্তিত হয়।
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
