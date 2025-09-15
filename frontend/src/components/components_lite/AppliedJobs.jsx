import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { setAppliedJobs } from "../../redux/jobSlice";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../../utils";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const { appliedJobs } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);

  return (
    <div>
      <Table>
        <TableCaption>List of applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className={"text-right"}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length <= 0 ? <span>You have not applied any job yet.</span>
            // <TableRow>
            //   <TableCell colSpan={4} className="text-center">
            //     No applied jobs yet.
            //   </TableCell>
            // </TableRow>
           :
            appliedJobs.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{application.job?.title}</TableCell>
                <TableCell>{application.job?.company?.name}</TableCell>
                <TableCell className={"text-right"}>
                  <Badge className={`${application?.status === "rejected" ? 'bg-red-500' : application?.status === "pending" ? 'bg-yellow-500' : 'bg-green-500'}`}>
                    {application.status ? application.status.charAt(0).toUpperCase() + application.status.slice(1) : "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
