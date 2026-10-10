import ApiErrorMessage from "@/components/ApiErrorMessage";
import { fetchApiJson } from "@/utils/api";
import Link from "next/link";

interface Iitems {
    id: string,
    slug: string, 
    nameBn: string,
    icon: string
}

const Navlinks = async() => {
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
        <div className="flex justify-start gap-8 border py-3 border-gray-200 ps-90">
            {result.data.map((n) => <Link key={n.id} href={`/category/${n.slug}`}>{n.icon}{n.nameBn}</Link>)}
        </div>
    );
};

export default Navlinks;