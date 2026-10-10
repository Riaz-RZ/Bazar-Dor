import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[45vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
      <p className="text-6xl font-bold text-emerald-700">৪০৪</p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 text-gray-600">
        ঠিকানাটি ভুল হতে পারে, অথবা পেজটি আর উপলব্ধ নেই।
      </p>
      <Link
        href="/"
        className="btn mt-6 bg-green-700 text-white hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
