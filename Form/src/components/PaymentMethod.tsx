import "../styles/main.css";
import { useFormContext } from "./FormContext";

const PaymentMethod = () => {
    const { formData, updatePayment } = useFormContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updatePayment({ method: e.target.value });
    };

    return (
        <div className="inputWrapper">
            <p className="labelLarge" id="paymentTitle">Method of Payment</p>
            <div className="radioGroup">
                <label className="radioLabel">
                    <input
                        type="radio"
                        value="Cash on Delivery"
                        checked={formData.payment.method === "Cash on Delivery"}
                        onChange={handleChange}
                    />
                    Cash on Delivery
                </label>
            </div>
            <div className="radioGroup">
                <label className="radioLabel">
                    <input
                        type="radio"
                        value="Credit Card"
                        checked={formData.payment.method === "Credit Card"}
                        onChange={handleChange}
                    />
                    Credit Card
                </label>
            </div>
        </div>
    );
};

export default PaymentMethod;
