import { Iproduct } from "@/types/productTypes";
import ApiErrorMessage from "@/components/ApiErrorMessage";
import { fetchApiJson } from "@/utils/api";
import { toBanglaNumber, toBanglaUnit } from "@/utils/product";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
    const result = await fetchApiJson<Iproduct[]>(
        "https://openapi.programming-hero.com/api/bazardor/products",
        "পণ্যের দাম",
    );

    if (result.data === null) {
        return (
            <div className="border-b border-gray-200 p-2 sm:p-3">
                <ApiErrorMessage message={result.error} />
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden border-b border-gray-200">
            <MarqueeText
                direction="right"
                duration={80}
                pauseOnHover
                className="w-full"
            >
                <div className="flex w-max items-center gap-2 py-2 sm:gap-4 sm:py-3">
                    {result.data.map((pn) => (
                        <div
                            className="flex shrink-0 items-center gap-1.5 sm:gap-2 border-e-2 border-gray-200 pe-2 sm:pe-4 text-xs sm:text-sm md:text-base whitespace-nowrap"
                            key={pn.id}
                        >
                            <span>{pn.image}</span>

                            <span className="font-semibold">
                                {pn.nameBn}
                            </span>

                            <span>
                                {`${toBanglaNumber(pn.today)} টাকা/${toBanglaUnit(pn.unit)}`}
                            </span>

                            <span
                                className={
                                    pn.change.dir === "up"
                                        ? "font-semibold text-red-500"
                                        : pn.change.dir === "down"
                                          ? "font-semibold text-green-500"
                                          : "font-semibold text-gray-500"
                                }
                            >
                                {pn.change.dir === "up"
                                    ? "▲"
                                    : pn.change.dir === "down"
                                      ? "▼"
                                      : "–"}{" "}
                                {toBanglaNumber(pn.change.pct)}%
                            </span>
                        </div>
                    ))}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;