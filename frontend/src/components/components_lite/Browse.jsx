import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { setSearchQuery } from "../../redux/jobSlice";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Browse = () => {
  const { loading, error, allJobs } = useGetAllJobs();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.job.searchQuery);


  useEffect(() => {
  return () => {
    if (window.location.pathname !== "/browse") {
      dispatch(setSearchQuery(""));
    }
  };
}, [dispatch]);


  // if (window.location.pathname === "/brows") {
  //   window.location.pathname = "/browse";
  // }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl mb-2">Search Result for "{searchQuery || 'All Jobs'}" ({allJobs?.length ?? 0})</h1>
        {loading && <p>Loading jobs...</p>}
        {error && <p>Error loading jobs: {error}</p>}
        <motion.div 
        initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  exit={{opacity: 0, x: -100  }}
        className="grid grid-cols-3 gap-4">
          { allJobs?.map((job) => {
            return (
              <Job
                key={job._id}
                job={job}
                // onClick={() => navigate(`/job/${job._id}`)}
              />
            )
          }) }
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
