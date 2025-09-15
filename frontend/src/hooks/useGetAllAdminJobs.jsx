
import { setAllAdminJobs} from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_ENDPOINT } from '../../utils.js'


const useGetAllAdminJobs = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${JOB_API_ENDPOINT}/admin`, {
                // headers: {
                //     Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\\s*([^;]*).*$)|^.*$/, "$1")}`
                // },
                withCredentials: true,

            });
            if (res.data.success) {
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        finally {
            setLoading(false);
        }
    };
    fetchAllAdminJobs();
  }, [])
  return {loading, error};
}

export default useGetAllAdminJobs
