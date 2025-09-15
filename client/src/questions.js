const defaultQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
    answer: 0
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    answer: 1
  },
  {
    question: "What year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    answer: 1
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
    answer: 1
  },
  {
    question: "What is the square root of 16?",
    options: ["2", "4", "6", "8"],
    answer: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    answer: 2
  }
];

export const getQuestions = () => {
  const stored = localStorage.getItem('quizQuestions');
  if (stored) {
    return JSON.parse(stored);
  } else {
    localStorage.setItem('quizQuestions', JSON.stringify(defaultQuestions));
    return defaultQuestions;
  }
};
