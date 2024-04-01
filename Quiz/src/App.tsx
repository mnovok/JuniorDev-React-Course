import './App.css';
import Start from './components/Start';
import Quiz from './components/Quiz';
import { useState } from 'react';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSettings, setQuizSettings] = useState({ category: '', difficulty: '', questionNumber: 0 });
  const [displayStartScreen, setDisplayStartScreen] = useState(true);

  const handleStartQuiz = (category: string, difficulty: string, questionNumber: number) => {
    setQuizSettings({ category, difficulty, questionNumber });
    setQuizStarted(true);
    setDisplayStartScreen(false);
    console.log("Starting quiz with:", category, difficulty, questionNumber);
  };

  const handleDisplayStartScreen = () => {
    setDisplayStartScreen(true);
    setQuizStarted(false);
  };

  return (
    <div className="app">
    {displayStartScreen ? (
      <Start onStartQuiz={handleStartQuiz} />
    ) : (
      <Quiz quizSettings={quizSettings} goBackToStart={handleDisplayStartScreen} />
    )}
  </div>
  )
}

export default App;
