import "../styles/main.css";
import { useState } from "react";
import Team from "./Team";
import chelseaImage from "../assets/chelsea.png"; 
import valenciaImage from "../assets/valencia.png"; 
import Score from "./Score";
import Button from "./Button";
import Timer from "./Timer";

const Scoreboard = () => {
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [timerValue, setTimerValue] = useState(0);
    const [goalEvents, setGoalEvents] = useState<string[]>([]);
  
    function reduceHomeScore() {
      if (homeScore !== 0) {
        setHomeScore(homeScore - 1);
      }
    }

    function reduceAwayScore() {
      if (awayScore !== 0) {
        setAwayScore(awayScore - 1);
      }
    }

    function reset() {
      setHomeScore(0);
      setAwayScore(0);
      setGoalEvents([]);
    }

    function formatTime(time: number) {
        const minutes = Math.floor(time / 60000);
        const formattedMinutes = ("0" + minutes).slice(-2);
        return formattedMinutes;
    }

    const handleGoal = (team: string, timerValue: number) => {
        const newScore: number = team === "home" ? homeScore + 1 : awayScore + 1;
        const newGoalEvent: string = `${team === "home" ? newScore : homeScore}-${
            team === "away" ? newScore : awayScore
        } ${formatTime(timerValue)}'`;
        setGoalEvents([...goalEvents, newGoalEvent]);
        team === "home" ? setHomeScore(newScore) : setAwayScore(newScore);
    };

    return(
        <div className="scoreboardContainer">

        {homeScore !== 0 || awayScore !== 0 ? (
                <div className="goalEvents">
                    <h3>GOALS</h3>
                    <div className="goalEventsList">
                        <ul>
                            {goalEvents.map((event, index) => (
                                <li key={index}>{event}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : null}

            <div className="mainWrapper">
                <Timer setTimerValue={setTimerValue}/>

                <div className="teamContainer">
                    <Team name="Chelsea" image={chelseaImage} />
                    <Score homeScore={homeScore} awayScore={awayScore}/>
                    <Team name="Valencia" image={valenciaImage} />
                </div>

                <div className="buttonWrapper">
                    <Button sign="+" action={() => handleGoal("home", timerValue)}/>
                    <Button sign="-" action={reduceHomeScore}/>
                    <Button sign="+" action={() => handleGoal("away", timerValue)}/>
                    <Button sign="-" action={reduceAwayScore}/>
                </div>
    
                <Button sign="RESET" action={reset} />
            </div>
        </div>
    );
};

export default Scoreboard;
