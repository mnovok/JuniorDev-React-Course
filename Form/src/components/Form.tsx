import "../styles/main.css";
import Contact from "./Contact";
import Address from "./Address";
import Bill from "./Bill";
import { FormProvider } from "./FormContext";

const Form = () => {

    return(
        <FormProvider>
            <div className="formWrapper">
                <form>
                    <div className="header">
                        <h3>Order --<span>Payment</span></h3>
                    </div>
                    <div className="inputsWrapper">
                        <Contact />
                        <Address />
                        <Bill />
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default Form;