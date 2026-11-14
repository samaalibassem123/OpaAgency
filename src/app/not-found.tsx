import Link from "next/link";
import { OpaLogo } from "@/components/ui/opa-logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center text-slate-900">
      <OpaLogo variant="light" width={160} height={48} />
      <h1 className="font-display text-4xl sm:text-6xl font-extrabold mt-8 text-slate-900">
        404
      </h1>
      <p className="text-slate-600 mt-2 max-w-md">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-xs tracking-tight hover:bg-[#D41A78] transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
