import React, { useEffect, useState,  } from 'react';
import Post from './Components/Post';

const categoryItems = [
  ["r/investing", "Investing"],
  ["r/Economics", " Economics"],
  ["r/StockMarket", "Stock Market"],
  ["r/dividends", "Divivends"],
  ["r/wallstreetbets", "Wall St Bets"],
  ["r/CryptoCurrency", "Crypto"],
  ["r/webdev", "Web Dev"],
  ["r/frontend", "Front-End"],
  ["r/javascript", "Javascript"],
  ["r/AskProgramming", "Ask Progr"],
  ["r/css", "CSS"],
  ["r/Cooking", "Cooking"]
];

const filterItems = [
  ["/hot", "Hot"],
  ["/new", "New"],
  ["/top", "top"]
];

function App() {
  const [publications, setPublications] = useState([]);
  const [category, setCategory] = useState("r/investing");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [theme, setTheme] = useState("light");

  const formatData = (data) =>
    data.map(publication => ({
        id: publication.data.id,
        author: publication.data.author,
        title: publication.data.title,
        name: publication.data.name,
        score: publication.data.score,
        creationDate: publication.data.created,
        numComments: publication.data.num_comments,
        permalink: publication.data.permalink,
        isVideo: publication.data.is_video,
        media: publication.data.media,
        isMedia: publication.data.is_reddit_media_domain,
        text: publication.data.selftext,
        isSelf: publication.data.is_self,
        url: publication.data.url,
    }));

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://www.reddit.com/${category}${filter}.json?limit=30`);
      const json = await res.json();
      setPublications(formatData(json.data.children));
    }
    fetchData();
  }, [category, filter]);

  const handleChange = (event) => setSearch(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    async function fetchData() {
      const res = await fetch(`https://www.reddit.com/search.json?q=${search}&limit=30`);
      const json = await res.json();
      setPublications(formatData(json.data.children));
    }
    fetchData();
  };

  return (
    <div className="app" data-theme={theme}>
      <header id="top">
        <img 
          onClick={() => setCategory("r/investing")} 
          className="logo"
          alt="Reddit Logo"
          src={require("./resources/images/reddit-logo.png")} 
        />
        <form className="search-section">
            <input placeholder="Search for..." onChange={handleChange} />
            <button onClick={handleSubmit} >
              <img 
                src={require("./resources/images/search-icon.png")}
                alt="Search icon"
              />
            </button>
        </form>
        <div className='filters'>
          {filterItems.map(([filter, filterName]) => {
            return <h2 onClick={() => setFilter(filter)}>{filterName}</h2>
          })}
        </div>
        -{" "}
        <img
          alt="dark mode icon"
          className="dark-mode "
          src={
            theme === "light" 
              ? require("./resources/images/moon.png") 
              : require("./resources/images/sun.png")
          } 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </header>
      <div className='route'>
        <h3>
          {category} &gt; {filter}
        </h3>
      </div>
      <div className='category-section'>
        <h1 className='r'>/r</h1>
        <div className="category-block">
            {categoryItems.map(([category, categoryName]) => {
              return (
                <div  
                  className="category-item" 
                  onClick={() => setCategory(category)} 
                >
                  <h3>{categoryName}</h3>
                </div>
              );
            })}
        </div>
      </div>
      <div className='upArrow'>
        <a href="#top">
          <img 
            alt="Top arrow"
            src={
              theme === "light" 
                ? require("./resources/images/upArrow-dark.png") 
                : require("./resources/images/upArrow-light.png")
            } 
          />
        </a>
      </div>
      <div className='post-section'>
        {publications.map((publication) => {
          if (!publication.isVideo) {
            return (
              <Post 
                key={publication.id}
                author={publication.author}
                title={publication.title}
                score={publication.score}
                creationDate={publication.creationDate}
                numComments={publication.numComments}
                permalink={publication.permalink}
                isMedia={publication.isMedia}
                text={publication.text}
                isSelf={publication.isSelf}
                url={publication.url}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
