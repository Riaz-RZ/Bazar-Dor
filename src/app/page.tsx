
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { Iproduct } from "@/types/productTypes";
import { fetchApiJson } from "@/utils/api";
import { toBanglaNumber } from "@/utils/product";
import { Suspense } from "react";

async function HomeProducts() {
  const result = await fetchApiJson<Iproduct[]>(
    "https://openapi.programming-hero.com/api/bazardor/products",
    "পণ্যের দাম",
  );

  if (result.data === null) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <ApiErrorMessage message={result.error} />
      </main>
    );
  }

  const data = result.data;

  const priceUpProducts = data
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const priceDownProducts = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const gridClass =
    "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6";

  const sectionTitleClass =
    "mb-4 text-xl font-bold sm:mb-6 sm:text-2xl";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
      {/* Price Up */}
      <section className="mt-10 sm:mt-14 lg:mt-16">
        <h2 className={sectionTitleClass}>
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>

        <div className={gridClass}>
          {priceUpProducts.map((product) => (
            <ProductCard key={product.id} products={product} />
          ))}
        </div>
      </section>

      {/* Price Down */}
      <section className="mt-10 sm:mt-14 lg:mt-16">
        <h2 className={sectionTitleClass}>
          <span className="text-green-600">▼</span> আজ দাম কমেছে
        </h2>

        <div className={gridClass}>
          {priceDownProducts.map((product) => (
            <ProductCard key={product.id} products={product} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section
        id="library"
        className="mt-12 scroll-mt-24 sm:mt-16 lg:mt-20"
      >
        <h2 className="text-xl font-bold sm:text-2xl">
          সব পণ্য
        </h2>

        <p className="mb-5 mt-2 text-sm text-gray-600 sm:mb-7 sm:text-base">
          মোট {toBanglaNumber(data.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className={gridClass}>
          {data.map((product) => (
            <ProductCard key={product.id} products={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <Suspense
        fallback={
          <div
            className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8"
            role="status"
            aria-label="পণ্য লোড হচ্ছে"
          >
            <section className="animate-pulse">
              <div className="mb-5 h-7 w-44 rounded bg-emerald-100" />
              <ProductGridSkeleton />
            </section>
            <section className="animate-pulse">
              <div className="mb-5 h-7 w-44 rounded bg-emerald-100" />
              <ProductGridSkeleton />
            </section>
            <section className="animate-pulse">
              <div className="mb-5 h-7 w-32 rounded bg-emerald-100" />
              <ProductGridSkeleton count={3} />
            </section>
          </div>
        }
      >
        <HomeProducts />
      </Suspense>
    </>
  );
}
