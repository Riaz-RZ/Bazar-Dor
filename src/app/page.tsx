import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Iproduct } from "@/types/productTypes";
import { toBanglaNumber } from "@/utils/product";



export default async function Home() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  const data: Iproduct[] = await res.json();

const priceUpProducts = data
  .filter((product) => product.change.dir === "up")
  .sort((a, b) => b.change.pct - a.change.pct)
  .slice(0, 6);

const priceDownProducts = data
  .filter((product) => product.change.dir === "down")
  .sort((a, b) => b.change.pct - a.change.pct)
  .slice(0, 6);

  return (
    <div>
      <Hero />


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
      <section className="mt-16">
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

     
    </div>
  );
}