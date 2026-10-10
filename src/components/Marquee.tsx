import { Iproduct } from "@/types/productTypes";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { fetchApiJson } from "@/utils/api";
import { toBanglaNumber, toBanglaUnit } from "@/utils/product";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"


const Marquee = async () => {
    const result = await fetchApiJson<Iproduct[]>(
        "https://api.api-store.workers.dev/api/bazardor/products",
        "পণ্যের দাম",
    );

    if (result.data === null) {
        return (
            <div className="border-b p-2">
                <ApiErrorMessage message={result.error} />
            </div>
        );
    }

    return (
        <MarqueeText direction="right" duration={80} pauseOnHover  className="border-b">
            <div className="flex gap-4 py-2 cursor-pointer">
                {result.data.map((pn) => (
                    <div className="border-e-2 pe-4 border-gray-200" key={pn.id}>
                        <span className="px-2">{pn.image}</span>
                        <span className="px-2 font-semibold">{pn.nameBn}</span>
                        <span className="px-2">{`${toBanglaNumber(pn.today)} টাকা/${toBanglaUnit(pn.unit)}`}</span>
                        <span
                            className={
                                pn.change.dir === "up"
                                    ? "text-red-500"
                                    : "text-green-500"
                            }
                        >
                            {pn.change.dir === "up" ? "▲" : "▼"}{" "}
                            {toBanglaNumber(pn.change.pct)}%
                        </span>
                    </div>
                ))}
            </div>
        </MarqueeText>
    );
};

export default Marquee;