import React from "react";

export default function Comment({ body, author }) {
    return (
        <div className="comment-item">
            <h4>{author}:</h4>
            <p>{body}</p>
        </div>
    )
}