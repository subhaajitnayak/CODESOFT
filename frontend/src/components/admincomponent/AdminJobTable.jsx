import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Delete, Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobDetail from "./JobDetail";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../../utils";
import { toast } from "sonner";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { MdDeleteForever } from "react-icons/md";

const AdminJobTable = () => {
  const { searchTextByJob } = useSelector((store) => store.job);
  const {allAdminJobs} = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (allAdminJobs) {
      const filtered = allAdminJobs.filter((job) => {
        if (!searchTextByJob || searchTextByJob === '') {
          return true;
        }
        return job?.title?.toLowerCase().includes(searchTextByJob.toLowerCase());
      });
      setFilterJobs(filtered);
    } else {
      setFilterJobs([]);
    }
  }, [allAdminJobs, searchTextByJob]);

  const handleDelete = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_ENDPOINT}/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        // Update the jobs list by removing the deleted job
        const updatedJobs = allAdminJobs.filter(job => job._id !== jobId);
        dispatch(setAllAdminJobs(updatedJobs));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job. Please try again.");
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  return (
    <div>
      <Table>
        <TableCaption>List of your recent posted jobs</TableCaption>
        {/* Add your table headers here */}
        <TableHeader>
          <TableRow>
            <TableHead>Company Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            
            
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="5">No Job Added</TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={job.company?.logo || ""} alt="company logo" />
                    <AvatarFallback>{job.company?.name ? job.company.name.charAt(0).toUpperCase() : "C"}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{job.company?.name || "N/A"}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                

                <TableCell className={"text-right"}>
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className={"w-32"}>
                      
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="cursor-pointer flex items-center gap-2 w-fit">
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                      <hr />
                      <div onClick={() => handleEdit(job)} className="cursor-pointer flex items-center gap-2 w-fit">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>

                      <hr />
                      <div onClick={() => handleDelete(job._id)} className="cursor-pointer flex items-center gap-2 w-fit">
                        <MdDeleteForever className="w-4" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {selectedJob && (
        <JobDetail open={open} setOpen={setOpen} job={selectedJob} />
      )}
    </div>
  );
};

export default AdminJobTable;
