import { Clothes } from "../App";
import "../styles/main.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { MouseEvent as ReactMouseEvent } from 'react';

interface TableRowProps {
    res: Clothes;
    updateClothes: any;
}

function TableRow({ res, updateClothes }: TableRowProps) {
    const formattedDate = new Date(res.date).toLocaleDateString();
    const [isEditing, setIsEditing] = useState(false);
    const [clothesTypes, setClothesTypes] = useState<String[]>([]);
    const [clothesSizes, setClothesSizes] = useState<String[]>([]);

    const [editedValues, setEditedValues] = useState({
        type: res.type,
        size: res.size,
        colour: res.colour,
        image: res.image,
    });

    const circleStyle = {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: isEditing ? editedValues.colour : res.colour,
        display: "inline-block",
    };

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
    
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (e: ReactMouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        axios.patch(`http://localhost:3001/clothes/${res.id}`, editedValues)
            .then(response => {
                console.log("Clothes updated successfully:", response.data);
                axios.get("http://localhost:3001/clothes/")
                    .then(updatedResponse => updateClothes(updatedResponse.data))
            })
            .catch(error => {
                console.error("Error updating clothes:", error);
            });
        setIsEditing(false);
    };
    
    
    const handleDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if(isConfirmed){
        axios.delete(`http://localhost:3001/clothes/${res.id}`)
            .then(response => {
                console.log("Clothes deleted successfully:", response.data);
                axios.get("http://localhost:3001/clothes/")
                    .then(updatedResponse => updateClothes(updatedResponse.data));
            })
            .catch(error => {
                console.error("Error deleting clothes:", error);
            });
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <tr>
            <td>{isEditing ? 
                <select 
                    name="type" 
                    value={editedValues.type}
                    onChange={handleInputChange}
                    > 
                    {clothesTypes.map(type => (
                        <option key={String(type)} value={String(type)}>
                            {type}
                        </option>
                        ))}
                </select>
                : res.type}
            </td>
            <td>
                {isEditing ? 
                    <select 
                        name="size" 
                        value={editedValues.size}
                        onChange={handleInputChange}
                    > 
                    {clothesSizes.map(size => (
                        <option key={String(size)} value={String(size)}>
                            {size}
                        </option>
                        ))}
                </select>
                     : res.size}
            </td>
            <td>
                {isEditing ? (
                    <input
                        name="colour"
                        type="color"
                        value={editedValues.colour}
                        onChange={handleInputChange}
                    />
                ) : (
                    <div style={circleStyle}></div>
                )}
            </td>
            <td>
                {isEditing ? (
                    <input 
                        type="text"
                        value={editedValues.image}
                        onChange={handleInputChange} 
                        />
                ) : (
                    <img src={res.image} alt="Clothing" style={{ maxWidth: "100px" }} className="img"/>
                )}
            </td>
            <td>{formattedDate}</td>
            <td>
                {isEditing ? (
                    <>
                        <FaRegCircleCheck className="btn" onClick={handleSave} />
                        <MdOutlineCancel className="btn" onClick={handleCancel} />
                    </>
                ) : (
                    <>
                        <BiEdit className="btn" onClick={handleEdit} />
                        <RiDeleteBin6Line className="btn" onClick={handleDelete} />
                    </>
                )}
            </td>
        </tr>
    );
}

export default TableRow;
