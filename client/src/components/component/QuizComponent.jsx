import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQuestions } from '../../questions'
import Navbar from './Navbar'

const QuizComponent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { username, difficulty } = location.state || { difficulty: 'medium' }

  const questions = useMemo(() => {
    const allQuestions = getQuestions();
    
    const filteredByDifficulty = allQuestions.filter(
      (q) => (q.difficulty || 'medium') === difficulty
    );

    // Shuffle and take 10 questions
    const shuffled = filteredByDifficulty.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, [difficulty]);

  useEffect(() => {
    if (questions.length === 0 && difficulty) {
      alert(`No questions found for '${difficulty}' difficulty. Redirecting to home.`);
      navigate('/');
    }
  }, [questions, difficulty, navigate]);

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft > 0 && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (questions.length > 0) {
      handleSubmit()
    }
  }, [timeLeft, questions]);

  useEffect(() => {
    setSelectedAnswers(Array(questions.length).fill(null));
    setCurrentIndex(0);
  }, [questions]);

  const handleOptionChange = (optionIndex) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentIndex] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = () => {
    let totalScore = 0
    let correctCount = 0
    let wrongCount = 0
    selectedAnswers.forEach((selectedIndex, questionIndex) => {
      if (selectedIndex !== null) {
        const correctAnswerIndex = questions[questionIndex].answer;
        if (selectedIndex === correctAnswerIndex) {
          totalScore += 10
          correctCount++
        } else {
          wrongCount++
        }
      }
    })
    const attempted = selectedAnswers.filter(a => a !== null).length
    const totalQuestions = questions.length
    navigate('/Result', { state: { username, score: totalScore, correctCount, wrongCount, attempted, totalQuestions, difficulty } })
  }

  if (questions.length === 0) {
    return (
      <div className='bg-black w-full min-h-screen text-white'>
        <Navbar />
        <div className='container mx-auto px-4 py-8 text-center'>
          <h2 className='text-2xl font-bold'>Loading questions...</h2>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className='bg-black w-full min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-around items-center mb-4'>
          <h2 className='text-2xl font-bold'>Question {currentIndex + 1} of {questions.length}</h2>
          <div className='text-xl font-bold'>
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <p className='text-lg mb-6'>{currentQuestion.question}</p>
        <div className='mb-6'>
          {currentQuestion.options.map((option, index) => (
            <label key={index} className='block mb-2'>
              <input
                type='radio'
                name='option'
                value={index}
                checked={selectedAnswers[currentIndex] === index}
                onChange={() => handleOptionChange(index)}
                className='mr-2'
              />
              {option}
            </label>
          ))}
        </div>
        <div className='flex justify-between'>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
          >
            Previous
          </button>
          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizComponent
