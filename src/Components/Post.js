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

  const dateFormating = () => {
    let hoursSincePosted = (Date.now() / 1000 - creationDate) / 3600;
    return hoursSincePosted < 24
      ? Math.round(hoursSincePosted) + "h ago"
      : Math.round(hoursSincePosted / 24) + "d ago";
  };

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
  console.log(text);

  return (
    <div className="post-block">
      <h1 className="post-title">{title}</h1>
      <div className="post-content">
        {isMedia ? (
          <img alt="" className="post-image" src={url} />
        ) : text ? (
          <p>{text}</p>
        ) : isSelf ? (
          ""
        ) : (
          <a href={url}>{url}</a>
        )}
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
          {comments.map(({ body, author }) => {
            return (
              <div className="comment-item">
                <h4>{author}:</h4>
                <p>{body}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
