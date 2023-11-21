// Function to create the video HTML structure
function createVideoHTML(singleVideo) {
  let vidId = singleVideo.id.videoId;
  let vidLink = `https://www.youtube.com/watch?v=${vidId}`;

  return `
    <div class="col-sm-12 col-md-4">
      <div class="singleVideoWrapper">
        <div class="videoThumbnail">
          <a href="${vidLink}" target="_blank">
            <img src="${singleVideo.snippet.thumbnails.high.url}" />
          </a>
        </div>
        <div class="videoInfoWrapper">
          <div class="videoTitle">
            <a href="${vidLink}" target="_blank">
              ${singleVideo.snippet.title}
            </a>
          </div>
          <div class="videoDesc">
            ${singleVideo.snippet.description}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Fetch YouTube videos asynchronously
fetch(
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=9&key=[Your API Key]"
)
  .then((response) => response.json())
  .then((data) => {
    const videoContainer = document.getElementById("videoContainer");

    data.items.forEach((singleVideo) => {
      // Append each video HTML to the video container
      videoContainer.innerHTML += createVideoHTML(singleVideo);
    });
  })
  .catch((error) => console.error("Error fetching YouTube videos:", error));
