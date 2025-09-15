import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading') // 'loading', 'success', 'error'
  const [error, setError] = useState('')
  const [promotingId, setPromotingId] = useState(null)

  const fetchUsers = useCallback(async () => {
    setStatus('loading')
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsers(response.data)
      setStatus('success')
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch users'
      setError(errorMessage)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const promoteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to promote ${username} to admin?`)) {
      return
    }
    setPromotingId(userId)
    try {
      const token = localStorage.getItem('token')
      await axios.put(`/api/admin/users/${userId}/promote`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      alert('User promoted to admin')
      fetchUsers() // Refresh the list
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to promote user'
      alert(errorMessage)
    } finally {
      setPromotingId(null)
    }
  }

  if (status === 'loading') return <div className='bg-black w-full min-h-screen text-white'><Navbar /><div className='container mx-auto px-4 py-8'>Loading...</div></div>
  if (status === 'error') return <div className='bg-black w-full min-h-screen text-white'><Navbar /><div className='container mx-auto px-4 py-8'>Error: {error}</div></div>

  return (
    <div className='bg-black w-full min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Manage Users</h1>
        <div className='overflow-x-auto'>
          <table className='w-full table-auto bg-gray-800 rounded-lg'>
            <thead>
              <tr className='bg-gray-700'>
                <th className='px-4 py-2'>Username</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Admin</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className='border-t border-gray-600'>
                  <td className='px-4 py-2'>{user.username}</td>
                  <td className='px-4 py-2'>{user.email}</td>
                  <td className='px-4 py-2'>{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td className='px-4 py-2'>
                    {!user.isAdmin && (
                      <button
                        onClick={() => promoteUser(user._id, user.username)}
                        className='bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={promotingId === user._id}
                      >
                        {promotingId === user._id ? 'Promoting...' : 'Promote'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
