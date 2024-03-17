import { useState, useEffect } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { IoIosPause } from "react-icons/io";
import { IoStopOutline } from "react-icons/io5";

interface TimerProps {
    setTimerValue: React.Dispatch<React.SetStateAction<number>>;
}

  const Timer: React.FC<TimerProps> = ({ setTimerValue  }) => {
    const currentDate = new Date();
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    useEffect(() => {
        let interval = 0;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 10;
                    setTimerValue(newTime);
                    return newTime;
                });
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerOn, setTimerValue]);

    return (
        <div className="timerWrapper">
            <h3>{formattedDate}</h3>
            <h4>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            </h4>
            <div>
                <button className="timerButton" onClick={() => setTimerOn(true)}>
                    <VscDebugStart />
                </button>
                <button className="timerButton" onClick={() => setTimerOn(false)}>   
                    <IoIosPause />
                </button>
                <button className="timerButton" onClick={() => setTime(0)}>
                    <IoStopOutline />
                </button>
            </div>
        </div>
    );
}


export default Timer;