import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/main.css"; 
import { FormEvent } from "react";

interface Form {
    type: string;
    size: string;
    colour: string;
    image: string;
    date: string;
}

const AddItem = ({ updateClothes }: { updateClothes: any }) => {
    const [clothesTypes, setClothesTypes] = useState<String[]>([]);
    const [clothesSizes, setClothesSizes] = useState<String[]>([]);
    const [formData, setFormData] = useState<Form>({
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

    function adjustData(data: Form) {
        return {
                "type": data.type,
                "size": data.size,
                "image": data.image,
                "colour": data.colour,
                "date": data.date
        }
    }

    const handleSubmitData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = adjustData(formData);

        console.log("Submitting form data:", data);
    
        axios.post("http://localhost:3001/clothes", data)
             .then(() => {
                console.log("Item added successfully!");
                axios.get("http://localhost:3001/clothes")
                     .then(addedItem => {
                         console.log("Updated clothes data:", addedItem.data);
                         updateClothes(addedItem.data);
                     });
             })
             .catch(error => {
                console.error("Error adding item:", error);
             });
    }


    return (
        <div className="addWrapper">
            <h2>Add an item</h2>
            <div className="formWrapper">
                <form onSubmit={handleSubmitData}>
                    <div className="inputWrapper">
                        <select 
                            name="type" 
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                        > 
                        <option value="" disabled>Type</option>
                            {clothesTypes.map(type => (
                                <option key={String(type)} value={String(type)}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <select 
                            name="size" 
                            value={formData.size}
                            onChange={handleInputChange}
                            required
                        > 
                        <option value="" disabled>Size</option>
                            {clothesSizes.map(size => (
                                <option key={String(size)} value={String(size)}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <input
                            name="colour"
                            type="color"
                            value={formData.colour || "#000000"}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <input
                            name="image"
                            type="text"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="https://www.image.jpg"
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default AddItem;
