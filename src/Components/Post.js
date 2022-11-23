import React, { useState, useEffect } from "react";

export default function Post({
  author,
  title,
  creationDate,
  score,
  numComments,
  isMedia,
  isSelf,
  url,
  text,
  permalink,
}) {
  const [comments, setComments] = useState([]);
  const [displayComments, setDisplayComments] = useState(false);

  // Format date: input is time posted in second since epoch, output is hours or days since posted.
  const dateFormating = () => {
    let hoursSincePosted = (Date.now() / 1000 - creationDate) / 3600;

    return hoursSincePosted < 24
      ? Math.round(hoursSincePosted) + "h ago"
      : Math.round(hoursSincePosted / 24) + "d ago";
  };

  //Fetch all comments for the post and set comments state
  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`https://www.reddit.com${permalink}.json`);
      const json = await res.json();
      const data = json[1].data.children;
      setComments(
        data.map((comment) => ({
          body: comment.data.body,
          author: comment.data.author,
        }))
      );
    }
    fetchComments();
  }, [permalink]);

  return (
    <div className="post-block">
      <h1 className="post-title">{title}</h1>
      <div className="post-content">
        {
          // C'est une mauvaise pratique d'utiliser les ternary operators lorsqu'il y a plus de deux possibilités,
          // Dans ce cas j'utiliserais une IIFE
          (() => {
            if (isMedia) {
              return <img className="post-image" src={url} />;
            }
            if (text) {
              return <p>{text}</p>;
            }
            if (isSelf) {
              return "";
            }
            return <a href={url}>{url}</a>;
          })()
        }
      </div>
      <div className="post-info">
        <h4 className="post-votes">Score: {score}</h4>
        <h4 className="post-author">By {author}</h4>
        <h4 className="post-date">{dateFormating()}</h4>
        <h4
          className="post-comments"
          onClick={() => setDisplayComments(!displayComments)}
        >
          {numComments} comments
        </h4>
      </div>
      {displayComments && (
        <div className="comment-block">
          <h2>Comments:</h2>
          {comments.map((comment) => {
            // Pas d'intérêt à extraire le code ci-dessous dans un component
            return (
              <div className="comment-item">
                <h4>{comment.author}:</h4>
                <p>{comment.body}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
