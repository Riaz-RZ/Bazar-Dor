import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const toBanglaNumber = (value: number | string) => {
    return value
        .toString()
        .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};
const toBanglaUnit = (unit: string) => {
    const units: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        piece: "পিস",
        dozen: "ডজন",
    };

    return units[unit.toLowerCase()] || unit;
};

const Marquee = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const data: Product[] = await res.json();

    return (
        <MarqueeText direction="right" duration={80} pauseOnHover  className="border-b">
            <div className="flex gap-4 py-2 cursor-pointer">
                {data.map((pn) => (
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