import React, { useEffect, useState } from 'react';
import Post from './Components/Post';
import Categories from './Components/Categories';
import Search from './Components/Search';

function App() {

  const [publications, setPublications] = useState([]);
  const [category, setCategory] = useState("r/investing");
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState('');

  console.log(filter);
  //function to format fetched data correctly and be reused in fetch function.
  const formatData = (data) => {
    let p = [];
    data.forEach(publication => {
      p.push({
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
      })
    })
    return p
  }

  // Fetch data from reddit.json link and according to category state. Rceive an array of 15 objects each containing all info about 1 post. Looping over this data to push to p only the data needed and setting the publication state.
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://www.reddit.com/${category}${filter}.json?limit=30`);
      const json = await res.json();
      const data = json.data.children;
      console.log(data);
      let p = formatData(data)
      setPublications(p);
    }
    fetchData();
  }, [category, filter])

  //Change category state when user selects a category
  const handleCategory = (value) => {
    setCategory(value)
  };

  //Change filter state when user selects a filter
  const handleFilter = (value) => {
    setFilter(value);
  };

  //Set search state when user searches
  const handleChange = (event) => setSearch(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    async function fetchData() {
      const res = await fetch(`https://www.reddit.com/search.json?q=${search}&limit=30`);
      const json = await res.json();
      const data = json.data.children;
      let p = formatData(data)
      setPublications(p);
    }
    fetchData();
  }

  const handleSelection = () => {

  }

  //Use data from publications state to create <Post /> components and pass down needed props.
  const publicationsEl = publications.map(publication => {
    if (publication.isVideo === false) {
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
      )
    }
  })

  return (
    <div className="app">
      <header>
        <img onClick={(event) => handleCategory("r/investing")} className="logo" src={require("./resources/images/reddit-logo.png")} />
        <Search handleSubmit={handleSubmit} handleChange={handleChange} />
        <div className='filters'>
          <h2 onClick={(event) => handleFilter("/hot")} className="inactive" >HOT</h2>
          <h2 onClick={(event) => handleFilter("/new")}>NEW</h2>
          <h2 onClick={(event) => handleFilter("/top")}>TOP</h2>
        </div>
      </header>
      <div className='route'>
        <h3>{category} > {filter}</h3>
      </div>
      <div className='category-section'>
        <h1 className='topic'>/r</h1>
        <Categories handleClick={handleCategory}/>
      </div>
      <div className='post-section'>
        {publicationsEl}
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