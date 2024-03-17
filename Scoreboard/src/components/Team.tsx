import React from 'react';
import "../styles/main.css";

interface TeamProps {
    name: string;
    image: string;
}

const Team: React.FC<TeamProps> = ({ name, image }) => {
    return (
        <div className="teamWrapper">
            <img src={image} alt={name} width={150} height={150} />
            <h2>{name}</h2>
        </div>
    );
};

export default Team;