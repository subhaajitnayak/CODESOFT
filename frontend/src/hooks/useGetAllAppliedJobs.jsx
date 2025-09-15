import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "../../utils";
import { setAllAppliedJobs } from "@/redux/jobSlice";

const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
                
            } catch (error) {
                console.error(error);
            }
        }
        fetchAppliedJobs();
    }, [dispatch]);
    return null;
};


export default useGetAllAppliedJobs;