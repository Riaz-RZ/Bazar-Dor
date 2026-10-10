
'use client';

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
                <span className="text-sm">লোড হচ্ছে...</span>
            ) : session?.user ? (
                <UserDropdown
                    name={session.user.name}
                    email={session.user.email}
                />
            ) : (
                <>
                    <Link
                        href="/signin"
                        className="btn btn-outline btn-sm sm:btn-md"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="btn btn-active btn-sm sm:btn-md bg-green-600 text-white"
                    >
                        সাইন আপ
                    </Link>
                </>
            )}
        </>
    );

    return (
        <header className="w-full">
            {/* Logo, date, and authentication */}
            <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* Logo and brand */}
                    <Link href="/" className="min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Image
                                className="shrink-0 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 bg-green-600"
                                src="/logo-icon.png"
                                alt="বাজার দর লোগো"
                                height={50}
                                width={50}
                            />

                            <div className="min-w-0">
                                <h2 className="font-bold text-lg sm:text-2xl whitespace-nowrap">
                                    বাজার দর
                                </h2>

                                <p className="text-gray-500 text-xs sm:text-sm">
                                    {date}
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Authentication controls */}
                    <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
                        {authLinks}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="w-full">
                {navlinks}
            </div>

            {/* Scrolling price marquee */}
            <div className="w-full overflow-hidden">
                {marquee}
            </div>
        </header>
    );
};

export default Header;