
import ApiErrorMessage from "@/components/ApiErrorMessage";
import ProductCard from "@/components/ProductCard";
import { Iproduct } from "@/types/productTypes";
import { fetchApiJson } from "@/utils/api";
import { categoryIcons, categoryNames } from "@/utils/category";
import { toBanglaNumber } from "@/utils/product";
import Link from "next/link";
import { Suspense } from "react";

type CategoryPageProps = {
    params: Promise<{ categoryId: string }>;
    searchParams: Promise<{ sort?: string }>;
};

const CategoryPageContent = async ({
    params, searchParams,
}: CategoryPageProps) => {
    const { categoryId } = await params;
    const { sort } = await searchParams;

    const result = await fetchApiJson<Iproduct[]>(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
        "এই বিভাগের পণ্যের দাম",
    );

    if (result.data === null) {
        return (
            <section className="max-w-7xl mx-auto px-6 py-10">
                <ApiErrorMessage message={result.error} />
            </section>
        );
    }

    const products = result.data;

    // Sort products
    const sortedProducts = [...products].sort((a, b) => {
        if (sort === "high") {
            return b.today - a.today;
        }

        if (sort === "low") {
            return a.today - b.today;
        }
        return 0;
    });

    return (
        <section className="max-w-7xl mx-auto px-6 py-10">
            {/* Category Header */}
            <div className="bg-white border-2 rounded-xl border-gray-200 mb-8">
                <div className="flex">
                    <div className="text-6xl p-3">
                        {categoryIcons[categoryId]}
                    </div>

                    <div className="py-4">
                        <h1 className="text-3xl font-bold">
                            {categoryNames[categoryId] || categoryId}
                        </h1>

                        <p className="text-gray-500">
                            {toBanglaNumber(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Count + Sorting */}
            <div className="flex items-center p-4 justify-end mb-6 bg-white border-2 rounded-xl border-gray-200">

                <div className="flex">
                    <p className="p-2">সাজান:</p>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-outline border-gray-300 bg-white font-normal"
                        >

                            {sort === "low"
                                ? "দাম কম → বেশি"
                                : sort === "high"
                                    ? "দাম বেশি → কম"
                                    : "ডিফল্ট"}
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-lg border border-gray-200"
                        >
                            <li>
                                <Link href={`/category/${categoryId}`}>
                                    ডিফল্ট
                                </Link>
                            </li>

                            <li>
                                <Link href={`/category/${categoryId}?sort=high`}>
                                    দাম বেশি → কম
                                </Link>
                            </li>

                            <li>
                                <Link href={`/category/${categoryId}?sort=low`}>
                                    দাম কম → বেশি
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <p className="text-gray-500 my-6">
                মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        products={product}
                    />
                ))}
            </div>
        </section>
    );
};

export default function CategoryPage(props: CategoryPageProps) {
    return (
        <Suspense
            fallback={
                <div
                    className="max-w-7xl mx-auto min-h-96 px-6 py-10"
                    aria-label="পণ্য লোড হচ্ছে"
                />
            }
        >
            <CategoryPageContent {...props} />
        </Suspense>
    );
}