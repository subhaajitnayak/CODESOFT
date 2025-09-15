import React, { useState } from "react";

const faqs = [
  {
    question: "What is Hiring Division?",
    answer:
      "Hiring Division is an online platform that connects job seekers with employers. Candidates can search and apply for jobs, while employers can post listings and find the right talent.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click on the Sign Up button, enter your details, verify your email, and log in to start using Hiring Division.",
  },
  {
    question: "Is Hiring Division free to use?",
    answer:
      "Yes! Job seekers can browse and apply for jobs free of charge. Employers may have free and premium options for posting job listings.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on the Forgot Password link on the login page, enter your email, and follow the instructions sent to your inbox.",
  },
  {
    question: "How do employers post jobs?",
    answer:
      "Employers need to sign in, navigate to the Post a Job section, and fill in job details such as title, description, and requirements.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
        Frequently Asked Questions
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Find quick answers to the most common questions about{" "}
        <span className="font-semibold">Hiring Division</span>.  
        If you don’t see your question here, feel free to contact us.
      </p>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center px-4 py-3 font-medium text-gray-700"
            >
              {faq.question}
              <span className="text-indigo-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">
          Still Have Questions?
        </h2>
        <p className="text-gray-600 mb-4">
          Our support team is here to help you with any queries.
        </p>
        <p className="bg-gray-100 p-4 rounded-lg inline-block text-left">
          <span className="block">
            <strong>Email:</strong> support@hiringdivision.com
          </span>
          <span className="block">
            <strong>Phone:</strong> +91-9876543210
          </span>
          <span className="block">
            <strong>Working Hours:</strong> Mon–Fri, 9 AM – 6 PM
          </span>
        </p>
      </div>
    </div>
  );
};

export default FAQ;
