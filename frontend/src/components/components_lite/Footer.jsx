import React from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      {/** generate a footer  for the current page */}
      <footer className="bg-gray-800 text-white py-6 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl text-[#F14A00] font-bold">Hiring<span className="text-[#9112BC]">Division</span></h1>
              <p className="text-sm">© 2024 HiringDivision. All rights reserved.</p>
              <p>
                Powered by <a href="">Subhajit Nayak</a>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
          <div>
            <div className="flex gap-4 mt-4">
              <Link
                to="/TermsConditions"
                className="text-gray-400 hover:text-blue-400"
              >
                Terms & Conditions
              </Link>{" "}
              |
              <Link to={"/Help"} className="text-gray-400 hover:text-blue-400">
                Help
              </Link>{" "}
              |
              <Link to={'/FAQ'} className="text-gray-400 hover:text-blue-400">
                FAQ
              </Link>{" "}
              |<Link to={"/PrivacyPolicy"} className="text-gray-400 hover:text-blue-400">Privacy Policy</Link> |
              <Link to={"/About"} className="text-gray-400 hover:text-blue-400">
                About
              </Link>
            </div>
            
            </div>
            <div className="flex gap-4 text-2xl text-gray-400">
                <FaInstagram className="hover:text-pink-500"/>
                <FaFacebook className="hover:text-blue-500"/>
                <FaLinkedinIn className="hover:text-blue-900"/>
                <FaWhatsapp className="hover:text-green-500"/>
                <FaTwitter className="hover:text-sky-500"/>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
