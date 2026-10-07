
import Image from "next/image";
import Navlinks from "./Navlinks";
import Link from "next/link";


const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header>
            <div className="flex items-center justify-between max-w-7xl w-full mx-auto py-3">
                <Link href={'/'}>
                <div className="flex items-center gap-3">
                    <Image className="border-white rounded-2xl p-2 bg-green-600" src={'/logo-icon.png'} alt="navlogo" height={50} width={50} />
                    <div>
                        <h2 className="font-bold text-2xl">বাজার দর</h2>
                        <p className="text-gray-500">{date}</p>
                    </div>
                </div>
                </Link>
                <div className="flex gap-4">
                    <button className="btn btn-outline">সাইন ইন</button>
                    <button className="btn btn-active bg-green-600 text-white">সাইন আপ</button>
                </div>
            </div>
            

            <Navlinks/>
        </header>
    );
};

export default Header;