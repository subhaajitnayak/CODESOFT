import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { motion } from 'framer-motion'

const Home = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState('medium');

  const handleStartQuiz = () => {
      navigate('/Quiz', { state: { username: user?.username || 'Guest', difficulty } })
  }

  return (
    <div className='bg-black w-full min-h-screen'>
      <Navbar />
      <div className='container flex flex-col items-center justify-center text-center py-20 mt-10 gap-5 text-white'>
        <motion.h1
          className='title text-light font-bold text-5xl'
          whileHover={{
            rotateX: 10,
            rotateY: 10,
            scale: 1.05,
            textShadow: '0px 0px 8px rgba(255,255,255,0.8)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          Quiz Info
        </motion.h1>

        <ol className='text-gray-600'>
          <li>You will be asked 10 questions one after another.</li>
          <li>10 points is awarded for the correct answer.</li>
          <li>Each question has four options. You can choose only one option.</li>
          <li>You can review and change answers before the quiz finishes.</li>
          <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <div className="my-4">
          <h2 className="text-2xl font-semibold mb-3">Select Difficulty</h2>
          <div className="flex justify-center gap-6">
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

        <motion.button
          onClick={handleStartQuiz}
          className='btn bg-blue-500 text-white px-4 py-2 rounded'
          whileHover={{
            rotateX: 10,
            scale: 1.05,
            boxShadow: '0px 5px 15px rgba(0,0,255,0.4)',
          }}
          whileTap={{
            scale: 0.95,
            rotateX: -5,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          Start Quiz
        </motion.button>
      </div>
    </div>
  )
}

export default Home
