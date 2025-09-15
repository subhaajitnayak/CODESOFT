import React from 'react';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-[#FFFCB8] shadow-md rounded-2xl text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Terms and Conditions
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">1. Introduction</h2>
      <p>
        Welcome to our HiringDivision website. These Terms and Conditions ("Terms") govern your use of
        our website and services. By accessing or using our platform, you agree to be bound by these
        Terms. If you do not agree to these Terms, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">2. Acceptance of Terms</h2>
      <p>
        By creating an account, accessing, or using our HiringDivision, you acknowledge that you have
        read, understood, and agree to be bound by these Terms and our Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">3. Description of Service</h2>
      <p>Our HiringDivision provides a platform for:</p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Job seekers to search and apply for job opportunities</li>
        <li>Employers to post job listings and find qualified candidates</li>
        <li>Connecting job seekers with potential employers</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">4. User Accounts</h2>
      <p>To use certain features of our platform, you must create an account. You are responsible for:</p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>All activities that occur under your account</li>
        <li>Providing accurate and up-to-date information</li>
        <li>Notifying us immediately of any unauthorized use</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">5. User Conduct</h2>
      <p>You agree not to:</p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Use the platform for any illegal or unauthorized purpose</li>
        <li>Post false, misleading, or discriminatory content</li>
        <li>Harass, abuse, or harm other users</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Use automated tools to access the platform without permission</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">6. Job Postings and Applications</h2>
      <h3 className="text-lg font-semibold text-indigo-600 mt-4 mb-1">For Employers:</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>You must provide accurate job descriptions and requirements</li>
        <li>You are responsible for the content of your job postings</li>
        <li>You agree to comply with all applicable employment laws</li>
      </ul>

      <h3 className="text-lg font-semibold text-indigo-600 mt-4 mb-1">For Job Seekers:</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>You must provide truthful information in your applications and profiles</li>
        <li>You are responsible for the accuracy of your resume and application materials</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">7. Intellectual Property</h2>
      <p>
        All content on our platform, including text, graphics, logos, and software, is owned by us
        or our licensors and is protected by intellectual property laws. You may not reproduce,
        distribute, or create derivative works without our written permission.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">8. Privacy</h2>
      <p>
        Your privacy is important to us. Please review our Privacy Policy, which explains how we
        collect, use, and protect your personal information.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">9. Disclaimers</h2>
      <p>Our platform is provided "as is" without warranties of any kind. We do not guarantee:</p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>The accuracy or completeness of job listings</li>
        <li>The suitability of candidates for positions</li>
        <li>The success of job placements</li>
        <li>Uninterrupted or error-free service</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">10. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
        special, or consequential damages arising from your use of our platform.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">11. Indemnification</h2>
      <p>
        You agree to indemnify and hold us harmless from any claims, damages, or expenses arising
        from your use of our platform or violation of these Terms.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">12. Termination</h2>
      <p>
        We reserve the right to terminate or suspend your account at any time for violations of
        these Terms. You may also terminate your account at any time.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">13. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of [Your
        Jurisdiction], without regard to its conflict of law provisions.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">14. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of any changes by posting
        the new Terms on our website. Your continued use of our platform after such changes
        constitutes acceptance of the new Terms.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">15. Contact Information</h2>
      <p>
        If you have any questions about these Terms, please contact us at:
      </p>
      <p className="bg-gray-100 p-4 rounded-md border mt-2">
        <span className="block"><strong>Email:</strong> jobbord@hiringdivision.com</span>
        <span className="block"><strong>Address:</strong> Bengaluru,india</span>
        <span className="block"><strong>Phone:</strong> +91-3849289384</span>
      </p>

      <p className="mt-6 text-center text-gray-600">
        By using our HiringDivision, you acknowledge that you have read and understood these Terms and
        Conditions.
      </p>
    </div>
  );
};

export default TermsConditions;
