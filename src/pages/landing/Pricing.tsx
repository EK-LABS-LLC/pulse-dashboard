import { useState } from "react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/ mo",
    desc: "For individuals and side projects exploring LLM observability.",
    features: ["10,000 traces / month", "1 project", "7-day retention", "Community support"],
    cta: "Get started",
    featured: false,
    action: "signup",
  },
  {
    name: "Pro",
    price: "$49",
    period: "/ mo",
    desc: "For teams building production LLM applications.",
    features: [
      "500,000 traces / month",
      "Unlimited projects",
      "30-day retention",
      "Priority support",
      "Usage-based overages",
    ],
    cta: "Start free trial",
    featured: true,
    action: "checkout",
    priceId: "price_pro_monthly",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations with compliance, scale, or deployment needs.",
    features: [
      "Unlimited traces",
      "SSO & RBAC",
      "Custom retention",
      "Private region deployment",
      "Dedicated support",
    ],
    cta: "Contact sales",
    featured: false,
    action: "contact",
  },
];

export function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const res = await fetch("/dashboard/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // If not authenticated, redirect to login
      window.location.href = "/login";
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-24 border-b border-neutral-800">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="max-w-[560px] mb-14">
          <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-4">
            Pricing
          </div>
          <h2
            className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
          >
            Start free, scale when ready
          </h2>
          <p className="text-neutral-500 text-[15px] leading-relaxed">
            Simple, transparent pricing that scales with your usage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-8 border border-neutral-800 -mr-px flex flex-col transition-colors hover:border-neutral-700 ${
                tier.featured ? "bg-[#111111] border-neutral-700" : ""
              }`}
            >
              <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-4">
                {tier.name}
              </div>
              <div
                className="mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
              >
                <span className="text-[2.8rem] font-bold text-white">{tier.price}</span>
                {tier.period && <span className="text-sm text-neutral-600"> {tier.period}</span>}
              </div>
              <p className="text-sm text-neutral-500 mb-7 pb-7 border-b border-neutral-800">
                {tier.desc}
              </p>
              <ul className="flex-1 flex flex-col gap-3 mb-8">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="text-sm text-neutral-500 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-neutral-600"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              {tier.action === "signup" && (
                <Link
                  to="/login"
                  className="w-full text-center py-2 text-[13px] font-medium border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300 transition-colors"
                >
                  {tier.cta}
                </Link>
              )}
              {tier.action === "checkout" && (
                <button
                  onClick={() => handleCheckout(tier.priceId!)}
                  disabled={loading === tier.priceId}
                  className="w-full py-2 text-[13px] font-medium bg-white border border-white text-[#080808] hover:bg-neutral-200 hover:border-neutral-200 transition-colors disabled:opacity-50"
                >
                  {loading === tier.priceId ? "Loading..." : tier.cta}
                </button>
              )}
              {tier.action === "contact" && (
                <button className="w-full py-2 text-[13px] font-medium border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300 transition-colors">
                  {tier.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
