import React from 'react';
import "../styles/main.css";

interface ScoreProps {
    homeScore: number;
    awayScore: number;
}

const Score: React.FC<ScoreProps> = ({ homeScore, awayScore }) => {
    return (
        <div className="score">
            <h1>{homeScore} - {awayScore}</h1>
        </div>
    );
};

export default Score;
