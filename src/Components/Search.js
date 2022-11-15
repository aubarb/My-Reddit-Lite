import React from "react";

export default function Search({ handleSubmit, handleChange }) {

    return(
        <form className="search-section">
            <input placeholder="Search for..." onChange={handleChange} />
            <button onClick={handleSubmit} ><img src={require("../resources/images/search-icon.png")}/></button>
        </form>
    )
}