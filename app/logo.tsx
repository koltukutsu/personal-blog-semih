"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Logo() {
  const pathname = usePathname();
  return (
    <span className="text-md md:text-lg whitespace-nowrap font-bold">
      {pathname === "/" ? (
        <span className="cursor-default pr-2">M. Semih Babacan</span>
      ) : (
        <Link
          href="/"
          className="text-white dark:text-white bg-black dark:bg-black hover:bg-gray-900 dark:hover:bg-[#181818] active:bg-gray-800 dark:active:bg-[#101010] p-2 rounded-sm -ml-2 transition-[background-color]"
        >
          M. Semih Babacan
        </Link>
      )}
    </span>
  );
}
