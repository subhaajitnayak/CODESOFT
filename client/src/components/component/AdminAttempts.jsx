import { useEffect, useState } from 'react'
import Navbar from './Navbar'

const AdminAttempts = () => {
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAttempts()
  }, [])

  const fetchAttempts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/attempts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch attempts')
      const data = await response.json()
      setAttempts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className='bg-black w-full min-h-screen text-white'><Navbar /><div className='container mx-auto px-4 py-8'>Loading...</div></div>
  if (error) return <div className='bg-black w-full min-h-screen text-white'><Navbar /><div className='container mx-auto px-4 py-8'>Error: {error}</div></div>

  return (
    <div className='bg-black w-full min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Quiz Attempts</h1>
        <div className='overflow-x-auto'>
          <table className='w-full table-auto bg-gray-800 rounded-lg'>
            <thead>
              <tr className='bg-gray-700'>
                <th className='px-4 py-2'>User</th>
                <th className='px-4 py-2'>Score</th>
                <th className='px-4 py-2'>Total Questions</th>
                <th className='px-4 py-2'>Date</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map(attempt => (
                <tr key={attempt._id} className='border-t border-gray-600'>
                  <td className='px-4 py-2'>{attempt.user?.username || 'Unknown'}</td>
                  <td className='px-4 py-2'>{attempt.score}</td>
                  <td className='px-4 py-2'>{attempt.totalQuestions}</td>
                  <td className='px-4 py-2'>{new Date(attempt.attemptDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminAttempts
