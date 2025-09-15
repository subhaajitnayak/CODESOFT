import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../redux/authSlice'; // Please adjust the import path to your authSlice

const ProfilePage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [attempts, setAttempts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchAttempts = async () => {
        try {
          const res = await axios.get('/api/attempts', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAttempts(res.data);
        } catch (error) {
          console.error('Failed to fetch attempts', error);
        }
      };
      fetchAttempts();
    }
  }, [token]);

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action is permanent and cannot be undone.')) {
      try {
        await axios.delete(`/api/admin/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        alert('Your account has been successfully deleted.');
        // Dispatch logout, which should clear user/token from state and localStorage
        dispatch(logout());
        // Redirect to home page
        navigate('/');
      } catch (error) {
        console.error('Failed to delete account:', error);
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
        alert(`Failed to delete account: ${errorMessage}`);
      }
    }
  };

  if (!user) {
    return (
      <div className="bg-black w-full min-h-screen">
        {/* You can place your Navbar component here */}
        <div className="container flex flex-col items-center justify-center text-center py-20 mt-10 gap-5 text-white">
          <h1 className="text-4xl font-bold">User Profile</h1>
          <p>Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black w-full min-h-screen">
      {/* You can place your Navbar component here */}
      <div className="container flex flex-col items-center justify-center text-center py-20 mt-10 gap-5 text-white">
        <h1 className="text-4xl font-bold mb-8">User Profile</h1>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
            {user.image ? (
              <img
                src={`/uploads/${user.image}`}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center text-white text-2xl mb-4">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="text-2xl font-semibold">{user.username}</h2>
          </div>

          <div className="text-left space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <p className="text-lg">{user.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full mt-8">
          <h3 className="text-2xl font-semibold mb-4">Quiz Attempts</h3>
          {attempts.length === 0 ? (
            <p>No attempts found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 border border-gray-600 rounded">
                <thead className="bg-gray-600 text-gray-200">
                  <tr>
                    <th className="py-2 px-4 border-b">Attempt Date</th>
                    <th className="py-2 px-4 border-b">Quiz ID</th>
                    <th className="py-2 px-4 border-b">Score</th>
                    <th className="py-2 px-4 border-b">Correct</th>
                    <th className="py-2 px-4 border-b">Wrong</th>
                    <th className="py-2 px-4 border-b">Total Questions</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr key={attempt._id} className="text-center border-b border-gray-600 hover:bg-gray-500">
                      <td className="py-2 px-4">{new Date(attempt.attemptDate).toLocaleString()}</td>
                      <td className="py-2 px-4">{attempt.quizId}</td>
                      <td className="py-2 px-4">{attempt.score}</td>
                      <td className="py-2 px-4">{attempt.correctCount}</td>
                      <td className="py-2 px-4">{attempt.wrongCount}</td>
                      <td className="py-2 px-4">{attempt.totalQuestions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-red-900 bg-opacity-50 border border-red-700 p-8 rounded-lg shadow-lg max-w-md w-full mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-red-300">Danger Zone</h3>
            <p className="text-red-200 mb-4">Deleting your account is a permanent action and cannot be undone. All your data, including quiz attempts, will be removed.</p>
            <motion.button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Delete My Account
            </motion.button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;