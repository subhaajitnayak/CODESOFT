import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
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
import { Loader } from "lucide-react";

const JobDetail = ({ open, setOpen, job }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: job?.title || "",
    description: job?.description || "",
    location: job?.location || "",
    salary: job?.salary || "",
    companyId: job?.company?._id || "",
    position: job?.position || "",
    requirements: job?.requirements?.join(", ") || "",
    role: job?.jobType || "",
    experience: job?.experience || "",
    jobType: job?.jobType || "",
  });

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    if (value === "none") {
      setInput({ ...input, companyId: "" });
    } else {
      const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.title || !input.description || !input.location || input.salary === "" || !input.companyId || input.position === "" || !input.requirements || !input.experience || !input.jobType) {
      toast.error("All fields are required. Please fill in all fields and select a company.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_ENDPOINT}/${job._id}`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setOpen(false);
        // Optionally refresh the jobs list
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Job" : "Job Details"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the job details below." : "View job details. Click Edit to make changes."}
          </DialogDescription>
        </DialogHeader>

        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Title:</Label>
              <p>{job?.title}</p>
            </div>
            <div>
              <Label className="font-semibold">Description:</Label>
              <p>{job?.description}</p>
            </div>
            <div>
              <Label className="font-semibold">Location:</Label>
              <p>{job?.location}</p>
            </div>
            <div>
              <Label className="font-semibold">Salary:</Label>
              <p>{job?.salary} LPA</p>
            </div>
            <div>
              <Label className="font-semibold">Company:</Label>
              <p>{job?.company?.name}</p>
            </div>
            <div>
              <Label className="font-semibold">Position:</Label>
              <p>{job?.position} Vacancy</p>
            </div>
            <div>
              <Label className="font-semibold">Requirements:</Label>
              <p>{job?.requirements?.join(", ")}</p>
            </div>
            <div>
              <Label className="font-semibold">Job Type:</Label>
              <p>{job?.jobType}</p>
            </div>
            <div>
              <Label className="font-semibold">Experience:</Label>
              <p>{job?.experience}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Job Title"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  placeholder="Job Description"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Salary</Label>
                <Input
                  type="number"
                  placeholder="Salary"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  type="text"
                  placeholder="Position"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Requirements</Label>
                <Input
                  type="text"
                  placeholder="Requirements (comma separated)"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Job Type</Label>
                <Input
                  type="text"
                  placeholder="Job Type"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
              <div>
                <Label>Experience</Label>
                <Input
                  type="text"
                  placeholder="Experience"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <Label>Company</Label>
              {companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full hover:shadow-blue-600">
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
          </form>
        )}

        <DialogFooter>
          {!isEditing ? (
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button onClick={() => setIsEditing(true)} className={'bg-[#9112BC]'}>
                Edit
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={submitHandler} disabled={loading} className={'bg-[#9112BC]'}>
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetail;
