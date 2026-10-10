
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { fetchApiJson } from "@/utils/api";
import Link from "next/link";

interface Iitems {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const Navlinks = async () => {
    const result = await fetchApiJson<Iitems[]>(
        "https://openapi.programming-hero.com/api/bazardor/categories",
        "বাজারের বিভাগ",
    );

    if (result.data === null) {
        return (
            <div className="border-b border-gray-200 p-3">
                <ApiErrorMessage message={result.error} />
            </div>
        );
    }

    return (
        <nav
            aria-label="পণ্যের বিভাগ"
            className="w-full border-y border-gray-200"
        >
            <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-3 py-3 sm:gap-5 sm:px-6 lg:justify-center lg:gap-8 lg:px-8">
                {result.data.map((item) => (
                    <Link
                        key={item.id}
                        href={`/category/${item.slug}`}
                        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700 sm:text-base"
                    >
                        <span aria-hidden="true">{item.icon}</span>
                        <span>{item.nameBn}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navlinks;
