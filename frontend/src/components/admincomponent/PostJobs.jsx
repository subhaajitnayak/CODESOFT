import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../../utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";



const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    companyId: "",
    position: 0,
    requirements: "",
    role: "",
    experience: "",
    jobType: "",
  });

  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const selectChangeHandler = (value) => {
    if (value === "none") {
      setInput({...input, companyId: "" });
    } else {
      const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
      setInput({...input, companyId: selectedCompany._id });
    }
}

const submitHandler =async (e) => {
    e.preventDefault();
    //  Add validation and submit the form to the server
    if (!input.title || !input.description || !input.location || input.salary === "" || !input.companyId || input.position === "" || !input.requirements || !input.experience || !input.jobType) {
        toast.error("All fields are required. Please fill in all fields and select a company.");
        return;
    }
    try {
        setLoading(true);
        const res = await axios
        .post(`${JOB_API_ENDPOINT}/post`, input,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin/jobs");
        }else{
            toast.error(res.data.message);
            navigate(`/admin/jobs`);
        }
    } catch (error) {
        if(error.response && error.response.data){
            
        toast.error(error.response?.data?.message || "Failed to post job. Please try again.");
    } else{
        toast.error("An unexpected error occurred.");
    }
}
    finally{
        setLoading(false);
    }

  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
        onSubmit={submitHandler}
          action=""
          className="p-8 max-w-4xl border border-gray-500 shadow-sm hover:shadow-xl hover:shadow-blue-200 rounded-lg"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                placeholder="Enter job title "
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="Enter job description "
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                placeholder="Enter job location "
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                placeholder="Enter job salary "
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="number"
                placeholder="Enter job position "
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                placeholder="Enter job requirements "
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div>
            {/* <div>
              <Label>Role</Label>
              <Input
                type="text"
                placeholder="Enter job role "
                name="role"
                value={input.role}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div> */}
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                placeholder="Enter job experience "
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                placeholder="Enter job type "
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div>
            {/* <div>
              <Label>Company ID</Label>
              <Input
                type="text"
                placeholder="Enter company ID "
                name="companyId"
                value={input.companyId}
                onChange={changeEventHandler}
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-80 hover:shadow-blue-600"
                }
              />
            </div> */}
          </div>
          <div className="flex gap-5 items-center mt-6">
            <Label>Company</Label>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className={"w-full hover:shadow-blue-600"}>
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem>none</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company.name.toLowerCase()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              className="bg-[#9112BC] w-full  mt-8 text-white py-2 px-4 rounded-md hover:bg-blue-700"

            >
                {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              'Post Job'
            )}
              
            </Button>
          </div>
          {
            //creat a paragraph for saying that plase register a company if companyArray === 0
            // then render a link to company registration page
            companies.length === 0 && (
              <p className="text-center text-red-600 mt-4 font-medium ">
                *Please register a company first to post a job.*
              </p>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
