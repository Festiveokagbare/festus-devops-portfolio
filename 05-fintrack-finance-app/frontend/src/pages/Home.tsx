import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../assets/finance-hero.svg";
import backgroundFinance from "../assets/background-finance.svg";
import ajoImage from "../assets/ajo.png";
import cooperativeImage from "../assets/cooperative.png";
import businessImage from "../assets/business.png";
import TipsCarousel from "../components/TipsCarousel";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data Submitted:", formData);
  };

  const GroupCTA = ({ title, to }: { title: string; to: string }) => (
    <div className="mt-6">
      <Link
        to={to}
        className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
      >
        Join {title} Now
      </Link>
    </div>
  );

  return (
    <div className="font-poppins text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white min-h-screen flex flex-col items-center justify-center px-4 pt-24 text-center overflow-hidden">
        <img
          src={backgroundFinance}
          alt="Finance Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 blur-md z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 z-0" />

        <motion.div style={{ scale, opacity }} className="z-10 flex flex-col items-center">
          <motion.img
            src={heroImage}
            alt="Finance Hero"
            className="w-40 mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            FinTrack: Smarter Finance for Everyone
          </motion.h1>

          <motion.p
            className="text-base md:text-lg mb-4 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Track expenses, grow savings, and plan your financial future, all in one beautiful dashboard.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 z-10">
            <Link
              to="/login"
              className="bg-black hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full font-medium shadow transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-black hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full font-medium shadow transition"
            >
              Register
            </Link>
          </div>

          <TipsCarousel />

          <a href="#signup">
            <motion.button
              className="bg-green-800 text-white px-6 py-3 mt-8 rounded-full font-semibold shadow hover:bg-green-600 transition border-2 border-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.button>
          </a>
        </motion.div>
      </section>

      {/* Ajo Contribution Section */}
      <motion.section
        className="py-20 px-4 bg-white flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img src={ajoImage} alt="Ajo Contribution" className="w-full md:w-1/2 rounded-lg shadow" />
        <div>
          <h2 className="text-2xl font-bold mb-4">Ajo Contribution (Thrift)</h2>
          <p className="text-gray-700 text-lg">
            Join a group where members contribute regularly and receive the collective fund in turns. A trusted savings system that promotes discipline and helps you build capital.
          </p>
          <GroupCTA title="Ajo Contribution" to="/register" />
        </div>
      </motion.section>

      {/* Cooperative Society Section */}
      <motion.section
        className="py-20 px-4 bg-gray-100 flex flex-col md:flex-row-reverse items-center gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img src={cooperativeImage} alt="Cooperative Society" className="w-full md:w-1/2 rounded-lg shadow" />
        <div>
          <h2 className="text-2xl font-bold mb-4">Cooperative Society</h2>
          <p className="text-gray-700 text-lg">
            Save and access loans at affordable rates. FinTrack lets you manage cooperative contributions and track member benefits all in one platform.
          </p>
          <GroupCTA title="Cooperative Society" to="/register" />
        </div>
      </motion.section>

      {/* Business Partnership Section */}
      <motion.section
        className="py-20 px-4 bg-white flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img src={businessImage} alt="Business Partnership" className="w-full md:w-1/2 rounded-lg shadow" />
        <div>
          <h2 className="text-2xl font-bold mb-4">Business Partnership</h2>
          <p className="text-gray-700 text-lg">
            Collaborate with trusted partners to fund and run small businesses. Easily manage investments, track profits, and communicate securely within the group.
          </p>
          <GroupCTA title="Business Partnership" to="/register" />
        </div>
      </motion.section>

      {/* Loan Application Section */}
      <motion.section
        className="py-20 px-4 bg-gray-100 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-4">Need a Loan to Grow?</h2>
        <p className="text-gray-700 text-lg mb-6">
          Apply for personal or business loans through our partner banks with flexible repayment options. Empower your goals with the right financial support.
        </p>
        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        >
          Apply for a Loan
        </Link>
      </motion.section>

      {/* Help & Support Section */}
      <motion.section className="py-20 px-4 bg-white text-center max-w-4xl mx-auto" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}>
       <h2 className="text-3xl font-bold mb-4">Need Help or Support?</h2>
       <p className="text-gray-700 text-lg mb-6">
         Our support team is available to assist you with any inquiries, technical issues, or feedback.
         Reach out and we'll respond as quickly as possible.
       </p>
       <Link to="/contact" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
         Contact Support
       </Link>
     </motion.section>

      {/* Sign Up Form Section */}
      <section id="signup" className="py-20 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Sign Up to Get Started</h2>
        <p className="mb-6 text-gray-600 max-w-xl mx-auto">
          Create your free FinTrack account today and start managing your money smarter.
        </p>
        <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded"
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-800"
          >
            Sign Up for Free
          </button>
        </form>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-red-50 border-t border-red-200 py-8 px-4 text-sm text-red-800 text-center">
        <p className="italic">
          Disclaimer: All financial activities done through FinTrack such as contributions, partnerships, and loans
          are based on mutual trust among members. FinTrack will not be held liable for any loss incurred.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center text-sm">
        &copy; {new Date().getFullYear()} FinTrack Inc. All rights reserved.
      </footer>
    </div>
  );
}