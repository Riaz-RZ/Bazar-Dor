'use client'
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            const resData = await signIn.social({
                provider: "google",
                callbackURL: "/",
            });
            console.log("Google sign in successful:", resData);
        } catch (error) {
            console.error("Google sign in failed:", error);
        }
    };

    const handleGithubSignIn = async () => {
        try {
            const resData = await signIn.social({
                provider: "github",
                callbackURL: "/",
            });
            console.log("Github sign in successful:", resData);
        } catch (error) {
            console.error("Github sign in failed:", error);
        }
    };


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        try {
            setIsSubmitting(true);

            const { data: resData, error } = await signIn.email({
                email,
                password,
                rememberMe: true,
                callbackURL: "/",
            });

            if (error) {
                console.error("Sign in failed:", error);
                toast.error(error.message || "সাইন ইন করা যায়নি!");
                return;
            }

            console.log("Sign in successful:", resData);
            toast.success("সফলভাবে সাইন ইন হয়েছে!");

            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Sign in failed:", error);
            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন!");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-full max-w-md mt-20">
                {/* Heading */}
                <div className="mb-2 text-center">
                    <h1 className="text-2xl font-bold">সাইন ইন</h1>
                    <p className="text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
                </div>

                {/* Signin Form */}
                <form onSubmit={onSubmit} >
                    <fieldset className="fieldset rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-xl sm:px-6 [@media(max-height:720px)]:gap-0.5 [@media(max-height:720px)]:py-2">


                        {/* Email */}
                        <label htmlFor="email" className="label mt-1">
                            ইমেইল
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="input input-sm w-full [@media(max-height:720px)]:h-7 [@media(max-height:720px)]:min-h-7"
                            placeholder="আপনার ইমেইল লিখুন"
                            autoComplete="email"
                            required
                        />

                        {/* Password */}
                        <label htmlFor="password" className="label mt-1">
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="input input-sm w-full [@media(max-height:720px)]:h-7 [@media(max-height:720px)]:min-h-7"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />


                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-success btn-sm mt-3 w-full font-bold text-white disabled:opacity-60"
                        >
                            {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
                        </button>

                        {/* Divider */}
                        <div className="divider my-1 [@media(max-height:720px)]:my-0">অথবা</div>

                        {/* Social Login */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                className="btn btn-outline btn-sm flex-1 whitespace-nowrap [@media(max-height:720px)]:h-7 [@media(max-height:720px)]:min-h-7"
                                onClick={handleGoogleSignIn}
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                    />
                                </svg>
                                Google দিয়ে চালিয়ে যান
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline btn-sm flex-1 whitespace-nowrap [@media(max-height:720px)]:h-7 [@media(max-height:720px)]:min-h-7"
                                onClick={handleGithubSignIn}
                            >
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub দিয়ে চালিয়ে যান
                            </button>
                        </div>

                        {/* Login Link */}
                        <p className="mt-2 text-center text-sm text-green-600 [@media(max-height:720px)]:mt-1">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                href="/signup"
                                className="link link-primary font-semibold"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </fieldset>
                </form>

                {/* Home Link */}
                <div className="mt-1 text-center">
                    <Link href="/" className="btn btn-ghost btn-xs gap-2">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;