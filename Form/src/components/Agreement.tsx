import "../styles/main.css";
import { useFormContext } from "./FormContext";

const Agreement = () => {
    const { formData, updateAgreement } = useFormContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const acceptedValue = e.target.checked ? "Yes" : "No";
        updateAgreement({ accepted: acceptedValue });
    };

    return (
        <div className="inputWrapper">
            <div className="checkboxWrapper">
                <input
                    type="checkbox"
                    id="agreementInput"
                    checked={formData.agreement.accepted === "Yes"}
                    onChange={handleChange}
                    className="inputCheckbox"
                />
                <label htmlFor="agreementInput">I accept the terms of the order</label>
            </div>
        </div>
    );
};

export default Agreement;
