import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="flex flex-col items-center gap-6 px-6 text-center">
    {/* Your logo */}
    <Image
      src="/privacy-check-logo-transparent.png"
      alt="Project Logo"
      width={180}
      height={180}
      priority
      className="object-contain"
    />

    <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
      🚧 Work in Progress
    </h1>

    <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
      We're currently building something great. Check back soon!
    </p>

    <div className="mt-4 rounded-full bg-zinc-200 px-5 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
      Coming Soon
    </div>

      </div>
    </main>
  );
}

