'use client'

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import UserDropdown from "./UserDropdown";

type HeaderProps = {
    date: ReactNode;
    navlinks: ReactNode;
    marquee: ReactNode;
};

const Header = ({ date, navlinks, marquee }: HeaderProps) => {
    const { data: session, isPending } = useSession();

    const authLinks = (
        <>
            {isPending ? (
                <span>লোড হচ্ছে...</span>
            ) : session?.user ? (
                <UserDropdown name={session.user.name}
                    email={session.user.email} />
            ) : (
                <>
                    <Link href="/signin" className="btn btn-outline">
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="btn btn-active bg-green-600 text-white"
                    >
                        সাইন আপ
                    </Link>
                </>
            )}
        </>
    );

    return (
        <header>
            <div className="flex items-center justify-between max-w-7xl w-full mx-auto py-3 px-6">
                <Link href="/">
                    <div className="flex items-center gap-3">
                        <Image
                            className="border-white rounded-2xl p-2 bg-green-600"
                            src="/logo-icon.png"
                            alt="navlogo"
                            height={50}
                            width={50}
                        />
                        <div>
                            <h2 className="font-bold text-2xl">বাজার দর</h2>
                            <p className="text-gray-500">
                                {date}
                            </p>
                        </div>
                    </div>
                </Link>

                <div className="flex gap-4">{authLinks}</div>
            </div>

            {navlinks}
            {marquee}
        </header>
    );
};

export default Header;