import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../utils.js";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { updateApplicantProfile } from "@/redux/applicationSlice";
import { Loader, Loader2 } from "lucide-react";

const EditProfileModel = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const {user} = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills.join(",") || "",
    resume: null,
    profilePhoto: null,
    phoneNumberFile: null,
  });

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.name.trim() || !input.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", input.name);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phone);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if(input.resume && input.resume instanceof File) {
      formData.append("resume", input.resume);
    }
    if(input.profilePhoto && input.profilePhoto instanceof File) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
          // Update applicant profile in applicationSlice to reflect resume change in ApplicantsTable
          dispatch(updateApplicantProfile({ userId: res.data.user._id, profile: res.data.user.profile }));
          toast.success(res.data.message);
          setOpen(false);
        }

      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Network error occurred");

      } finally {
        setLoading(false);
      }
  }

  const profilePhotoChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, profilePhoto: file });
  }

  const resumeChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, resume: file });
  }

  const phoneNumberFileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, phoneNumberFile: file });
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className={"sm:max-w-[425px]"}
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information including name, email, contact details, bio, skills, and resume.
            </DialogDescription>
          </DialogHeader>
          {/* form for editinf profile  */}
          <form onSubmit={handleSubmit} action="">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <input
                  type="text"
                  id="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  name="name"
                  placeholder="John Doe"
                  className="col-span-3 border border-gray-300 rounded-md p-1"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <input
                  type="email"
                  id="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  name="email"
                  placeholder="johndoe@example.com"
                  className="col-span-3 border border-gray-300 rounded-md p-1"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="contact" className="text-right">
                  Contact No.
                </Label>
                <input
                  type="tel"
                  id="contact"
                  value={input.phone}
                  onChange={changeEventHandler}
                  name="phone"
                  placeholder="+1234567890"
                  className="col-span-3 border border-gray-300 rounded-md p-1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  name="bio"
                  placeholder="Tell us about yourself..."
                  className="col-span-3 border border-gray-300 rounded-md p-1"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <textarea
                  id="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  name="skills"
                  placeholder="e.g., JavaScript, React, Node.js (comma separated)"
                  className="col-span-3 border border-gray-300 rounded-md p-1"
                  rows="2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="profilePhoto" className="text-right">
                  Profile Photo
                </Label>
                <div className="col-span-3">
                  {user?.profile?.profilePhoto && (
                    <div className="mb-2">
                      <img
                        src={user?.profile?.profilePhoto}
                        alt="Current Profile Photo"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    id="profilePhoto"
                    onChange={profilePhotoChangeHandler}
                    name="profilePhoto"
                    accept="image/*"
                    className="border border-gray-300 rounded-md p-1 w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="resume" className="text-right">
                  Resume
                </Label>
                <div className="col-span-3">
                  {user?.profile?.resume && (
                    <div className="mb-2">
                      <a
                        target="_blank"
                        href={user?.profile?.resume}
                        download={user?.profile?.resumeOriginalName || "resume.pdf"}
                        className="text-blue-500 hover:underline cursor-pointer"
                        rel="noopener noreferrer"
                      >
                        {user?.profile?.resumeOriginalName || "View Current Resume"}
                      </a>
                    </div>
                  )}
                  <input
                    type="file"
                    id="resume"
                    onChange={resumeChangeHandler}
                    name="resume"
                    accept="application/pdf"
                    className="border border-gray-300 rounded-md p-1 w-full"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className={"w-full my-4"}>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </Button>
              ) : (
                <button
                  type="submit"
                  className="block w-full py-3 my-3 text-white bg-red-600 hover:bg-red-500 rounded-md"
                >
                  Save
                </button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileModel;
