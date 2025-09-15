import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-[#FFFCB8] rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Privacy Policy
      </h1>

      <p className="text-gray-600 mb-4">
        This is the Privacy Policy page.
      </p>

      <p className="text-gray-600 mb-6">
        At <span className="font-semibold text-red-600">HiringDivision</span>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Information We Collect
      </h2>
      <p className="text-gray-600 mb-4">
        We may collect personal information such as your name, email address, phone number, and resume when you register on our site or apply for jobs. We also collect non-personal information such as browser type, IP address, and browsing behavior through cookies.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        How We Use Your Information
      </h2>
      <p className="text-gray-600 mb-4">
        Your personal information is used to provide you with job listings, communicate with you about job opportunities, and improve our services. We may also use your information for marketing purposes, but only with your consent.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Data Security
      </h2>
      <p className="text-gray-600 mb-4">
        We implement various security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet is completely secure.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Your Rights
      </h2>
      <p className="text-gray-600 mb-4">
        You have the right to access, update, or delete your personal information. You can also opt-out of receiving marketing communications from us at any time.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Changes to This Policy
      </h2>
      <p className="text-gray-600 mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Contact Us
      </h2>
      <p className="text-gray-600">
        If you have any questions or concerns about our Privacy Policy, please contact us at{" "}
        <a
          href="mailto:HiringDivision@example.com"
          className="text-red-600 hover:underline"
        >
          HiringDivision@example.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
