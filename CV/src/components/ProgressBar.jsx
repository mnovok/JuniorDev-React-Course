const ProgressBar = ({ skillName, width }) => {
    return (
        <div className="skill">
            <span className="skillName">{skillName}</span>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${width}%` }}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
