import TableRow from "./TableRow";
import { Clothes } from "../App";
import "../styles/main.css"


interface TableProps {
    clothes: Clothes[];
    updateClothes: any
}

function Table({ clothes, updateClothes }: TableProps) {
  
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Colour</th>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {clothes.map(c => (
                        <TableRow key={c.id} res={c} updateClothes={updateClothes}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;