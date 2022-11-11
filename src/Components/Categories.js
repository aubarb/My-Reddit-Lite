import React from "react";

export default function Categories({ handleClick }) {

    return(
        <div className="categories-block">
            <div  className="category-item" onClick={(event) => handleClick("r/investing")} >
                <h3>Investing</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/Economics")} >
                <h3>Economics</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/StockMarket")} >
                <h3>Stock Market</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/dividends")} >
                <h3>Dividends</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/wallstreetbets")} >
                <h3>Wall St Bets</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/CryptoCurrency")} >
                <h3>Crypto</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/webdev")} >
                <h3>Web Dev</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/frontend")} >
                <h3>Front-End</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/javascript")} >
                <h3>Javascript</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/AskProgramming")} >
                <h3>Ask Progr</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/css")} >
                <h3>CSS</h3>
            </div>
            <div className="category-item" onClick={(event) => handleClick("r/Cooking")} >
                <h3>Cooking</h3>
            </div>
        </div>
    )
}

/*

r/investing
r/Economics
r/StockMarket
r/dividends
r/wallstreetbets
r/CryptoCurrency
r/webdev
r/frontend
r/javascript
r/AskProgramming
r/css
r/Cooking

*/
