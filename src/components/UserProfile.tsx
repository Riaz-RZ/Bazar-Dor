'use client';


import { updateUser, useSession } from "@/lib/auth-client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

const UserProfile = () => {

    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString().trim();

        if (!name) {
            toast.error("নাম লিখুন!");
            return;
        }

        try {
            const { error } = await updateUser({ name });

            if (error) {
                toast.error("তথ্য আপডেট করা যায়নি!");
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
            router.refresh();
        } catch (error) {
            console.error("Profile update failed:", error);
            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন!");
        }
    };
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

    if (isPending) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-green-600"></span>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">
                    আপনি সাইন ইন করেননি
                </h2>
                <Link href="/signin" className="btn bg-green-600 text-white">
                    সাইন ইন করুন
                </Link>
            </div>
        );
    }

    return (
        <section className="max-w-2xl mx-auto my-10 ">

            <div className="">
                <h1 className="text-2xl font-bold mb-2">
                    আমার প্রোফাইল
                </h1>
                <p className="mb-6">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            <div className="p-6 rounded-xl shadow-md bg-white flex gap-2 mb-6">

                <div className="avatar">
                    <div className="w-9 rounded-full bg-green-600 text-white">
                        <span>
                            {(session.user.name ?? "").charAt(0).toUpperCase()}
                        </span>
                    </div>

                </div>

                <div>
                    <p className="font-semibold">{session.user.name}</p>
                    <p className="font-semibold text-gray-400">{session.user.email}</p>
                </div>
                <div className="ms-40">
                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="text-error cursor-pointer btn btn-dash"
                    >
                        ↪ {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                    </button>
                </div>
            </div>
            <form onSubmit={handleUpdateUser}>

                <fieldset className="fieldset rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-xl sm:px-6 [@media(max-height:720px)]:gap-0.5 [@media(max-height:720px)]:py-2">
                    <h1 className="font-bold text-xl">তথ্য</h1>
                    {/* Name */}
                    <label htmlFor="name" className="label">
                        নাম
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="input input-sm w-full [@media(max-height:720px)]:h-7 [@media(max-height:720px)]:min-h-7"
                        placeholder=""
                        autoComplete="name"
                        required
                    />
                    <button type="submit" className="btn btn-success bg-green-700 btn-sm mt-3 w-full text-white font-bold [@media(max-height:720px)]:h-7 [@media(max-height:720px)]:min-h-7">
                        আপডেট
                    </button>
                </fieldset>
            </form>
        </section>
    );
};

export default UserProfile;
