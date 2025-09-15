import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_ENDPOINT} from '../../utils.js'
import { setCompanies } from '@/redux/companySlice.js'

const useGetAllCompanies = () => {
 
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
                // headers: {
                //     Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\\s*([^;]*).*$)|^.*$/, "$1")}`
                // },
                withCredentials: true,

            });
            if (res.data.success) {
                dispatch(setCompanies(res.data.companies));
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        finally {
            setLoading(false);
        }
    };
    fetchCompany();
  }, [dispatch]);
  return {loading, error};
}



export default useGetAllCompanies
