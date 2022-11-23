import React, { useEffect, useState } from "react";
import Post from "./Components/Post";

const categoryItems = [
  ["r/investing", "Investing"],
  ["r/Economics", "Economics"],
  ["r/StockMarket", "Stock Market"],
  // ...
];

function App() {
  const [publications, setPublications] = useState([]);
  const [category, setCategory] = useState("r/investing");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [theme, setTheme] = useState("light");

  //function to format fetched data correctly and be reused in fetch function.
  const formatData = (data) =>
    data.map((publication) => ({
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

  // Fetch data from reddit.json link and according to category state. Rceive an array of 15 objects each containing all info about 1 post. Looping over this data to push to p only the data needed and setting the publication state.
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://www.reddit.com/${category}${filter}.json?limit=30`
      );
      const json = await res.json();
      setPublications(formatData(json.data.children));
    }
    fetchData();
  }, [category, filter]);

  //Set search state when user searches
  const handleChange = (event) => setSearch(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    async function fetchData() {
      const res = await fetch(
        `https://www.reddit.com/search.json?q=${search}&limit=30`
      );
      const json = await res.json();
      const data = json.data.children;
      setPublications(formatData(data));
    }
    fetchData();
  };

  return (
    <div className="app" data-theme={theme}>
      <header id="top">
        <img
          onClick={() => setCategory("r/investing")}
          className="logo"
          src={require("./resources/images/reddit-logo.png")}
        />
        {/* Sachant que le componnent <Search> n'a pas d'état interne, 
        on a aucun interêt à l'extraire du component App */}
        <form className="search-section">
          <input placeholder="Search for..." onChange={handleChange} />
          <button onClick={handleSubmit}>
            <img src={require("./resources/images/search-icon.png")} />
          </button>
        </form>
        <div className="filters">
          {[
            ["/hot", "Hot"],
            ["/new", "New"],
            ["/top", "Top"],
          ].map(([filter, filterName]) => {
            return <h2 onClick={() => setFilter(filter)}>{filterName}</h2>;
          })}
        </div>
        -{" "}
        <img
          className="dark-mode"
          src={
            theme === "light"
              ? require("./resources/images/moon.png")
              : require("./resources/images/sun.png")
          }
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </header>
      <div className="route">
        <h3>
          {category} &gt; {filter}
        </h3>
      </div>
      <div className="category-section">
        <h1 className="r">/r</h1>
        {/* Idem que pour le component <Search>, aucun intérêt à extraire le code ci-dessous 
          + C'est mieux de mapper sur une liste pour éviter la répétition de code
        */}
        <div className="category-block">
          {categoryItems.map(([filter, name]) => {
            return (
              <div
                className="category-item"
                onClick={() => setCategory(filter)}
              >
                <h3>{name}</h3>
              </div>
            );
          })}
        </div>
      </div>
      <div className="upArrow">
        <a href="#top">
          <img
            src={
              theme === "light"
                ? require("./resources/images/upArrow-dark.png")
                : require("./resources/images/upArrow-light.png")
            }
          />
        </a>
      </div>
      <div className="post-section">
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
                isVideo={publication.isVideo}
                media={publication.media}
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

/*
.media.reddit_video
.dash_url: "https://v.redd.it/ehmfrqaeg5z91/DASHPlaylist.mpd?a=1670749640%2CZjc2YTA1OGNjODYwZWVkNzFlYjNjODQ0ZTc2NTU5YWY4MTFlMjg5MDM1ZjY1Y2Q4OGZhYzVlMmMwMjUzZDBiYw%3D%3D&amp;v=1&amp;f=sd"
.fallback_url: "https://v.redd.it/ehmfrqaeg5z91/DASH_1080.mp4?source=fallback"
.hls_url: "https://v.redd.it/ehmfrqaeg5z91/HLSPlaylist.m3u8?a=1670749640%2CN2I5MWYyZWY2MzBmNDFmMTcyM2RjNjI0NTVkNWE5YzcxYTc5MWVkOGUwMzc2OTA5ZjQzZDc4YzA2NGI0M2RlNQ%3D%3D&amp;v=1&amp;f=sd"
.scrubber_media_url: "https://v.redd.it/ehmfrqaeg5z91/DASH_96.mp4"
.secure_media.reddit_video
*/
