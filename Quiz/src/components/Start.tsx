import { useState, useEffect } from "react";
import "../styles/main.css";

interface Category {
    id: number;
    name: string;
}

interface Props {
    onStartQuiz: (category: string, difficulty: string, questionNumber: number) => void;
  }

const Start: React.FC<Props> = (props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("9"); // defaultno general knowledge
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("easy"); // defaultno easy
    const [selectedQuestionNumber, setSelectedQuestionNumber] = useState<number>(5); // defaultno 5 pitanja
    
    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
        .then((response) => response.json())
        .then((data) => {
          const categories: Category[] = data.trivia_categories; //id i name kategorije
          setCategories(categories);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    }
  
    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDifficulty(event.target.value);
    }
  
    const handleQuestionNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setSelectedQuestionNumber(value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        props.onStartQuiz(selectedCategory, selectedDifficulty, selectedQuestionNumber);
    }

    return (
        <div className="startWrapper">
            <h1>It's Quiz o'clock!</h1>
            <h3>Please choose the settings for the game</h3>
            <div className="formWrapper">
                <form onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            className="selectStart"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
    
                    <div className="inputGroup">
                        <label htmlFor="difficulty">Difficulty</label>
                        <select
                            id="difficulty"
                            className="selectStart"
                            value={selectedDifficulty}
                            onChange={handleDifficultyChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
    
                    <div className="inputGroup">
                        <label htmlFor="questionNumber">Number of Questions</label>
                        <input
                            id="questionNumber"
                            type="range"
                            className="rangeStart"
                            value={selectedQuestionNumber}
                            onChange={handleQuestionNumberChange}
                            min={5}
                            max={30}
                        />
                        <span>{selectedQuestionNumber}</span>
                    </div>
                    <button className="buttonStart" type="submit">
                        Start
                    </button>
                </form>
            </div>
        </div>
    );    
};

export default Start;