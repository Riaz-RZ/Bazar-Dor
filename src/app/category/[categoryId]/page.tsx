
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
  params,
  searchParams,
}: CategoryPageProps) => {
  const { categoryId } = await params;
  const { sort } = await searchParams;

  const result = await fetchApiJson<Iproduct[]>(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
    "এই বিভাগের পণ্যের দাম",
  );

  if (result.data === null) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
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
    <section className="mx-auto w-full max-w-7xl min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Category Header */}
      <div className="mb-6 flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:mb-8 sm:gap-5 sm:p-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-3xl sm:h-20 sm:w-20 sm:text-5xl">
          {categoryIcons[categoryId]}
        </div>

        <div className="min-w-0">
          <h1 className="wrap-break-word text-xl font-bold sm:text-2xl lg:text-3xl">
            {categoryNames[categoryId] || categoryId}
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            {toBanglaNumber(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Product Count + Sorting */}
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <p className="text-sm text-gray-600 sm:text-base">
          মোট {toBanglaNumber(products.length)}টি পণ্য
        </p>

        <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-end">
          <span className="shrink-0 text-sm sm:text-base">সাজান:</span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm border-gray-300 bg-white font-normal hover:bg-emerald-50 sm:btn-md"
            >
              {sort === "low"
                ? "দাম কম → বেশি"
                : sort === "high"
                  ? "দাম বেশি → কম"
                  : "ডিফল্ট"}
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu z-20 mt-1 w-52 max-w-[calc(100vw-2rem)] rounded-box border border-gray-200 bg-base-100 p-2 shadow-lg"
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

      {/* Product Count */}
      <p className="mb-4 text-sm text-gray-500 sm:mb-6 sm:text-base">
        মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Products */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} products={product} />
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
          className="mx-auto min-h-96 w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
          role="status"
          aria-label="পণ্য লোড হচ্ছে"
        >
          <div className="animate-pulse space-y-4">
            <div className="h-20 rounded-xl bg-emerald-100" />
            <div className="h-12 rounded-xl bg-emerald-100" />
            <div className="h-48 rounded-xl bg-emerald-100" />
          </div>
        </div>
      }
    >
      <CategoryPageContent {...props} />
    </Suspense>
  );
}
