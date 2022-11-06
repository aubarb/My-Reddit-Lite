import React, { useEffect, useState } from 'react';
import Post from './Components/Post';
import Categories from './Components/Categories';
import Search from './Components/Search';

function App() {

  const [publications, setPublications] = useState([]);

  // Fetch data from reddit.json link, receving an array of 15 objects each containing all info about 1 post. Looping over this data to push p only the data needed and setting the state.
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://www.reddit.com/r/popular/top.json?limit=15&t=month");
      const json = await res.json();
      const data = json.data.children;
      let p = [];
      data.forEach(publication => {
        p.push({
          id: publication.data.id,
          author: publication.data.author,
          title: publication.data.title,
          name: publication.data.name,
          score: publication.data.score,
          numComments: publication.data.num_comments,
          isVideo: publication.data.is_video,
          media: publication.data.media,
          imageUrl: publication.data.url,
          permalink: publication.data.permalink
        })
      })
      setPublications(p);
    }
    fetchData();
  }, [])

  console.log(publications);

  const publicationsEl = publications.map(publication => {
    return (
      <Post 
        key={publication.id}
        author={publication.author}
        title={publication.title}
        score={publication.score}
        numComments={publication.numComments}
        isVideo={publication.isVideo}
        media={publication.media}
        imageUrl={publication.imageUrl}
        permalink={publication.permalink}
      />
    )
  })


  return (
    <div className="app">
      <header>
        <Search /> 
      </header>
      <div className='post-section'>
        {publicationsEl}
      </div>
      <Categories />
    </div>
  );
}

export default App;
