import React from "react";

const About = () => {
  return (
    <div className="w-full mx-auto px-6 py-12 text-gray-800 bg-[#FFFCB8]">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
        About Hiring Division
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Welcome to <span className="font-semibold">Hiring Division</span>, your trusted platform 
        for connecting job seekers with employers. We aim to simplify the hiring process 
        by providing a user-friendly and effective job board.
      </p>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Our Mission</h2>
          <p>
            To empower job seekers with opportunities and enable employers to find 
            the right talent. We strive to bridge the gap between ambition and 
            opportunity with fairness, efficiency, and trust.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Our Vision</h2>
          <p>
            To become the leading job platform where millions of professionals 
            connect with companies to shape the future of work across industries.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Why Choose Hiring Division?
        </h2>
        <ul className="grid md:grid-cols-2 gap-6 list-disc list-inside">
          <li>
            <span className="font-semibold">For Job Seekers:</span> Access 
            thousands of job postings, create resumes, and apply in just a few clicks.
          </li>
          <li>
            <span className="font-semibold">For Employers:</span> Post jobs, 
            manage applications, and hire faster with our advanced tools.
          </li>
          <li>
            <span className="font-semibold">User-Friendly Design:</span> Simple, 
            modern, and mobile-friendly interface for all users.
          </li>
          <li>
            <span className="font-semibold">Secure & Reliable:</span> We prioritize 
            your data security and ensure a trusted hiring process.
          </li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-4">
          Have questions, suggestions, or partnership ideas? We’d love to hear from you!
        </p>
        <p className="bg-gray-100 p-4 rounded-lg inline-block text-left">
          <span className="block"><strong>Email:</strong> support@hiringdivision.com</span>
          <span className="block"><strong>Address:</strong> Bengluru,india</span>
          <span className="block"><strong>Phone:</strong> +91-9876543210</span>
        </p>
      </div>
    </div>
  );
};

export default About;
