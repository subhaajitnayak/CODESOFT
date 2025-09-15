import { setAllJobs } from '../redux/jobSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_API_ENDPOINT } from '../../utils.js';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // get the search query from redux
  const searchQuery = useSelector(store => store.job.searchQuery);
  const allJobs = useSelector(store => store.job.allJobs);

  const getToken = () => {
    return localStorage.getItem("token") ||
      document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
  };

  useEffect(() => {
    // always fetch (even for empty query) — backend should handle empty keyword
    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        // console.log("[useGetAllJobs] searchQuery:", JSON.stringify(searchQuery));
        const token = getToken();
        const res = await axios.get(`${JOB_API_ENDPOINT}/get?keywords=${encodeURIComponent(searchQuery || "")}`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        console.log("[useGetAllJobs] response:", res.data);
        if (res.data && res.data.success) {
          dispatch(setAllJobs(res.data.jobs || []));
        } else {
          dispatch(setAllJobs([]));
          setError(res.data?.message || "Failed to fetch jobs");
        }
      } catch (err) {
        console.error("[useGetAllJobs] error:", err);
        setError(err.response?.data?.message || err.message || "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [searchQuery, dispatch]); // runs when searchQuery changes

  return { loading, error, allJobs };
};

export default useGetAllJobs;
