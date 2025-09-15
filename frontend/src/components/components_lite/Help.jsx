import React from "react";

const Help = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
        Help & Support
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Welcome to the <span className="font-semibold">Hiring Division Help Center</span>.  
        Here you’ll find answers to common questions and guidance to make the most 
        out of our platform. If you still need help, feel free to contact us.
      </p>

      {/* FAQ Section */}
      <div className="space-y-8">
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            How do I create an account?
          </h2>
          <p>
            To create an account, click on the <strong>Sign Up</strong> button on the 
            top right, fill in your details, and verify your email. You’ll then be 
            able to log in and start using Hiring Division.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            How do I apply for a job?
          </h2>
          <p>
            Once logged in, go to the <strong>Jobs</strong> section, search or browse 
            available opportunities, and click <strong>Apply</strong> on the listing 
            you’re interested in.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            How can employers post jobs?
          </h2>
          <p>
            Employers can post jobs by logging into their account, navigating to the 
            <strong> Post a Job</strong> section, and filling out job details such as 
            title, description, requirements, and salary.
          </p>
        </div>

        
      </div>

      {/* Contact Support */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Still Need Help?</h2>
        <p className="text-gray-600 mb-4">
          If your question isn’t covered above, our support team is here to assist you.
        </p>
        <p className="bg-gray-100 p-4 rounded-lg inline-block text-left">
          <span className="block"><strong>Email:</strong> support@hiringdivision.com</span>
          <span className="block"><strong>Phone:</strong> +91-9876543210</span>
          <span className="block"><strong>Working Hours:</strong> Mon–Fri, 9 AM – 6 PM</span>
        </p>
      </div>
    </div>
  );
};

export default Help;
