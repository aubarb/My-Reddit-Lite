import React, { useEffect, useState } from 'react';
import Post from './Components/Post';
import Categories from './Components/Categories';
import Search from './Components/Search';

function App() {

  const [publications, setPublications] = useState([]);
  const [category, setCategory] = useState("popular");
  const [search, setSearch] = useState("")

  console.log(publications);
  console.log(search);
  // Fetch data from reddit.json link and according to category state. Rceive an array of 15 objects each containing all info about 1 post. Looping over this data to push to p only the data needed and setting the publication state.
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://www.reddit.com/r/${category}/top.json?limit=15&t=month`);
      const json = await res.json();
      const data = json.data.children;
      console.log(data);
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
      setPublications(p);
    }
    fetchData();
  }, [category])

  //Change category state when user selects a category
  const handleCategory = (value) => setCategory(value);

  const handleChange = (event) => setSearch(event.target.value);

  //Search for "space" in home: https://www.reddit.com/search/?q=space
//Search for "space" in funny category: https://www.reddit.com/r/funny/search/?q=space&restrict_sr=1&sr_nsfw=

  const handleSubmit = (event) => {
    event.preventDefault();
    async function fetchData() {
      console.log(`https://www.reddit.com/search.json?q=${search}&limit=15`)
      const res = await fetch(`https://www.reddit.com/search.json?q=${search}&limit=15`);
      const json = await res.json();
      const data = json.data.children;
      console.log(data);
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
      setPublications(p);
    }
    fetchData();
  }

  //Use data from publications state to create <Post /> components and pass down needed props.
  const publicationsEl = publications.map(publication => {
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
  })


  return (
    <div className="app">
      <header>
        <Search handleSubmit={handleSubmit} handleChange={handleChange} /> 
      </header>
      <div className='post-section'>
        {publicationsEl}
      </div>
      <Categories 
        handleClick={handleCategory}
      />
    </div>
  );
}

export default App;
