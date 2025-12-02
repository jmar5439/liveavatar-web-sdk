// app/components/Pricing.tsx
"use client";

interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Basic",
    price: "Free",
    description: "Limited features to get started",
    features: ["Access to basic avatars", "Limited usage per month"],
  },
  {
    name: "Pro",
    price: "$10/month",
    description: "Full access for professionals",
    features: ["All avatars unlocked", "Unlimited usage", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for companies",
    features: ["Custom avatars", "Dedicated support", "SLA guarantee"],
  },
];

export default function Pricing() {
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
            <p className="text-2xl font-semibold mb-4">{tier.price}</p>
            <ul className="space-y-2">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="before:content-['✓'] before:text-green-400 before:mr-2"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button
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
