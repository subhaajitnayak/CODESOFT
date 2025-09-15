import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const ResultComponent = () => {
  const location = useLocation()
  const { score, correctCount, wrongCount, attempted, totalQuestions, difficulty } = location.state || {}
  const { user, token } = useSelector((state) => state.auth);

  // Save attempt to DB
  useEffect(() => {
    if (user && token && location.state) {
      const saveAttempt = async () => {
        try {
          const attemptData = {
            score,
            correctCount,
            wrongCount,
            totalQuestions,
            quizId: difficulty || 'general'
          };
          await axios.post('/api/attempts', attemptData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (error) {
          console.error('Failed to save attempt', error);
        }
      };
      saveAttempt();
    }
  }, [user, token, score, correctCount, wrongCount, totalQuestions, difficulty]);

  return (
    <div className='bg-black w-full min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-4xl font-bold mb-4'>Quiz Results</h1>
        <p className='text-xl mb-2'>Username: {user?.username || "Guest"}</p>
        <p className='text-2xl mb-6'>Your Score: {score} / {totalQuestions ? totalQuestions * 10 : 100}</p>

        <div className='mb-6'>
          <table className='mx-auto border-collapse border border-gray-400'>
            <thead>
              <tr>
                <th className='border border-gray-400 px-4 py-2'>Metric</th>
                <th className='border border-gray-400 px-4 py-2'>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-gray-400 px-4 py-2'>Total Questions</td>
                <td className='border border-gray-400 px-4 py-2'>{totalQuestions}</td>
              </tr>
              <tr>
                <td className='border border-gray-400 px-4 py-2'>Total Attempts</td>
                <td className='border border-gray-400 px-4 py-2'>{attempted}</td>
              </tr>
              <tr>
                <td className='border border-gray-400 px-4 py-2'>Total Correct Answers</td>
                <td className='border border-gray-400 px-4 py-2'>{correctCount}</td>
              </tr>
              <tr>
                <td className='border border-gray-400 px-4 py-2'>Total Wrong Answers</td>
                <td className='border border-gray-400 px-4 py-2'>{wrongCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='mb-4'>
          {score >= (totalQuestions ? totalQuestions * 10 * 0.7 : 70) ? (
            <p className='text-green-400 text-lg'>Congratulations! You passed the quiz.</p>
          ) : (
            <p className='text-red-400 text-lg'>Better luck next time!</p>
          )}
        </div>

        <Link to='/' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Take Another Quiz
        </Link>
      </div>
    </div>
  )
}

export default ResultComponent
