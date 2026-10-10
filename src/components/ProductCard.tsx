
import { Iproduct } from "@/types/productTypes";
import { toBanglaNumber, toBanglaUnit } from "@/utils/product";
import Link from "next/link";

const ProductCard = ({ products }: { products: Iproduct }) => {
    return (
        <Link
            href={`/products/${products.id}`}
            className="block w-full min-w-0"
        >
            <div className="card h-full w-full bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="card-body gap-4 p-3 sm:p-4 md:p-5">

                    {/* Product information */}
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="shrink-0 rounded-xl bg-emerald-50 p-2 text-xl sm:text-2xl">
                            {products.image}
                        </div>

                        <div className="min-w-0">
                            <h2 className="wrap-break-word text-base font-semibold sm:text-lg md:text-xl">
                                {products.nameBn}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                প্রতি {toBanglaUnit(products.unit)}
                            </p>
                        </div>
                    </div>

                    {/* Today's price */}
                    <div className="mt-auto">
                        <div className="mb-1 text-xs text-gray-500 sm:text-sm">
                            আজকের দাম
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="text-lg font-semibold sm:text-xl">
                                {toBanglaNumber(products.today)} টাকা
                            </div>

                            <div className="shrink-0 rounded-2xl bg-green-100 px-2 py-1 text-xs sm:text-sm">
                                <span
                                    className={
                                        products.change.dir === "up"
                                            ? "font-medium text-red-500"
                                            : products.change.dir === "down"
                                              ? "font-medium text-green-600"
                                              : "font-medium text-gray-500"
                                    }
                                >
                                    {products.change.dir === "up"
                                        ? "▲"
                                        : products.change.dir === "down"
                                          ? "▼"
                                          : "–"}{" "}
                                    {toBanglaNumber(products.change.pct)}%
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
