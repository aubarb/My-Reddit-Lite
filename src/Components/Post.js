import React, { useState, useEffect } from "react";
import Comment from "./Comment";

export default function Post(props) {

    const { author, title, creationDate, score, numComments, isVideo, isMedia, isSelf, media, url, text, permalink } = props

    const [comments, setComments] = useState([]);
    const [displayComments, setDisplayComments] = useState(false);

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

    //Fetch all comments for the post and set comments state
    useEffect(() => {
        async function fetchComments() {
            const res = await fetch(`https://www.reddit.com${permalink}.json`);
            const json = await res.json();
            const data = json[1].data.children
            console.log(data);
            let c = [];
            data.forEach(comment => {
                c.push({
                    body: comment.data.body,
                    author: comment.data.author,
                })
            })
            setComments(c)
        }
        fetchComments();
    }, [permalink])

    //Display or hide comments on click
    const handleDisplayComments = () => {
        setDisplayComments(!displayComments)
    }

    //Map over comments state to render a comment component
    const commentsEl = comments.map(comment => {
        return (
            <Comment body={comment.body} author={comment.author} />
        )
    })

    return(
        <div className="post-block">
            <h1 className="post-title">{title}</h1>
            {
                isVideo 
                    ? <video className="post-video" src={media.reddit_video.fallback_url} controls  />
                    : isMedia 
                        ? <img className="post-image" src={url} />
                        : text 
                            ? <p>{text}</p>
                            : isSelf
                                ? ""
                                : <a href={url}>{url}</a>
            }
            <h2 className="post-votes">Score: {score}</h2>
            <p className="post-author">Posted by: {author}</p>
            <p className="post-date">{dateFormating()}</p>
            <p className="post-comments" onClick={handleDisplayComments} >{numComments} comments</p>
            {
                displayComments &&
                <div className="comment-block" >
                    <h2>Comments:</h2>
                    {commentsEl}
                </div>
            }
        </div>
    )
}