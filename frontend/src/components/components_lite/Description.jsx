import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../../../utils";
import { setSingleJob } from "../../redux/jobSlice";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { assets } from "@/assets/assets";

const Description = () => {
  const params = useParams();
  const jobId = params.id;
  console.log("Job Id in Description: ", jobId);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((state) => state.auth);

  const isInitiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error applying job:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    // if (!jobId) return; // Prevent API call if jobId is undefined or null
    const fetchSingleJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${JOB_API_ENDPOINT}/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.application?.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [dispatch, jobId, user?._id]);
  // return {loading, error};

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto my-10 text-center">
        Loading job details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto my-10 text-center text-red-500">
        Error loading job details. Please try again.
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between ">
          <div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                className="rounded-full w-12 h-12"
                src={singleJob?.company?.logo || assets.defaultCompanyLogo}
              />
              </Avatar>
              <h1 className="font-bold text-xl">
                {singleJob?.title || "loading..."}
              </h1>
            </div>

            <div className="flex gap-2 mt-4">
              <Badge className={"text-blue-500 font-bold"} variant={"ghost"}>
                {singleJob?.jobType}
              </Badge>

              <Badge className={"text-red-500 font-bold"} variant={"ghost"}>
                {singleJob?.location}
              </Badge>

              <Badge className={"text-purple-500 font-bold"} variant={"ghost"}>
                {singleJob?.position} Vacancy
              </Badge>

              <Badge className={"text-yellow-500 font-bold"} variant={"ghost"}>
                ${singleJob?.salary}
              </Badge>
            </div>
          </div>
          <div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#6b3ac2] hover:bg-[#4f2696] cursor-pointer"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
          {singleJob?.description}
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title || "loading..."}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experience} years
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Job Type:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.application?.length || "No Applicants yet"}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Post Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt
                ? new Date(singleJob.createdAt).toLocaleDateString()
                : "Loading..."}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Description;
