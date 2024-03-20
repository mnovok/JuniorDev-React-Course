import "../styles/main.css";
import { useState, ChangeEvent } from "react";

const Address = () => {
    const [firstName, setFirstname] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstname(e.target.value);
    };

    return (
        <div className="inputWrapper">
            <p className="labelLarge">Address</p>
            <label htmlFor="firstNameInput" className="label">First name</label>
            <input
                type="text"
                id="firstNameInput"
                value={firstName}
                onChange={handleChange}
                className="inputField"
                maxLength={20}
            />
        </div>
    );
};

export default Address;
