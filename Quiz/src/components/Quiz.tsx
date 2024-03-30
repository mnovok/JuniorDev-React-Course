import { useState, useEffect } from "react";
import "../styles/main.css";

interface QuizProps {
  quizSettings: { category: string; difficulty: string; questionNumber: number };
}

interface Question {
    question: string;
    correctAnswer: string;
    incorrentAnswers: string[];
}


const Quiz: React.FC<QuizProps> = ({ quizSettings }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [showAnswerResult, setShowAnswerResult] = useState<boolean>(false);

    useEffect(() => {
        async function fetchQuestions() {
          const url = `https://opentdb.com/api.php?amount=${quizSettings.questionNumber}&category=${quizSettings.category}&difficulty=${quizSettings.difficulty}&type=multiple`;
          const response = await fetch(url);
          const data = await response.json();
          setQuestions(data.results);
          setLoading(false);
        }
        fetchQuestions();
      }, [quizSettings.category, quizSettings.difficulty, quizSettings.questionNumber]);

      const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);
        setShowAnswerResult(true);
        if (answer === questions[currentQuestionIndex].correctAnswer) {
          setCorrectAnswersCount((prevCount) => prevCount + 1);
        }
      };
    
      const handleNextQuestion = () => {
        if (currentQuestionIndex < quizSettings.questionNumber - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setSelectedAnswer("");
          setShowAnswerResult(false);
        } else {
          // Quiz ends, you can handle end of quiz logic here
        }
      };

      const randomizeAnswerPosition = (correctAnswer: string, incorrectAnswers: string[]): string[] => {
        const randomizedAnswers = [...incorrectAnswers];
        const randomPosition = Math.floor(Math.random() * (randomizedAnswers.length + 1));
      
        randomizedAnswers.splice(randomPosition, 0, correctAnswer);
        
        return randomizedAnswers;
      };
      
  
      return (
        <div className="quizWrapper">
          <h2>Question {currentQuestionIndex + 1} of {quizSettings.questionNumber}</h2>
          <h3>{questions[currentQuestionIndex]?.question}</h3>
          <p>Total {correctAnswersCount}/{quizSettings.questionNumber}</p>
          <hr />
          <ul>
            {questions[currentQuestionIndex]?.incorrentAnswers.map((answer, index) => (
              <li key={index} onClick={() => handleAnswerSelection(answer)} style={{ cursor: "pointer", color: selectedAnswer === answer ? "red" : "black" }}>
                {answer}
              </li>
            ))}
            <li onClick={() => handleAnswerSelection(questions[currentQuestionIndex]?.correctAnswer)} style={{ cursor: "pointer", color: selectedAnswer === questions[currentQuestionIndex]?.correctAnswer ? "green" : "black" }}>
              {questions[currentQuestionIndex]?.correctAnswer}
            </li>
          </ul>
          {showAnswerResult && (
            <p>{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? "Correct!" : "Incorrect!"}</p>
          )}
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      );
      
};

export default Quiz;
