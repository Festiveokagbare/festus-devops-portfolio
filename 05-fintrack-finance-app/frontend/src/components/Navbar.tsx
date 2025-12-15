// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-black">FinTrack</Link>

        <div className="md:hidden">
          <button
            className="text-indigo-600 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 text-gray-800 font-semibold">
          <li><Link to="/" className="hover:text-green-500">Home</Link></li>
          <li><Link to="/features" className="hover:text-green-500">Features</Link></li>
          <li><Link to="/about" className="hover:text-green-500">About</Link></li>
          <li><Link to="/contact" className="hover:text-green-500">Contact</Link></li>
          <Link to="/team" className="hover:text-green-500">Team</Link>
          <Link to="/careers" className="hover:text-green-500">Careers</Link>
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-2 text-gray-800 font-semibold">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/features" onClick={() => setIsOpen(false)}>Features</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
