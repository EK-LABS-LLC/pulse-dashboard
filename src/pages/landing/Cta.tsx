import { Link } from "react-router-dom";

export function Cta() {
  return (
    <section className="py-28 text-center">
      <div className="max-w-[1100px] mx-auto px-8">
        <h2
          className="text-[clamp(2rem,3.5vw,3.2rem)] font-bold text-white mb-4 leading-tight"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Start tracking your agents
        </h2>
        <p className="text-neutral-500 text-[15px] mb-9 max-w-[400px] mx-auto">
          Free tier available. No credit card required.
        </p>
        <div className="flex justify-center gap-3">
          <a
            href="#pricing"
            className="inline-flex items-center px-7 py-3 text-sm font-medium bg-white border border-white text-[#080808] hover:bg-neutral-200 hover:border-neutral-200 transition-colors"
          >
            Start free
          </a>
          <Link
            to="/docs"
            className="inline-flex items-center px-7 py-3 text-sm font-medium border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300 transition-colors"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
}
