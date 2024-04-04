import axios from "axios";
import { useState, useEffect } from "react";
import { Clothes } from "../App";
import { IoIosAddCircleOutline } from "react-icons/io";

const AddItem = (item: any) => {
    const formattedDate = new Date(item.date).toLocaleDateString();
    const [clothesTypes, setClothesTypes] = useState<String[]>([]);
    const [clothesSizes, setClothesSizes] = useState<String[]>([]);
    const [formData, setFormData] = useState({
        type: "",
        size: "",
        colour: "",
        image: "",
        date: ""
    });

    useEffect(() => {
        axios.get("http://localhost:3001/types/")
        .then(res => {
            setClothesTypes(res.data);
            console.log("Clothes types successfully fetched!");
        });
        axios.get("http://localhost:3001/sizes/")
        .then(res => {
            setClothesSizes(res.data);
            console.log("Clothes sizes successfully fetched!");
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
    <div className="addWrapper">
        <h2>Add an item</h2>
        <div className="formWrapper">
            <form>
            <select 
                    name="type" 
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    > 
                    {clothesTypes.map(type => (
                        <option key={String(type)} value={String(type)}>
                            {type}
                        </option>
                        ))}
                </select>
                <select 
                    name="size" 
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                    > 
                    {clothesTypes.map(size => (
                        <option key={String(size)} value={String(size)}>
                            {size}
                        </option>
                        ))}
                </select>
                <input
                        name="colour"
                        type="color"
                        value={formData.colour}
                        onChange={handleInputChange}
                        required
                />
                <input
                        name="date"
                        type="date"
                        value={formData.colour}
                        onChange={handleInputChange}
                        required
                />
                <button type="submit">Save</button>
            </form>
        </div>
    </div>
    );
}

export default AddItem;