import { toBanglaNumber, toBanglaUnit } from '@/utils/product';

const SingleProductDetails = async ({ params }: { params: Promise<{ singleId: string }> }) => {
    const { singleId } = await params;
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${singleId}`);
    const data = await res.json();

    console.log(data);
    return (
        <section className="max-w-7xl mx-auto px-6 py-10">
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

                        <div className={"inline-flex items-center gap-2 rounded-lg text-sm"}>

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
                <div className='border-0 bg-emerald-50 rounded-xl m-3 p-2'>
                    <div className='justify-center text-gray-600'>
                        আজকের দাম
                    </div>
                    <div className='justify-center text-2xl font-bold'>
                        {toBanglaNumber(data.today)}
                    </div>
                    <div>
                        টাকা / {toBanglaUnit(data.unit)}
                    </div>
                </div>
            </div>

            {/* Detailed Price */}

            <div className="bg-white border-2 rounded-xl border-gray-200 mb-8">
                {/* দামের সারসংক্ষেপ */}
                <h1>দামের সারসংক্ষেপ</h1>
                <div className='grid grid-cols-3'>
                    <div className='col-span-1'>সর্বনিম্ন দাম</div>
                    <div className='col-span-1'>সর্বাধিক দাম</div>
                    <div className='col-span-1'>গড় দাম</div>
                </div>


                {/* বাজারভিত্তিক আজকের দাম */}
                <h1>বাজারভিত্তিক আজকের দাম</h1>
                <div className="overflow-x-auto p-6">
                    <table className="w-full border-2 rounded-2xl border-gray-400 bg-amber-200">
                        <thead>
                            <tr className="bg-emerald-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left">বাজার</th>
                                <th className="px-4 py-3 text-left">বিভাগ</th>
                                <th className="px-4 py-3 text-right">সর্বনিম্ন</th>
                                <th className="px-4 py-3 text-right">সর্বাধিক</th>
                                <th className="px-4 py-3 text-right">গড়</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.markets?.map((market: { market: string; division: string; min: number; max: number; avg: number }, index: number) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">
                                        {market.market}
                                    </td>

                                    <td className="px-4 py-3">
                                        {market.division}
                                    </td>    

                                    <td className="px-4 py-3 text-right">
                                        {toBanglaNumber(market.min)} টাকা
                                    </td>

                                    <td className="px-4 py-3 text-right">
                                        {toBanglaNumber(market.max)} টাকা
                                    </td>

                                    <td className="px-4 py-3 text-right font-semibold">
                                        {toBanglaNumber((market.min + market.max) / 2)} টাকা
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



        </section>




    );

};

export default SingleProductDetails;