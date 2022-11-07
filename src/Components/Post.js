import React from "react";

export default function Post(props) {

    const { author, title, creationDate, score, numComments, isVideo, media, imageUrl, permalink } = props

    const dateFormating = () => {
        let hoursSincePosted = ((Date.now() / 1000) - creationDate) / 3600 ;
        if (hoursSincePosted < 24) {
            return "Posted " + hoursSincePosted + " hours ago";
        } else if (hoursSincePosted < 36){
            return "Posted " + Math.round(hoursSincePosted / 24) + " day ago"
        } else {
            return "Posted " + Math.round(hoursSincePosted / 24) + " days ago"
        }
    }

    return(
        <div className="post-block">
            <h1 className="post-title">{title}</h1>
            {
                isVideo === false ?
                <img className="post-image" src={imageUrl} />
                : <video src={media} controls  />
            }
            {

            }
            <p className="post-content">DISPLAY THIS ONLY IF IT IS NOT A VIDEO</p>
            <h2 className="post-votes">{score}</h2>
            <p className="post-author">{author}</p>
            <p className="post-date">{dateFormating()}</p>
            <p className="post-comments">{numComments}</p>
        </div>
    )
}