import React from "react";

export default function Comment({ body, author }) {
    return (
        <div>
            <h4>{author}:</h4>
            <p>{body}</p>
        </div>
    )
}