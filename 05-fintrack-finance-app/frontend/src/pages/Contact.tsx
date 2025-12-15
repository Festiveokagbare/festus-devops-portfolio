// src/pages/Contact.tsx
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission (use Formspree, EmailJS, etc. in production)
    console.log("Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-white text-gray-900">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={5}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-800"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 text-lg font-semibold">
            ✅ Message sent! We'll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
}
