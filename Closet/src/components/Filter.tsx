import "../styles/main.css";
import { useState, useEffect } from "react";

const Filter = ({ selectedFilter, setSelectedFilter }: any) => {
    const handleFilterChange = (e: any) => {
        setSelectedFilter(e.target.value);
    }
 
    function resetFilter() {
        setSelectedFilter("");
    }

    return (
            <div className="filterButtonsWrapper">
                <label className="radioLabel">
                    <input
                        type="radio"
                        name="pants"
                        value="Pants"
                        checked={selectedFilter === 'Pants'}
                        onChange={handleFilterChange}
                    />
                    Pants
                </label>
                <label className="radioLabel">
                    <input
                        type="radio"
                        name="blouse"
                        value="Blouse"
                        checked={selectedFilter === 'Blouse'}
                        onChange={handleFilterChange}
                    />
                    Blouse
                </label>
                <label className="radioLabel">
                    <input
                        type="radio"
                        name="skirt"
                        value="Skirt"
                        checked={selectedFilter === 'Skirt'}
                        onChange={handleFilterChange}
                    />
                    Skirt
                </label>
                <label className="radioLabel">
                    <input
                        type="radio"
                        name="filterType"
                        value=""
                        checked={selectedFilter === ''}
                        onChange={handleFilterChange}
                    />
                    Reset
                </label>
            </div>
    );
}

export default Filter;
