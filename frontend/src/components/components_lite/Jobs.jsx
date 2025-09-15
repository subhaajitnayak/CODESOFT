import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Filter from "./Filter";
import Job from "./Job";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";
import Footer from "./Footer";


// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];



const Jobs = () => {
  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  useEffect(() => {
  if (searchedQuery) {
    const lowerQuery = searchedQuery.toLowerCase();

    const filtered = allJobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const description = job.description?.toLowerCase() || "";
      const location = job.location?.toLowerCase() || "";

      const experience = typeof job.experience === "string" 
        ? job.experience.toLowerCase() 
        : job.experience?.name?.toLowerCase() || "";

      const salary = job.salary?.toString().toLowerCase() || "";

      return (
        title.includes(lowerQuery) ||
        description.includes(lowerQuery) ||
        location.includes(lowerQuery) ||
        experience.includes(lowerQuery) ||
        salary.includes(lowerQuery)
      );
    });

    setFilteredJobs(filtered);
  } else {
    setFilteredJobs(allJobs);
  }
}, [allJobs, searchedQuery]);


  const isRecruiter = user?.role === "recruiter";

  return (
    
    <div>
      <Navbar />
      <div className="max-w-8xl mx-auto mt-5">
        {isRecruiter && (
          <div className="mb-5">
            <Link to="/post-job">
              <Button className="bg-red-600 hover:bg-red-500 text-white">
                Post a New Job
              </Button>
            </Link>
          </div>
        )}
        <div className="flex gap-5">
          <div className="w-15%">
            <Filter />
          </div>
          {
            filteredJobs.length <= 0 ? (
              <span>No Job Available</span>
            ) : (
              <div className="flex-1 h-[88vh] w-full overflow-y-auto pb-2">
                <motion.div 
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  exit={{opacity: 0, x: -100  }}
                className="grid grid-cols-3 gap-2">
                  {filteredJobs.map((job) => (
                    <Job key={job._id} job={job} />
                  ))}
                </motion.div>
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
