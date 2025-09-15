import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getQuestions } from '../../questions'
import Navbar from './Navbar'

const AdminCreateQuiz = () => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [answer, setAnswer] = useState(0)
  const [difficulty, setDifficulty] = useState('medium')

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!question.trim() || options.some(opt => !opt.trim())) {
      alert('Please fill all fields')
      return
    }
    const newQuestion = {
      id: Date.now(), // Add a unique ID
      question: question.trim(),
      options: options.map(opt => opt.trim()),
      answer: parseInt(answer),
      difficulty: difficulty
    }
    const currentQuestions = getQuestions()
    currentQuestions.push(newQuestion)
    localStorage.setItem('quizQuestions', JSON.stringify(currentQuestions))
    // Reset form
    setQuestion('')
    setOptions(['', '', '', ''])
    setAnswer(0)
    setDifficulty('medium')
    alert('Question added successfully!')
  }

  return (
    <div className='bg-black w-full min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className="flex justify-between items-center mb-6">
          <h1 className='text-3xl font-bold'>Create Quiz Question</h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/admin/manage-quiz"
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Manage Questions
            </Link>
          </motion.div>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-lg mb-2'>Question:</label>
            <input
              type='text'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className='w-full p-2 rounded bg-gray-800 text-white'
              required
            />
          </div>
          {options.map((option, index) => (
            <div key={index}>
              <label className='block text-lg mb-2'>Option {index + 1}:</label>
              <input
                type='text'
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className='w-full p-2 rounded bg-gray-800 text-white'
                required
              />
            </div>
          ))}
          <div>
            <label className='block text-lg mb-2'>Difficulty:</label>
            <div className="flex gap-6">
              {['easy', 'medium', 'hard'].map((level) => (
                <label key={level} className="flex items-center space-x-2 cursor-pointer text-lg">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={difficulty === level}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="h-4 w-4 accent-green-500"
                  />
                  <span className="capitalize">{level}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className='block text-lg mb-2'>Correct Answer:</label>
            <select
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className='w-full p-2 rounded bg-gray-800 text-white'
            >
              {options.map((_, index) => (
                <option key={index} value={index}>Option {index + 1}</option>
              ))}
            </select>
          </div>
          <motion.button
            type='submit'
            className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Question
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default AdminCreateQuiz
