import { FaHistory, FaPlusSquare, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const AdminDashboard = () => {
  return (
    <div className='bg-black w-full min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
              <FaPlusSquare />
              Manage Quizzes
            </h2>
            <p className='text-gray-300 mb-4'>Create, edit, and manage quiz questions.</p>
            <Link to="/admin/create-quiz" className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Create Quiz
            </Link>
          </div>
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
              <FaUsers />
              Manage Users
            </h2>
            <p className='text-gray-300 mb-4'>View and manage user accounts.</p>
            <Link to="/admin/users" className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              View Users
            </Link>
          </div>
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
              <FaHistory />
              View Attempts
            </h2>
            <p className='text-gray-300 mb-4'>Review quiz attempts and results.</p>
            <Link to="/admin/attempts" className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
              View Attempts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
