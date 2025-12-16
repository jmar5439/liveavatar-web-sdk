// app/app-pages/credits/page.tsx
import CreditsPricing from "../../../src/components/CreditsPricing";

export default function CreditsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Credits</h1>
      <p className="text-zinc-300">
        Here you can see your available credits, usage history, and detailed
        information about each credit type.
      </p>

      {/* Example: show credits and pricing */}
      <section className="bg-zinc-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Your Credits</h2>
        <p className="mb-4">
          You currently have <span className="font-bold">120 credits</span>{" "}
          available.
        </p>
        <CreditsPricing />
      </section>
    </div>
  );
}
