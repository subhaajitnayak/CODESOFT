import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchTextByJob } from "@/redux/jobSlice";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";


const AdminJobs = () => {
  useGetAllAdminJobs();

  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchTextByJob(input));

  },[input])

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-10">
          <Input className="w-fit " placeholder="Filter by Name" onChange={(e) => setInput(e.target.value)}></Input>
          <Button onClick = {()=>navigate("/admin/jobs/create")} className={'cursor-pointer bg-[#9112BC]'}>Post New Job</Button>
        </div>
        <div>
          <AdminJobTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
