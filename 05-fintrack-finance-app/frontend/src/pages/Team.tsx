import { motion } from "framer-motion";
import festusImg from "../assets/team/festus.jpg";
import chiomaImg from "../assets/team/chioma.jpg";
import davidImg from "../assets/team/david.jpg";

export default function Team() {
  // 👉 Place it here
  const teamMembers = [
    {
      name: "Festus Okagbare",
      role: "CEO & Product Lead",
      image: festusImg,
    },
    {
      name: "Chioma Nwachukwu",
      role: "Financial Manager/Analyst",
      image: chiomaImg,
    },
    {
      name: "David Ogunleye",
      role: "Marketing Manager",
      image: davidImg,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet the FinTrack Team
        </motion.h1>

        <p className="mb-6 text-lg text-center">
          Our leadership team brings together deep expertise in product development, financial strategy, and marketing to deliver innovative, user-friendly solutions that drive financial empowerment.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 rounded-lg shadow p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
