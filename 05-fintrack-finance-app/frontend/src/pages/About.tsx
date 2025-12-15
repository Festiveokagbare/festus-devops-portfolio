import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChartLine, FaLock, FaHandsHelping, FaUserFriends } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-5xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About FinTrack
        </motion.h1>

        {/* Section 1: What is FinTrack */}
        <section className="mb-12">
          <motion.h2 className="text-2xl font-bold mb-4 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <FaChartLine className="text-blue-600" /> What is FinTrack?
          </motion.h2>
          <motion.p className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            FinTrack is a modern personal finance platform designed to help individuals, families, and small business owners take full control of their financial lives. Built with simplicity, security, and intelligence in mind, FinTrack provides a comprehensive suite of tools to track spending, set financial goals, manage budgets, and build better money habits—all in one seamless dashboard.
          </motion.p>
        </section>

        {/* Section 2: Our Mission */}
        <section className="mb-12">
          <motion.h2 className="text-2xl font-bold mb-4 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <FaHandsHelping className="text-green-600" /> Our Mission
          </motion.h2>
          <motion.p className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Our mission is to <strong>empower people from all walks of life</strong> to make smarter financial decisions with confidence and ease. Whether you're planning a monthly budget, saving for a future goal, analyzing spending trends, or preparing for retirement, FinTrack gives you clear visibility and actionable insights into your finances.
          </motion.p>
        </section>

        {/* Section 3: Simplicity & Approachability */}
        <section className="mb-12">
          <motion.h2 className="text-2xl font-bold mb-4 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Simplicity & Approachability
          </motion.h2>
          <motion.p className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          FinTrack was born from a simple realization: managing money shouldn’t be complicated. Traditional budgeting apps often feel overwhelming or disconnected from users’ real-world challenges. That’s why we designed FinTrack to be intuitive, customizable, and approachable—even for those who don’t consider themselves “good with money.”
          </motion.p>
        </section>

        {/* Section 4: Analytics Engine */}
        <section className="mb-12">
          <motion.h2 className="text-2xl font-bold mb-4 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
             Smart Financial Analytics
          </motion.h2>
          <motion.p className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            At the heart of FinTrack is its <strong>smart analytics engine</strong>, which transforms raw financial data into digestible charts, trends, and personalized recommendations. Users can monitor income, categorize expenses, set savings targets, and receive alerts on unusual spending—all in real time.
          </motion.p>
        </section>

        {/* Section 5: Security Focus */}
        <section className="mb-12">
          <motion.h2 className="text-2xl font-bold mb-4 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <FaLock className="text-purple-600" /> Security & Privacy
          </motion.h2>
          <motion.p className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            We take <strong>security and privacy</strong> seriously. Your data is encrypted end-to-end, and we adhere to strict industry standards. You're always in control of your data, and it will never be shared without your permission.
          </motion.p>
        </section>

        {/* Section 6: Our Community */}
        <section className="mb-12">
          <motion.h2 className="text-2xl font-bold mb-4 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <FaUserFriends className="text-pink-600" /> A Growing Community
          </motion.h2>
          <motion.p className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            FinTrack is more than a tool—it’s a global movement toward financial wellness. From students managing limited funds to entrepreneurs building businesses, FinTrack adapts to your lifestyle and financial goals.
          </motion.p>
        </section>

        {/* Quote Block */}
        <motion.blockquote
          className="bg-indigo-100 border-l-4 border-indigo-500 italic text-indigo-900 p-6 rounded shadow mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          "With FinTrack, I stopped guessing and started growing. It’s like having a financial advisor in my pocket." — Adebayo O., Lagos
        </motion.blockquote>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center mt-10">
          <Link to="/team" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Meet the Team
          </Link>
          <Link to="/careers" className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Careers
          </Link>
        </div>
      </div>
    </div>
  );
}