import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { assets } from "@/assets/assets";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Handle case when job data is not available
  // if (!job) {
  //   return (
  //     <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
  //       <div className="text-center text-gray-500">
  //         <p>Job data not available</p>
  //       </div>
  //     </div>
  //   );
  // }
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const diffTime = currentTime - createdAt;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md w-1xl
     shadow-xl bg-[#ddd3da] border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-purple-400">
      <div className="flex items-center justify-between">
        {" "}
        <p className="text-gray-500">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className={"rounded-full cursor-pointer"}
          size="icon"
        >
          <Bookmark />{" "}
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className={"p-6 rounded-full"} variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo || assets.Google} />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-semibold ">
            {job?.company?.name || "Company Name"}
          </h1>
          <p className="text-sm text-gray-500">{job?.location || "Location"}</p>
        </div>
      </div>
      <div>
        <div>
          <h1 className="font-bold text-lg my-2">{job?.title || "Job Title"}</h1>
          <p className="text-sm text-gray-500">
            {job.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatem, quod, quia, voluptates quae voluptatibus quas voluptatem quos nemo quod."}
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Badge className={"text-blue-500 font-bold"} variant={"ghost"}>
            {job?.jobType || "Fulltime"}
          </Badge>
          <Badge className={"text-red-500 font-bold"} variant={"ghost"}>
            {job?.location || "Remote"}
          </Badge>
          <Badge className={"text-purple-500 font-bold"} variant={"ghost"}>
            {job?.position || "Vacancy"} vavancy
          </Badge>
          <Badge className={"text-yellow-500 font-bold"} variant={"ghost"}>
            {job?.salary || "Salary"} LPA
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <Button
          onClick={() => {
            navigate(`/Description/${job._id}`);
          }}
          className={"rounded-sm  font-bold cursor-pointer"}
          variant="outline"
        >
          Details
        </Button>
        <Button
          className={
            "rounded-sm bg-[#6b3a62] text-white font-bold cursor-pointer"
          }
          variant="outline"
        >
          {" "}
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
