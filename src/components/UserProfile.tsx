
'use client';

import { updateUser, useSession, signOut } from "@/lib/auth-client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserProfile = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name")?.toString().trim();

        if (!name) {
            toast.error("নাম লিখুন!");
            return;
        }

        try {
            setIsUpdating(true);

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
        } finally {
            setIsUpdating(false);
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
                <span className="loading loading-spinner loading-lg text-green-600" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="px-4 py-16 text-center sm:py-20">
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                    আপনি সাইন ইন করেননি
                </h2>

                <Link href="/signin" className="btn bg-green-600 text-white">
                    সাইন ইন করুন
                </Link>
            </div>
        );
    }

    return (
        <section className="mx-auto my-6 w-full max-w-2xl px-4 sm:my-10 sm:px-6">
            {/* Page heading */}
            <div className="mb-5 sm:mb-6">
                <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
                    আমার প্রোফাইল
                </h1>

                <p className="text-sm text-gray-600 sm:text-base">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            {/* User information card */}
            <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md sm:flex-row sm:items-center sm:p-6">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="avatar placeholder shrink-0">
                        <div className="w-11 rounded-full bg-green-600 text-white sm:w-12">
                            <span className="text-lg">
                                {(session.user.name ?? "").charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <div className="min-w-0">
                        <p className="wrap-break-word font-semibold text-gray-900">
                            {session.user.name}
                        </p>

                        <p className="break-all text-sm text-gray-500">
                            {session.user.email}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="btn btn-outline btn-error w-full sm:w-auto"
                >
                    {isSigningOut ? "সাইন আউট হচ্ছে..." : "↪ সাইন আউট"}
                </button>
            </div>

            {/* Update profile form */}
            <form onSubmit={handleUpdateUser}>
                <fieldset className="fieldset rounded-2xl border border-gray-200 bg-white px-4 py-5 shadow-md sm:px-6 sm:py-6">
                    <legend className="px-2 text-xl font-bold">
                        তথ্য আপডেট
                    </legend>

                    <label htmlFor="name" className="label">
                        নাম
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={session.user.name ?? ""}
                        className="input input-bordered w-full"
                        autoComplete="name"
                        placeholder="আপনার নাম লিখুন"
                        required
                    />

                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="btn mt-4 w-full border-green-700 bg-green-700 text-white hover:bg-green-800"
                    >
                        {isUpdating ? (
                            <>
                                <span className="loading loading-spinner loading-sm" />
                                আপডেট হচ্ছে...
                            </>
                        ) : (
                            "আপডেট"
                        )}
                    </button>
                </fieldset>
            </form>
        </section>
    );
};

export default UserProfile;
