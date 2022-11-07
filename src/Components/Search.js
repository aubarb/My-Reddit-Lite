import React from "react";

export default function Search({ handleSubmit, handleChange }) {

    return(
        <div className="search-section">
            <img className="logo" src={require("../resources/images/reddit-logo.png")} />
            <form>
                <input placeholder="Search for..." onChange={handleChange} />
                <submit onClick={handleSubmit} >Search</submit>
            </form>
        </div>
    )
}