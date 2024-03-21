import "../styles/main.css";
import { ChangeEvent } from "react";
import { useFormContext } from "./FormContext";

const Address = () => {
    const { formData, updateAddress, updateName, updateCountry } = useFormContext();

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateName(e.target.value);
    };

    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        updateCountry(e.target.value);
    };

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateAddress({ address: e.target.value });
    };

    return (
        <div className="inputWrapper">
            <p className="labelLarge">Address</p>
            <label htmlFor="nameInput" className="label">Name</label>
            <input
                type="text"
                id="nameInput"
                value={formData.address.name}
                onChange={handleNameChange}
                className="inputField"
                maxLength={25}
            />
             <label htmlFor="addressInput" className="label">Address</label>
            <input
                type="text"
                id="addressInput"
                value={formData.address.address}
                onChange={handleAddressChange}
                className="inputField"
                maxLength={35}
            />
             <label htmlFor="countryInput" className="label">Country</label>
            <select
                id="countryInput"
                value={formData.address.country}
                onChange={handleCountryChange}
                className="inputField"
            >
                <option value="Croatia">Croatia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Germany">Germany</option>
                <option value="Australia">Australia</option>
            </select>
        </div>
    );
};

export default Address;
