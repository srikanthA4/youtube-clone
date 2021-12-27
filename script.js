
   
const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyCqID4DxeqEgQcpnXLct0fkD1t5Is4a-04";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
let useractivity_http="https://www.googleapis.com/youtube/v3/activities?";
let search_http="https://www.googleapis.com/youtube/v3/search?";
let updatepalylist_http="https://www.googleapis.com/youtube/v3/playlists?";
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 100,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {   
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })

}
const getuseractivity=(useractivity_data)=>{
    fetch(useractivity_http+new URLSearchParams({
        "kind": "youtube#activityListResponse",
        "etag": etag,
        "nextPageToken": good,
        "prevPageToken":type,
        "pageInfo": {
          "totalResults": 45,
          "resultsPerPage": 45
        },
        "items": [
          
        ]
      }))
      .then(res=>res.json())
      .then(data=>{
          useractivity_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
          makeVideoCard(video_data);
      })
}
const getsearch=(search_data)=>
{
    fetch(search_http=new URLSearchParams({

    }))
    .then(res=>res.json())
    .then(data=>{ 
        search_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);

    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "{base_URL}/search?part=snippet";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})