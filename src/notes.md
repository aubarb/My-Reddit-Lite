
  data is an array of objects for each post. to access specific_data for each post follow this structure: data[0].data.specific_data
  Useful data example key: value =>  
    author: "cheskymaker"
    created: 1666534451 (in sec since epoch) 
    id: "ybisa1"
    name: "t3_ybisa1"
    num_comments: 5094
    score: 185307
    title: "This guy turned his eye into a flashlight"
    is_video: true (if it is a video)
    media.reddit_video.fallback_url : url of video
      (media is an object containing media info / only if video , else media: null) 
    url: image url (if image, if video it redirect to page post link)
    permalink: link of the post when we open it (gives access to comments);
