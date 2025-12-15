// src/pages/Careers.tsx
import { motion } from "framer-motion";

export default function Careers() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Careers at FinTrack
        </motion.h1>

        <p className="mb-4 text-lg text-center">
          Join a team that's transforming personal finance. We're looking for mission-driven, curious minds who want to build the future of money management.
        </p>

        <div className="bg-white p-6 rounded shadow mt-8">
          <h2 className="text-2xl font-semibold mb-4">Open Roles</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Frontend Developer</strong> – React, Tailwind CSS, Framer Motion</li>
            <li><strong>Content Creator</strong> – Financial storytelling and social content</li>
            <li><strong>Data Analyst</strong> – Product insights and user behavior</li>
          </ul>

          <p className="mt-6">Interested? Email your resume to <a href="mailto:careers@fintrack.app" className="text-blue-600 underline">careers@fintrack.app</a></p>
        </div>
      </div>
    </div>
  );
}