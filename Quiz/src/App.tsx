import './App.css';
import Start from './components/Start';
import Quiz from './components/Quiz';
import { useState } from 'react';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSettings, setQuizSettings] = useState({ category: '', difficulty: '', questionNumber: 0 });

  const handleStartQuiz = (category: string, difficulty: string, questionNumber: number) => {
    setQuizSettings({ category, difficulty, questionNumber });
    setQuizStarted(true);
    console.log("Starting quiz with:", category, difficulty, questionNumber);
  };

  return (
    <div className="app">
      {quizStarted ? (
        <Quiz quizSettings={quizSettings}/> 
      ) : (
        <Start onStartQuiz={handleStartQuiz} />
      )}
    </div>
  )
}

export default App;
