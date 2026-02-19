import { Link } from "react-router-dom";

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-[#080808]/85 backdrop-blur-xl">
      <div className="max-w-[1100px] mx-auto px-8 flex items-center justify-between h-14">
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="font-bold text-lg tracking-tight text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Pulse
          </Link>
          <div className="hidden md:flex">
            <a
              href="#features"
              className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              How it works
            </a>
            <Link
              to="/docs"
              className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Docs
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="inline-flex items-center px-5 py-2 text-[13px] font-medium border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300 transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center px-5 py-2 text-[13px] font-medium bg-white border border-white text-[#080808] hover:bg-neutral-200 hover:border-neutral-200 transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
