import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-10 min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center gap-3 px-6 lg:px-10">
        <h1 className="text-2xl md:text-5xl font-header font-bold text-outline text-center uppercase">
          404 - Page Not Found
        </h1>
        <p className="text-sm md:text-xl opacity-70 font-primary text-center">
          {`Oops! The page you're looking for does not seem to exist.`}
        </p>
      </div>
      <Link href="/" className="hover:underline">
        Back to home
      </Link>
    </div>
  );
}
