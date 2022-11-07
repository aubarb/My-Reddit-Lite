import React from "react";

export default function Post(props) {

    const { author, title, creationDate, score, numComments, isVideo, media, imageUrl, permalink } = props

    // Format date: input is time posted in second since epoch, output is hours or days since posted.
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
                : <video className="post-video" src={media.reddit_video.fallback_url} controls  />
            }
            {

            }
            <h2 className="post-votes">Score: {score}</h2>
            <p className="post-author">Posted by: {author}</p>
            <p className="post-date">{dateFormating()}</p>
            <p className="post-comments">{numComments} comments</p>
        </div>
    )
}