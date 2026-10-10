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
        <div className="dropdown dropdown-end">
            <button
                type="button"
                className="btn btn-ghost flex items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Profile menu"
            >
                <div className="avatar placeholder">
                    <div className="w-9 rounded-full bg-green-600 text-white">
                        <span>
                            {name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>

                <span className="max-w-32 truncate">{name}</span>
                <span aria-hidden="true">⌄</span>
            </button>

            {isOpen && (
                <ul className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                    <li className="menu-title">
                        <span className="text-base font-semibold">{name}</span>
                        <span className="text-xs font-normal text-gray-500 break-all">
                            {email}
                        </span>
                    </li>

                    <li>
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                        >
                            👤 আমার প্রোফাইল
                        </Link>
                    </li>

                    <li>
                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="text-error"
                        >
                            ↪ {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default UserDropdown;
