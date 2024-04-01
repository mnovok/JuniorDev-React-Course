import { useState, useEffect } from "react";
import "../styles/main.css";

interface QuizProps {
  quizSettings: { category: string; difficulty: string; questionNumber: number };
  goBackToStart: () => void;
}

interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}


const Quiz: React.FC<QuizProps> = ({ quizSettings, goBackToStart  }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [showAnswerResult, setShowAnswerResult] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const url = `https://opentdb.com/api.php?amount=${quizSettings.questionNumber}&category=${quizSettings.category}&difficulty=${quizSettings.difficulty}&type=multiple`;
                const response = await fetch(url);
                const data = await response.json();
                console.log("Response Code:", data.response_code);
                if (data.response_code === 0) { //API 
                  setQuestions(data.results.map((question: Question) => ({
                    ...question,
                    incorrect_answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
                  })));
                    setLoading(false);
                } else {
                    setError("API request failed: " + data.response_code);
                }
            } catch (error) {
                setError("Failed to fetch data: " + (error as Error).message);
            }
        }

        const delay = 5000; // kasnjenje od 5 sekundi radi API-ja
        const timer = setTimeout(fetchQuestions, delay);
    
        return () => clearTimeout(timer);
    }, [quizSettings.category, quizSettings.difficulty, quizSettings.questionNumber]);

    const handleAnswerSelection = (answer: string) => {
      if (!selectedAnswer) {
        setSelectedAnswer(answer);
        setShowAnswerResult(true);
        if (answer === questions[currentQuestionIndex].correct_answer) {
          setCorrectAnswersCount((prevCount) => prevCount + 1);
        }     
      }
    };

    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const handleNextQuestion = () => {
      setSelectedAnswer("");
      setShowAnswerResult(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePlayAgain = () => {
      // setCorrectAnswersCount(0);
      // setCurrentQuestionIndex(0);
      // setSelectedAnswer("");
      // setShowAnswerResult(false);
      // setLoading(true);
      // setError(null);
      goBackToStart();
    };

    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (currentQuestionIndex < questions.length || loading) {
        return (
          <div className="quizWrapper">
              <h2>Question {currentQuestionIndex + 1} of {quizSettings.questionNumber}</h2>
              {loading ? (
                  <p>Loading...</p>
              ) : (
              <>
              <h3>{questions[currentQuestionIndex]?.question}</h3>
              <p id="total">Total {correctAnswersCount}/{quizSettings.questionNumber}</p>
              <hr />

              <ul>
              {questions[currentQuestionIndex]?.incorrect_answers.map((answer, index) => (
                <li
                  key={index}
                  onClick={() => handleAnswerSelection(answer)}
                  style={{
                    cursor: "pointer",
                    color:
                    selectedAnswer === answer
                      ? answer === questions[currentQuestionIndex].correct_answer
                        ? "green" 
                        : "red" 
                        : "black", 
                  }}
                >
                  {answer}
                </li>
              ))}
              </ul>

            {showAnswerResult && (
              <p>
                {selectedAnswer === questions[currentQuestionIndex].correct_answer
                  ? "Correct!"
                  : "Incorrect!"}
              </p>
            )}
            
            <button onClick={handleNextQuestion}>Next</button>
                  </>
              )}
          </div>
        );
    }
    else {
      return (
        <div className="quizWrapper">
          <h2 id="restart">You got {correctAnswersCount} out of {quizSettings.questionNumber} correct.</h2>
          <button onClick={handlePlayAgain}>Play again</button>
        </div>
      );
    }   
};



export default Quiz;
