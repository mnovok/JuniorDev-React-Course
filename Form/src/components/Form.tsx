import "../styles/main.css";
import Contact from "./Contact";
import Address from "./Address";
import Bill from "./Bill";
import PaymentMethod from "./PaymentMethod";
import Agreement from "./Agreement";
import Button from "./Button";
import { FormProvider } from "./FormContext";

const Form = () => {

    return(
        <FormProvider>
            <div className="formWrapper">
                <form>
                    <div className="header">
                        <h3>Order →<span>Payment</span></h3>
                    </div>
                    <div className="inputsWrapper">
                        <Contact />
                        <Address />
                        <PaymentMethod />
                        <Agreement />
                        <Button />
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default Form;