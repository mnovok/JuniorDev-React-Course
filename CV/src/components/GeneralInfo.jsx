import "../styles/general.css"

const GeneralInfo = () => {
    return (
        <div className="general">
            <div className="titleContainer">
                <a href="#bottom"><h2>⇓</h2></a>
                <h1>General Information</h1>
            </div>
            <div className="infoContainer">
                <h2>Location:</h2>
                <span>Split, Croatia</span>
                <h2>Age:</h2>
                <span>22</span>
                <h2>Hobbies:</h2>
                <span>drawing, translating</span>
            </div>
            <div id="bottom"></div>
        </div>
    );
};

export default GeneralInfo;