import ApiErrorMessage from '@/components/ApiErrorMessage';
import { toBanglaNumber, toBanglaUnit } from '@/utils/product';
import { fetchApiJson } from '@/utils/api';
import Link from 'next/link';
import { Suspense } from 'react';

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

const ProductDetailsContent = async ({ params }: ProductPageProps) => {
    const { singleId } = await params;
    const result = await fetchApiJson<ProductDetails>(
        `https://api.api-store.workers.dev/api/bazardor/products/${encodeURIComponent(singleId)}`,
        "পণ্যের বিস্তারিত",
    );

    if (result.data === null) {
        return (
            <section className="max-w-7xl mx-auto px-6 py-10">
                <ApiErrorMessage message={result.error} />
            </section>
        );
    }

    const data = result.data;

    const markets = data.markets ?? [];

    const minPrice = markets.length
        ? Math.min(...markets.map((market: { min: number }) => market.min))
        : 0;

    const maxPrice = markets.length
        ? Math.max(...markets.map((market: { max: number }) => market.max))
        : 0;

    const avgPrice = markets.length
        ? markets.reduce(
            (total: number, market: { min: number; max: number }) =>
                total + (market.min + market.max) / 2,
            0
        ) / markets.length
        : 0;

    return (
        <section className="max-w-7xl mx-auto px-6 py-10">
            {/* Breadcrumb */}
            <div className="breadcrumbs text-sm mb-4">
                <ul>
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

            {/* Category Header */}
            <div className="bg-white border-2 rounded-xl border-gray-200 mb-8 flex justify-between">
                {/* Left */}
                <div className="flex pe-170">
                    <div className="text-6xl p-2 border-0 rounded-2xl bg-emerald-50 m-6">
                        {data.image}
                    </div>

                    <div className="m-6">
                        <h1 className="text-3xl font-bold">
                            {data.nameBn}
                        </h1>
                        <p>
                            {`প্রতি ${toBanglaUnit(data.unit)} · ${data.categoryNameBn}`}
                        </p>

                        <div className={"inline-flex items-center rounded-lg text-sm whitespace-nowrap"}>

                            <span>
                                গতকালের তুলনায় আজ দাম
                            </span>
                            <span className="font-bold">
                                {" "}
                                {data.change.dir === "up" ? "বেড়েছে" : "কমেছে"}
                            </span>

                            <span>
                                {toBanglaNumber(Math.abs(data.today - data.yesterday))} টাকা
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="border-0 bg-emerald-50 rounded-xl m-4 p-3 text-center">
                    <div className="text-gray-600 whitespace-nowrap">
                        আজকের দাম
                    </div>

                    <div className="text-2xl font-bold">
                        {toBanglaNumber(data.today)}
                    </div>

                    <div className="text-sm text-gray-600">
                        টাকা / {toBanglaUnit(data.unit)}
                    </div>

                    <div
                        className={`mt-2 text-lg font-bold ${data.change.dir === "up"
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

            <div className="bg-white border-2 rounded-xl border-gray-200 mb-8">
                {/* দামের সারসংক্ষেপ */}
                <h1 className='text-xl font-bold ps-7 pt-7'>দামের সারসংক্ষেপ</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6 my-5">
                    <div className="border rounded-xl border-gray-300 p-4">
                        <p className="text-gray-500">সর্বনিম্ন দাম</p>
                        <p className="text-2xl font-bold text-emerald-700">
                            {toBanglaNumber(minPrice)} টাকা
                        </p>
                        <p className="text-gray-500">সবচেয়ে কম দামের বাজার</p>
                    </div>

                    <div className="border rounded-xl border-gray-300 p-4">
                        <p className="text-gray-500">সর্বাধিক দাম</p>
                        <p className="text-2xl font-bold text-red-600">
                            {toBanglaNumber(maxPrice)} টাকা
                        </p>
                        <p className="text-gray-500">
                            সবচেয়ে বেশি দামের বাজার
                        </p>
                    </div>

                    <div className="border rounded-xl border-gray-300 p-4">
                        <p className="text-gray-500">গড় দাম</p>
                        <p className="text-2xl font-bold  text-emerald-700">
                            {toBanglaNumber(Math.round(avgPrice))} টাকা
                        </p>
                        <p className="text-gray-500">
                            প্রতি কেজি-এর হিসাবে
                        </p>
                    </div>
                </div>


                {/* বাজারভিত্তিক আজকের দাম */}
                <h1 className="text-xl font-bold ps-7 mb-2">
                    বাজারভিত্তিক আজকের দাম
                </h1>

                <div className="p-6">
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-emerald-100 text-gray-700">
                                    <th className="px-5 py-4 text-left font-bold">
                                        বাজার
                                    </th>
                                    <th className="px-5 py-4 text-left font-bold">
                                        বিভাগ
                                    </th>
                                    <th className="px-5 py-4 text-right font-bold">
                                        সর্বনিম্ন
                                    </th>
                                    <th className="px-5 py-4 text-right font-bold">
                                        সর্বাধিক
                                    </th>
                                    <th className="px-5 py-4 text-right font-bold">
                                        গড়
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {markets.map((market, index) => (
                                    <tr
                                        key={`${market.market}-${index}`}
                                            className={`border-t border-gray-100 transition-colors hover:bg-emerald-100/70 ${index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-50"
                                                }`}
                                        >
                                            <td className="px-5 py-4 font-medium text-gray-800">
                                                {market.market}
                                            </td>

                                            <td className="px-5 py-4 text-gray-600">
                                                {market.division}
                                            </td>

                                            <td className="px-5 py-4 text-right text-emerald-700 font-medium whitespace-nowrap">
                                                {toBanglaNumber(market.min)} টাকা
                                            </td>

                                            <td className="px-5 py-4 text-right text-red-600 font-medium whitespace-nowrap">
                                                {toBanglaNumber(market.max)} টাকা
                                            </td>

                                            <td className="px-5 py-4 text-right font-bold text-emerald-700 whitespace-nowrap">
                                                {toBanglaNumber(
                                                    Math.round((market.min + market.max) / 2)
                                                )} টাকা
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </section>




    );

};

export default function SingleProductDetails(props: ProductPageProps) {
    return (
        <Suspense
            fallback={
                <div
                    className="max-w-7xl mx-auto min-h-96 px-6 py-10"
                    aria-label="পণ্যের তথ্য লোড হচ্ছে"
                />
            }
        >
            <ProductDetailsContent {...props} />
        </Suspense>
    );
}