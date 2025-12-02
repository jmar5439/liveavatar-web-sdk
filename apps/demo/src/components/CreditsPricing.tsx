"use client";

interface CreditTier {
  name: string;
  creditsPerMinute: number;
  monthlyPrice: string;
  description: string;
  highlighted?: boolean;
}

const tiers: CreditTier[] = [
  {
    name: "Basic",
    creditsPerMinute: 2,
    monthlyPrice: "€70 / 500 credits",
    description: "Start experimenting with our avatars",
  },
  {
    name: "Pro",
    creditsPerMinute: 2,
    monthlyPrice: "€120 / 1000 credits",
    description: "Ideal for professionals and regular users",
    highlighted: true,
  },
  {
    name: "Enterprise",
    creditsPerMinute: 2,
    monthlyPrice: "Custom",
    description: "Tailored solutions for companies",
  },
];

export default function CreditsPricing() {
  const handleCheckout = async (tierName: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierName }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-4">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`border rounded-xl p-6 flex flex-col justify-between ${
            tier.highlighted
              ? "bg-indigo-600 text-white border-indigo-500"
              : "bg-zinc-800 border-zinc-700"
          }`}
        >
          <div>
            <h2 className="text-xl font-bold mb-2">{tier.name}</h2>
            <p className="text-sm mb-4">{tier.description}</p>
            <p className="text-lg font-semibold mb-2">{tier.monthlyPrice}</p>
            <p className="text-sm mb-4">
              Credits per minute: {tier.creditsPerMinute}
            </p>
          </div>
          <button
            onClick={() => handleCheckout(tier.name)}
            className={`mt-6 py-2 rounded font-semibold ${
              tier.highlighted
                ? "bg-white text-indigo-600 hover:bg-gray-200"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            Choose {tier.name}
          </button>
        </div>
      ))}
    </div>
  );
}
