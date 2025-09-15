import React, { useEffect } from 'react'
import Navbar from '../components_lite/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom';
import { APPLICATION_API_ENDPOINT } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicants } from '@/redux/applicationSlice'

const Applicants = () => {

  const params = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await fetch(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {
          credentials: 'include',
        })
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        dispatch(setApplicants(data.job));
        console.log(data.job);
      } catch (error) {

        console.error('Error fetching applicants:', error)
      }
    }
    fetchAllApplicants();
  },[params.id]);
  

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-10'>Applicants {applicants?.application?.length}</h1>
        {/* Applicants List */}
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants
