import "../styles/main.css";
import { useFormContext } from "./FormContext";

const Contact = () => {
    const { formData, updateContact } = useFormContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.includes("@")) {
          updateContact({ email: value });
        } else {
        
          updateContact({ email: value });
        }
    };

    return (
        <div className="inputWrapper">
            <p className="labelLarge">Contact</p>
            <input
                type="email"
                id="emailInput"
                value={formData.contact.email}
                onChange={handleChange}
                className="inputField"
                placeholder="Email"
                autoFocus
            />
        </div>
    );
};

export default Contact;
