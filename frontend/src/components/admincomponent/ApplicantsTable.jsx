import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { updateApplicationStatus } from '../../redux/applicationSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '../../../utils'

const sortListingStatus = ["accepted", "pending", "rejected"]
const ApplicantsTable = () => {

  const {applicants} = useSelector((store) => store.application);
  const dispatch = useDispatch();

  console.log('Applicants data:', applicants);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.put(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, {status})
      console.log(res);
      if (res.data.success) {
        dispatch(updateApplicationStatus({ id, status }));
        toast.success(`Application status updated to ${status}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.message || 'Failed to update status');
    }

  }
  return (
    <div>
      <Table>
        <TableCaption>List of applied applicants</TableCaption>
        {/* Add your table headers here */}
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>appliedon</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {
              applicants?.application?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.job?.company?.name || 'N/A'}</TableCell>
                  <TableCell>{item?.job?.title || 'N/A'}</TableCell>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <a className='text-blue-600 cursor-pointer' href={item.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                    ) : (
                      <span>No Resume</span>
                    )}
                  </TableCell>
                  <TableCell className={'text-right'}>
                    <Popover>
                      <PopoverTrigger className='cursor-pointer'>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className={'w-32'}>
                        {sortListingStatus.map((status, index) => (
                          <div key={index} className="cursor-pointer flex items-center gap-2 w-fit">
                            <input
                              type="radio"
                              name={`status-${item._id}`}
                              value={status}
                              checked={item.status === status}
                              onChange={(e) => statusHandler(e.target.value, item._id)}
                              className='cursor-pointer'
                            />
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable




