import React from "react";
import JobCards from "./JobCards";

const Latestjobs = ({ jobs }) => {
  const jobsToDisplay = jobs || [];

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">Latest & Top <span className="text-[#9112BC]"> Job Openings</span></h1>
      {/** job cards */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {
          jobsToDisplay.length <= 0 ?( <span>No Job Available</span> ):( jobsToDisplay.slice(0,6).map((job) => (
            <JobCards key={job._id} job={job}></JobCards>
          )))
        }
      </div>
    </div>
  )
};

export default Latestjobs;
