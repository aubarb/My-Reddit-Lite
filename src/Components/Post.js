import React from "react";

export default function Post(props) {

    const { key, author, title, score, numComments, isVideo, media, imageUrl, permalink } = props

    return(
        <div className="post-block">
            <h1 className="post-title">{title}</h1>
            <p className="post-content">Content or image goes here</p>
            <h2 className="post-votes">{score}</h2>
            <p className="post-author">{author}</p>
            <p className="post-date">20 days ago</p>
            <p className="post-comments">{numComments}</p>
        </div>
    )
}