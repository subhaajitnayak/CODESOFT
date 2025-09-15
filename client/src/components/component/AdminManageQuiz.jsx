import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getQuestions } from '../../questions'
import Navbar from './Navbar'

const AdminManageQuiz = () => {
  const [questions, setQuestions] = useState([])
  const [difficultyFilter, setDifficultyFilter] = useState('all')

  useEffect(() => {
    setQuestions(getQuestions())
  }, [])

  const filteredQuestions = useMemo(() => {
    if (difficultyFilter === 'all') {
      return questions
    }
    return questions.filter(q => (q.difficulty || 'medium') === difficultyFilter)
  }, [questions, difficultyFilter])

  const handleDelete = (questionToDelete) => {
    if (window.confirm(`Are you sure you want to delete this question?\n\n"${questionToDelete.question}"`)) {
      let updatedQuestions;
      // Prefer deleting by a unique ID if it exists
      if (questionToDelete.id) {
        updatedQuestions = questions.filter(q => q.id !== questionToDelete.id);
      } else {
        // Fallback for older questions without an ID. This is safer than filtering by text.
        const indexToDelete = questions.findIndex(q => q === questionToDelete);
        if (indexToDelete > -1) {
          updatedQuestions = [...questions];
          updatedQuestions.splice(indexToDelete, 1);
        } else {
          // Should not happen if the question object is from the state
          return;
        }
      }
      localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
      setQuestions(updatedQuestions);
      alert('Question deleted successfully!');
    }
  }

  return (
    <div className='bg-black w-full min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className="flex justify-between items-center mb-6">
          <h1 className='text-3xl font-bold'>Manage Quiz Questions</h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/admin/create-quiz"
              className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Create New Question
            </Link>
          </motion.div>
        </div>

        <div className='mb-6'>
          <label className='block text-lg mb-2'>Filter by Difficulty:</label>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className='w-full md:w-1/4 p-2 rounded bg-gray-800 text-white'
          >
            <option value='all'>All</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>

        <div className='space-y-6'>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, index) => (
              <div key={q.id || index} className='bg-gray-800 p-4 rounded-lg border border-gray-700'>
                <div className="flex justify-between items-start">
                  <p className='text-xl font-semibold mb-2 pr-4'>Q: {q.question}</p>
                  <motion.button
                    onClick={() => handleDelete(q)}
                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm flex-shrink-0'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Delete
                  </motion.button>
                </div>
                <p className='text-sm text-gray-400 mb-2'>Difficulty: <span className='capitalize font-medium text-gray-300'>{q.difficulty || 'Medium'}</span></p>
                <ul className='list-disc list-inside mb-3 pl-2'>
                  {q.options.map((opt, i) => (
                    <li key={i} className={`${i === q.answer ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                      {opt} {i === q.answer && <span className='text-green-500'> (Correct Answer)</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No questions found for the selected difficulty.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminManageQuiz