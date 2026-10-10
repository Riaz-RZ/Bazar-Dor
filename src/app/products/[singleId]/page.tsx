
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { toBanglaNumber, toBanglaUnit } from "@/utils/product";
import { fetchApiJson } from "@/utils/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type ProductPageProps = {
  params: Promise<{ singleId: string }>;
};

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type ProductDetails = {
  id: number;
  category: string;
  categoryNameBn: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: { dir: "up" | "down"; pct: number };
  markets?: Market[];
};

const ProductDetailsContent = async ({
  params,
}: ProductPageProps) => {
  const { singleId } = await params;

  const result = await fetchApiJson<ProductDetails>(
    `https://openapi.programming-hero.com/api/bazardor/products/${encodeURIComponent(singleId)}`,
    "পণ্যের বিস্তারিত",
  );

  if (result.data === null) {
    if (result.status === 404) {
      notFound();
    }

    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <ApiErrorMessage message={result.error} />
      </section>
    );
  }

  const data = result.data;
  if (
    !data ||
    typeof data !== "object" ||
    typeof data.id !== "number" ||
    typeof data.nameBn !== "string"
  ) {
    notFound();
  }

  const markets = data.markets ?? [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const avgPrice = markets.length
    ? markets.reduce(
        (total, market) =>
          total + (market.min + market.max) / 2,
        0,
      ) / markets.length
    : 0;

  return (
    <section className="mx-auto w-full max-w-7xl min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Breadcrumb */}
      <div className="breadcrumbs mb-4 max-w-full overflow-x-auto text-xs sm:text-sm">
        <ul className="flex-nowrap whitespace-nowrap">
          <li>
            <Link href="/" className="hover:text-emerald-600">
              হোম
            </Link>
          </li>

          <li>
            <Link
              href={`/category/${data.category}`}
              className="hover:text-emerald-600"
            >
              {data.categoryNameBn}
            </Link>
          </li>

          <li>
            <span className="font-medium text-gray-700">
              {data.nameBn}
            </span>
          </li>
        </ul>
      </div>

      {/* Product Header */}
      <div className="mb-6 flex min-w-0 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-5 md:flex-row md:items-center md:justify-between md:gap-6 lg:p-6">
        {/* Product Information */}
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-3xl sm:h-20 sm:w-20 sm:text-5xl">
            {data.image}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="wrap-break-word text-xl font-bold sm:text-2xl lg:text-3xl">
              {data.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              {`প্রতি ${toBanglaUnit(data.unit)} · ${data.categoryNameBn}`}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm sm:text-base">
              <span>গতকালের তুলনায় আজ দাম</span>

              <span
                className={`font-bold ${
                  data.change.dir === "up"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {data.change.dir === "up" ? "বেড়েছে" : "কমেছে"}
              </span>

              <span className="font-medium">
                {toBanglaNumber(
                  Math.abs(data.today - data.yesterday),
                )}{" "}
                টাকা
              </span>
            </div>
          </div>
        </div>

        {/* Today's Price */}
        <div className="w-full rounded-xl bg-emerald-50 p-4 text-center sm:p-5 md:w-auto md:min-w-44 md:shrink-0">
          <div className="text-sm text-gray-600 sm:text-base">
            আজকের দাম
          </div>

          <div className="mt-1 text-2xl font-bold sm:text-3xl">
            {toBanglaNumber(data.today)}
          </div>

          <div className="text-sm text-gray-600">
            টাকা / {toBanglaUnit(data.unit)}
          </div>

          <div
            className={`mt-2 text-base font-bold sm:text-lg ${
              data.change.dir === "up"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {data.change.dir === "up" ? "🔺" : "🔻"}{" "}
            {toBanglaNumber(data.change.pct)}%
          </div>
        </div>
      </div>

      {/* Detailed Price */}
      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:mb-8">
        {/* Price Summary */}
        <h2 className="px-4 pt-5 text-lg font-bold sm:px-6 sm:pt-6 sm:text-xl lg:px-7">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:grid-cols-3 lg:px-7">
          {/* Minimum Price */}
          <div className="min-w-0 rounded-xl border border-gray-200 p-4 sm:p-5">
            <p className="text-sm text-gray-500 sm:text-base">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-1 wrap-break-word text-xl font-bold text-emerald-700 sm:text-2xl">
              {toBanglaNumber(minPrice)} টাকা
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          {/* Maximum Price */}
          <div className="min-w-0 rounded-xl border border-gray-200 p-4 sm:p-5">
            <p className="text-sm text-gray-500 sm:text-base">
              সর্বাধিক দাম
            </p>

            <p className="mt-1 wrap-break-word text-xl font-bold text-red-600 sm:text-2xl">
              {toBanglaNumber(maxPrice)} টাকা
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* Average Price */}
          <div className="min-w-0 rounded-xl border border-gray-200 p-4 sm:col-span-2 sm:p-5 lg:col-span-1">
            <p className="text-sm text-gray-500 sm:text-base">
              গড় দাম
            </p>

            <p className="mt-1 wrap-break-word text-xl font-bold text-emerald-700 sm:text-2xl">
              {toBanglaNumber(Math.round(avgPrice))} টাকা
            </p>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি কেজি-এর হিসাবে
            </p>
          </div>
        </div>

        {/* Market Prices */}
        <h2 className="px-4 pb-2 pt-3 text-lg font-bold sm:px-6 sm:text-xl lg:px-7">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-7">
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full min-w-150 border-collapse text-sm">
              <thead>
                <tr className="bg-emerald-100 text-gray-700">
                  <th className="whitespace-nowrap px-3 py-3 text-left font-bold sm:px-5 sm:py-4">
                    বাজার
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-left font-bold sm:px-5 sm:py-4">
                    বিভাগ
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right font-bold sm:px-5 sm:py-4">
                    সর্বনিম্ন
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right font-bold sm:px-5 sm:py-4">
                    সর্বাধিক
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right font-bold sm:px-5 sm:py-4">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-t border-gray-100 transition-colors hover:bg-emerald-100/70 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-3 py-3 font-medium text-gray-800 sm:px-5 sm:py-4">
                      {market.market}
                    </td>

                    <td className="px-3 py-3 text-gray-600 sm:px-5 sm:py-4">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right font-medium text-emerald-700 sm:px-5 sm:py-4">
                      {toBanglaNumber(market.min)} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right font-medium text-red-600 sm:px-5 sm:py-4">
                      {toBanglaNumber(market.max)} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right font-bold text-emerald-700 sm:px-5 sm:py-4">
                      {toBanglaNumber(
                        Math.round((market.min + market.max) / 2),
                      )}{" "}
                      টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-2 text-xs text-gray-500 sm:hidden">
            সম্পূর্ণ টেবিল দেখতে ডানে বা বামে স্ক্রল করুন।
          </p>
        </div>
      </div>
    </section>
  );
};

export default function SingleProductDetails(
  props: ProductPageProps,
) {
  return (
    <Suspense
      fallback={
        <div
          className="mx-auto min-h-96 w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
          role="status"
          aria-label="পণ্যের তথ্য লোড হচ্ছে"
        >
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-32 rounded bg-emerald-100" />
            <div className="h-36 rounded-xl bg-emerald-100 sm:h-44" />
            <div className="h-40 rounded-xl bg-emerald-100" />
          </div>
        </div>
      }
    >
      <ProductDetailsContent {...props} />
    </Suspense>
  );
}
