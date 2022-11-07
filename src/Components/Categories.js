import React from "react";

export default function Categories({ handleClick }) {

    return(
        <div className="categories-section">
            <div  className="category-block" onClick={(event) => handleClick("popular")} >
                <h1>Popular</h1>
            </div>
            <div className="category-block" onClick={(event) => handleClick("Economics")} >
                <h1>Economics</h1>
            </div>
            <div className="category-block" onClick={(event) => handleClick("wallstreetbets")} >
                <h1>Wall St Bets</h1>
            </div>
            <div className="category-block" onClick={(event) => handleClick("CryptoCurrency")} >
                <h1>Crypto</h1>
            </div>
            <div className="category-block" onClick={(event) => handleClick("Cooking")} >
                <h1>Cooking</h1>
            </div>
            <div className="category-block" onClick={(event) => handleClick("space")} >
                <h1>Space</h1>
            </div>
            <div className="category-block" onClick={(event) => handleClick("technology")} >
                <h1>Tech</h1>
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
