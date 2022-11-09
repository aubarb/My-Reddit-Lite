import React from "react";

export default function Categories({ handleClick }) {

    return(
        <div className="categories-block">
            <div  className="category-item one" onClick={(event) => handleClick("popular")} >
                <h2>Popular</h2>
            </div>
            <div className="category-item two" onClick={(event) => handleClick("Economics")} >
                <h2>Economics</h2>
            </div>
            <div className="category-item three" onClick={(event) => handleClick("wallstreetbets")} >
                <h2>Wall St Bets</h2>
            </div>
            <div className="category-item four" onClick={(event) => handleClick("CryptoCurrency")} >
                <h2>Crypto</h2>
            </div>
            <div className="category-item five" onClick={(event) => handleClick("Cooking")} >
                <h2>Cooking</h2>
            </div>
            <div className="category-item six" onClick={(event) => handleClick("space")} >
                <h2>Space</h2>
            </div>
            <div className="category-item seven" onClick={(event) => handleClick("technology")} >
                <h2>Tech</h2>
            </div>
        </div>
    )
}

/*
https://www.reddit.com/r/popular/top.json?limit=15&t=month
https://www.reddit.com/r/Economics/top.json?limit=15&t=month
https://www.reddit.com/r/wallstreetbets/top.json?limit=15&t=month
https://www.reddit.com/r/Cooking/top.json?limit=15&t=month
https://www.reddit.com/r/space/top.json?limit=15&t=month
https://www.reddit.com/r/technology/top.json?limit=15&t=month
https://www.reddit.com/r/CryptoCurrency/top.json?limit=15&t=month

*/
