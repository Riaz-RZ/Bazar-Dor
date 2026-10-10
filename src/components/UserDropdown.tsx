
'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

type UserDropdownProps = {
    name: string;
    email: string;
};

const UserDropdown = ({ name, email }: UserDropdownProps) => {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);

            const { error } = await signOut();

            if (error) {
                toast.error("সাইন আউট করা যায়নি!");
                return;
            }

            setIsOpen(false);
            router.replace("/");
            router.refresh();
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
        } catch (error) {
            console.error("Sign out failed:", error);
            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন!");
        } finally {
            setIsSigningOut(false);
        }
    };

    return (
        <div className="dropdown dropdown-end relative">
            {/* Profile button */}
            <button
                type="button"
                className="btn btn-ghost h-auto min-h-0 gap-1.5 px-1.5 py-2 sm:gap-2 sm:px-3"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Profile menu"
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <div className="avatar placeholder shrink-0">
                    <div className="w-8 sm:w-9 rounded-full bg-green-600 text-white">
                        <span className="text-sm">
                            {name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>

                <span className="max-w-20 truncate text-xs sm:max-w-32 sm:text-sm">
                    {name}
                </span>

                <span className="text-xs" aria-hidden="true">
                    {isOpen ? "⌃" : "⌄"}
                </span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <ul
                    role="menu"
                    className="menu dropdown-content absolute right-0 top-full z-50 mt-2 w-[min(14rem,calc(100vw-1.5rem))] rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
                >
                    <li className="menu-title min-w-0">
                        <span className="block max-w-full truncate text-sm font-semibold">
                            {name}
                        </span>

                        <span className="block whitespace-normal break-all text-xs font-normal text-gray-500">
                            {email}
                        </span>
                    </li>

                    <li>
                        <Link
                            href="/profile"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                            className="text-sm sm:text-base"
                        >
                            <span aria-hidden="true">👤</span>
                            আমার প্রোফাইল
                        </Link>
                    </li>

                    <li>
                        <button
                            type="button"
                            role="menuitem"
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="text-sm text-error sm:text-base"
                        >
                            <span aria-hidden="true">↪</span>
                            {isSigningOut
                                ? "সাইন আউট হচ্ছে..."
                                : "সাইন আউট"}
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default UserDropdown;
