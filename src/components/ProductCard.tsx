import { Iproduct } from "@/types/productTypes";
import { toBanglaNumber, toBanglaUnit } from "@/utils/product";
import Link from "next/link";



const ProductCard = ({ products }: { products: Iproduct }) => {
    return (
        <Link href={`/products/${products.id}`}>
        <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
                <div className="flex">
                    <div className="border-0 rounded-xl p-1 bg-emerald-50 text-2xl me-2">
                        {products.image}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{products.nameBn}</h2>
                        <p>{`প্রতি ${toBanglaUnit(products.unit)}`}</p>
                    </div>
                </div>
                <div>
                    <div className="mt-1">আজকের দাম</div>
                    <div className="card-actions justify-between">
                        <div className="text-xl font-semibold">{`${toBanglaNumber(products.today)} টাকা`}</div>
                        <div className="border-0 rounded-2xl p-1 bg-green-100 text-xs">
                        <span
                            className={
                                products.change.dir === "up"
                                    ? "text-red-500"
                                    : "text-green-500"
                            }
                        >
                            {products.change.dir === "up" ? "▲" : "▼"}{" "}
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