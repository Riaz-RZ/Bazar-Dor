import Link from "next/link";

interface Iitems {
    id: string,
    slug: string, 
    nameBn: string,
    icon: string
}

const Navlinks = async() => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
    const data: Iitems[] = await res.json();
    return (
        <div className="flex justify-start gap-8 border py-3 border-gray-200 ps-90">
            {data.map((n) => <Link key={n.id} href={`/category/${n.slug}`}>{n.icon}{n.nameBn}</Link>)}
        </div>
    );
};

export default Navlinks;