import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Herocontainer from './Herocontainer'
import Catagories from './Catagories'
import Latestjobs from './Latestjobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'

const Home = () => {
  const {loading, error, allJobs} = useGetAllJobs();
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.role === 'recruiter') {
      navigate("/admin/companies")
    }
  }, [user]);
  return (
    <div className='bg-white'>
      <Navbar />
      <Herocontainer />
      <Catagories />
      {loading && <Loader size={64} />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <Latestjobs jobs= {allJobs}/>}
      <Footer />
    </div>
  )
}

export default Home
