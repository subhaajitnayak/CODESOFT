

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_ENDPOINT} from '../../utils.js'
import { setSingleCompany } from '@/redux/companySlice.js'

const useGetCompanyById = (companyId) => {
 
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleCompany = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
                // headers: {
                //     Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\\s*([^;]*).*$)|^.*$/, "$1")}`
                // },
                withCredentials: true,

            });
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        finally {
            setLoading(false);
        }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
  return {loading, error};
}




export default useGetCompanyById
