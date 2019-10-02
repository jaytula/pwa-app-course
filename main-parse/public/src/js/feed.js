var shareImageButton = document.querySelector("#share-image-button");
var createPostArea = document.querySelector("#create-post");
var closeCreatePostModalButton = document.querySelector(
  "#close-create-post-modal-btn"
);
var sharedMomentsArea = document.querySelector("#shared-moments");

function openCreatePostModal() {
  createPostArea.style.display = "block";
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === "dismissed") {
        console.log("User cancelled installation");
      } else {
        console.log("User added to home screen");
      }
    });

    deferredPrompt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = "none";
}

shareImageButton.addEventListener("click", openCreatePostModal);

closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);

// Currently not in use
function onSaveButtonClicked() {
  console.log("clicked");
  if ("caches" in window) {
    caches.open("user-requested").then(function(cache) {
      cache.add("https://httpbin.org/get");
      cache.add("/src/images/sf-boat.jpg");
    });
  }
}

function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data) {
  var cardWrapper = document.createElement("div");
  cardWrapper.className = "shared-moment-card mdl-card mdl-shadow--2dp";
  var cardTitle = document.createElement("div");
  cardTitle.className = "mdl-card__title";
  cardTitle.style.backgroundImage = `url("${data.image}")`;
  cardTitle.style.backgroundSize = "cover";
  cardTitle.style.height = "180px";
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement("h2");
  cardTitleTextElement.style.color = "yellow";
  cardTitleTextElement.className = "mdl-card__title-text";
  cardTitleTextElement.textContent = data.title;
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement("div");
  cardSupportingText.className = "mdl-card__supporting-text";
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = "center";
  // var cardSaveButton = document.createElement("button");
  // cardSaveButton.addEventListener("click", onSaveButtonClicked);
  // cardSaveButton.textContent = "Save";
  // cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

function updateUI(data) {
  clearCards();

  for (var i = 0; i < data.length; i++) {
    createCard(data[i]);
  }
}

/*
var url = "https://pwagram-9071a.firebaseio.com/posts.json";
var networkDataReceived = false;
const DEBUG = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkDataReceived = true;
    if (DEBUG) console.log("from web", data);
    var dataArray = [];
    for (var key in data) {
      dataArray.push(data[key]);
    }
    updateUI(dataArray);
  });
*/

// const example = [
//     {
//       "createdAt": "2019-09-30T15:20:57.402Z",
//       "updatedAt": "2019-09-30T16:19:32.862Z",
//       "location": "In San Francisco",
//       "title": "Awesome trip to SF",
//       "id_": "first-post",
//       "image": "https://parsefiles.back4app.com/fM55jOxF9byYj0mcZe8zp3x3TU994bz0YdHdx5mG/bc200b503c1446d0740d44dcb51530d4_sf-boat.jpg",
//       "objectId": "EQ4AHA4h4V"
//     }
//   ];

const DEBUG = false;

const url = "https://parseapi.back4app.com/classes/Posts";
var networkDataReceived = false;
const Posts = Parse.Object.extend('Posts');
const query = new Parse.Query(Posts);

query.find()
  .then(posts => {
    return posts.map(post => ({...post.attributes, id: post.attributes.id_ }))
  })
  .then(transformedPosts => {
    networkDataReceived = true;
    updateUI(transformedPosts);
  })


if ("caches" in window) {
  caches
    .match(url)
    .then(function(response) {
      if (response) {
        return response.json();
      }
    })
    .then(function(data) {
      if (DEBUG) console.log("from cache", data);
      if (!networkDataReceived) {
        var dataArray = [];
        for (var key in data) {
          dataArray.push(data[key]);
        }
        updateUI(dataArray);
      }
    });
}
