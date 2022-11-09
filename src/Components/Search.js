import React from "react";

export default function Search({ handleSubmit, handleChange }) {

    return(
        <div className="search-section">
            <form>
                <input placeholder="Search for..." onChange={handleChange} />
                <button onClick={handleSubmit} >Search</button>
            </form>
        </div>
    )
}