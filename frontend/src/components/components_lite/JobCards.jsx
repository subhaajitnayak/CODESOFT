import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { assets } from "@/assets/assets";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <motion.div className="p-5 rounded-md shadow-xl bg-[#ddd3da] border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-[#895ae7]" onClick={() => {
            navigate(`/Description/${job._id}`);
          }}
          initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  exit={{opacity: 0, y: -100  }}
          >
      <div className="flex gap-4">
        <Button className={"p-6 rounded-full"} variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo || assets.Google} className={'w-fit'}/>
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-semibold ">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-purple-700 font-bold"} variant={"ghost"}>
          {job?.position} Vacancy
        </Badge>
        <Badge className={"text-yellow-700 font-bold"} variant={"ghost"}>
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default JobCards;
