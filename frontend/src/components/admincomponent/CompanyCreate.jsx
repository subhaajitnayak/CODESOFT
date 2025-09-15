import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '../../../utils'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const [companyName, setCompanyName] = useState();
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to register a company.");
                return;
            }
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, {companyName, description},
                {headers:{
                   Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
                }, withCredentials: true,
            }

            );
            console.log(res.data);
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))  // Update the company in the Redux store for other components to use.
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}/`);
            }
            
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while registering the company.')
        }
    }

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
            <h1 className='font-bold text-2xl'>
            Company Name
        </h1>
        <p className='text-gray-600'>
            Create a new company profile and manage your job applications.
        </p>
        </div>
        <Label>Company Name</Label>
        <Input type={'text'} placeholder={'Your Company Name'} className={'my-2'} onChange = {(e)=> setCompanyName(e.target.value)}/>
        <Label>Description</Label>
        <Input type={'text'} placeholder={'Company Description'} className={'my-2'} onChange = {(e)=> setDescription(e.target.value)}/>
        <div className='flex items-center gap-2 my-10'>
            <Button variant={'outline'} onClick = {()=>navigate("/admin/companies")} className={'cursor-pointer '}>Cancle</Button>
            <Button onClick={registerNewCompany} className={'cursor-pointer bg-[#9112BC]'}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
