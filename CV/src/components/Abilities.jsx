import "../styles/abilities.css";
import ProgressBar from "./ProgressBar";

const Abilities = () => {
    return(
        <div className="abilities">
            <div className="abilitiesContainer">
                 <h1>Programming Skills</h1>

                <ProgressBar skillName="HTML" width={70}/>
                <ProgressBar skillName="CSS" width={65}/>
                <ProgressBar skillName="JS" width={55}/>
                <ProgressBar skillName="C" width={75}/>

            </div>
        </div>
    );
};

export default Abilities;