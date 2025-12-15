// src/pages/Features.tsx
export default function Features() {
  return (
    <div className="min-h-screen py-20 px-4 bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-10">FinTrack Features</h1>
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Budget Management</h2>
          <p>Track your expenses, categorize spending, and set monthly goals.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Smart Analytics</h2>
          <p>Visualize financial health with real-time dashboards and AI insights.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Security & Privacy</h2>
          <p>Bank-grade encryption and strict data protection policies.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Reports</h2>
          <p>Download monthly reports to plan ahead or file your taxes.</p>
        </div>
      </div>
    </div>
  );
}