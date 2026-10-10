import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { Iproduct } from "@/types/productTypes";
import { fetchApiJson } from "@/utils/api";
import { toBanglaNumber } from "@/utils/product";
import { Suspense } from "react";


async function HomeProducts() {
  const result = await fetchApiJson<Iproduct[]>(
    "https://api.api-store.workers.dev/api/bazardor/products",
    "পণ্যের দাম",
  );

  if (result.data === null) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-10">
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

  return (
      <main className="max-w-7xl mx-auto px-6">
        {/* Price Up */}
        <section className="mt-20">
          <h1 className="text-2xl font-bold mb-6">▲ আজ দাম বেড়েছে</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {priceUpProducts.map((product) => (
              <ProductCard
                key={product.id}
                products={product}
              />
            ))}
          </div>
        </section>

        {/* Price Down */}
        <section className="mt-20 mb-16">
          <h1 className="text-2xl font-bold mb-6">▼ আজ দাম কমেছে</h1>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {priceDownProducts.map((product) => (
              <ProductCard
                key={product.id}
                products={product}
              />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section className="mt-16 scroll-mt-24" id="library">
          <h1 className="text-2xl font-bold">সব পণ্য</h1>
          <p className="py-2 mb-8">
            মোট {toBanglaNumber(data.length)}টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.map((product) => (
              <ProductCard
                key={product.id}
                products={product}
              />
            ))}
          </div>
        </section>
      </main>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense
        fallback={
          <div
            className="max-w-7xl mx-auto min-h-96 px-6"
            aria-label="পণ্য লোড হচ্ছে"
          />
        }
      >
        <HomeProducts />
      </Suspense>
    </div>
  );
}