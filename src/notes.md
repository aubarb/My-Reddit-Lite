
  TODO Next:
  Load Comments


LINK 
home: https://www.reddit.com/
home top: https://www.reddit.com/top
"funny" category : https://www.reddit.com/r/funny/
"funny" category and top https://www.reddit.com/r/funny/top/
"funny" category and new https://www.reddit.com/r/funny/new/
"funny" category and hot (today) https://www.reddit.com/r/funny/hot/
add a "top" parameter to display top post and a amount limit: https://www.reddit.com/r/popular/top?limit=100&t=month
Search for "space" in home: https://www.reddit.com/search/?q=space
Search for "space" in funny category: https://www.reddit.com/r/funny/search/?q=space&restrict_sr=1&sr_nsfw=

DATA
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

SEARCH
const [search, setSearch]
input has event.target.value
on submit ==> setSearch => event.target.value
reload with search term?

COMMENTS
Receiving in eache publication[n].permalink : "/r/meirl/comments/ynu2gp/meirl/"
first need to change to : https://www.reddit.com/r/meirl/comments/ynu2gp/meirl.json
`https://www.reddit.com${permalink}.json`

Now I have an array of comments for each post
Need to create a block for comments that will be below the post
By default it is dislay: none, onclick display = block
inside this block I render xcomment by mapping over 

How to change style of what is selected?
create state selected setSelected = empty array
element have an id
handleSelected = (id) => {
  
}