import GeneralInfo from "./GeneralInfo";
import HeroSection from "./HeroSection";
import Abilities from "./Abilities";

const CV = () => {
    return(
        <div>
            <HeroSection/>
            <GeneralInfo/>
            <Abilities/>
        </div>
    );
};

export default CV;