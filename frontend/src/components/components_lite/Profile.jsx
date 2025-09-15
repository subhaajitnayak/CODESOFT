import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJobs from "./AppliedJobs";
import EditProfileModel from "./EditProfileModel";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import Footer from "./Footer";

const Profile = () => {
  useGetAllAppliedJobs();
  const { user } = useSelector((state) => state.auth);
  console.log("Profile component user.phoneNumber:", user?.phoneNumber);
  const isHaveResume = user?.profile?.resume ? true : false;

  const [open, setOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return "UN";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-400 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className={"cursor-pointer h-24 w-24"}>
              <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
              <AvatarFallback>{getInitials(user?.fullname)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname || "Full Name"}</h1>
              <p>
                {user?.profile?.bio || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatum, quod, quia, voluptates quae voluptatibus quas voluptatem quos nemo quod."}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className={"text-right"} variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className=""><a href={`mailto:${user?.email}`}>{user?.email || "email"}</a></span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className=""><a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber || "+91"}</a></span>
          </div>
        </div>
        <div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
              {user?.profile?.skills && user.profile.skills.length !== 0 ? (
                user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span>No skills added</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="font-bold text-md">Resume</label>
            {isHaveResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                download={user?.profile?.resumeOriginalName || "resume.pdf"}
                className="text-blue-500 hover:underline cursor-pointer"
                rel="noopener noreferrer"
              >
                {user?.profile?.resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <span className="text-red-600">No Resume Uploaded</span>
            )}
          </div>
        </div>
        
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="text-lg my-5 font-bold">Applied jobs</h1>
            {/** Appl job table */}
            <AppliedJobs />
        </div>
        {/** Edit profile model */}
        <EditProfileModel open = {open} setOpen = {setOpen} />
        <Footer />
    </div>
    
  );
};

export default Profile;
