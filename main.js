let current_view = "home";

//button handeling
function handle_side_bar_btn_click(button) {
  btn_id = button.id;

  clear_view();
  const buttonActions = {
    "home-btn": () => home_view(),
    "search-btn": () => console.log("clicked on settings btn"),
    "fav-btn": () => console.log("clicked on profile btn"),
    "radio-btn": () => console.log("clicked on radio btn"),
  };

  const buttonViews = {
    "home-btn": "home",
    "search-btn": "search",
    "fav-btn": "favorites",
    "radio-btn": "radio",
  };

  if (buttonActions[btn_id]) {
    buttonActions[btn_id]();
  }

  if (buttonViews[btn_id]) {
    current_view = buttonViews[btn_id];
  }
}

//view functions
function home_view() {
  big_screen_conatiner = document.getElementById("main-container");

  inner_html = `
       <div id="audio-feed-large">
         <div class="header">Recently Played</div>
         <div class="song-feed">
           <div class="song" onclick="album_details()"></div>
           <div class="song" onclick="album_details()"></div>
           <div class="song" onclick="album_details()"></div>
           <div class="song" onclick="album_details()"></div>
         </div>
       </div>
     
       <div id="audio-feed-medium">
         <div class="header">Recently Played</div>
         <div class="song-feed">
           <div class="song" onclick="album_details()"></div>
           <div class="song" onclick="album_details()"></div>
           <div class="song" onclick="album_details()"></div>
           <div class="song" onclick="album_details()"></div>
         </div>
       </div>
     
       <div id="audio-feed-small">
         <div class="header">Recently Played</div>
         <div class="song-feed">
           <div class="song" onclick="album_details()"></div>
           <div class="song" onclick="album_details()"></div>
           <div class="song" onclick="album_details()"></div>
           <div class="song" onclick="album_details()"></div>
         </div>
       </div>`;

  view_container = document.getElementById("view");

  view_container.innerHTML = inner_html;
}

function clear_view() {
  document.getElementById("view").innerHTML = "";
}

function album_details(album_id) {
  if (album_id === undefined) {
    return;
  }

  console.log("showing album for", album_id);
  clear_view();
}

// reorder dom to screen size
function change_dom_order_big_screen() {
  if (window.innerWidth >= 451) {
    const body = document.body;

    side_bar = document.getElementById("side-bar");
    view = document.getElementById("view");
    audio_player_view = document.getElementById("audio-player-view");
    side_bar = document.getElementById("side-bar");
    top_bar = document.getElementById("top-bar");

    body.appendChild(side_bar);

    container = document.getElementById("main-container");

    if (container === null) {
      container = document.createElement("div");
      container.id = "main-container";
    }

    container.appendChild(top_bar);
    container.append(audio_player_view);
    container.append(view);

    body.append(container);
  }
}

function change_dom_order_small_screen() {
  if (window.innerWidth <= 450) {
    const body = document.body;

    const side_bar = document.getElementById("side-bar");
    const view = document.getElementById("view");
    const audio_player_view = document.getElementById("audio-player-view");
    const top_bar = document.getElementById("top-bar");
    const container = document.getElementById("main-container");

    if (container) {
      body.appendChild(top_bar);
      body.appendChild(view);
      body.appendChild(audio_player_view);
      body.appendChild(side_bar);

      container.remove();
    }
  }
}

function populate_music_grid_single(song, parrent_container) {
  if (typeof parrent_container === "string") {
    parrent_container = document.getElementById(parrent_container);
  }

  if (song != null) {
    const song_container = document.createElement("div");
    song_container.className = "song";
    song_container.id = song["id"];
    song_container.onclick = () => album_details(song["id"]);

    song_img = document.createElement("img");
    song_img.className = "song_backround_img";
    song_img.src = song["coverArt"];
    song_container.append(song_img);

    song_feed = parrent_container.querySelector(".song-feed");

    if (song_feed) {
      song_feed.append(song_container);
    } else {
      console.warn("No element with class 'song-feed' found!");
      parrent_container.append(song_container);
    }
  }
}

//main
window.addEventListener("resize", change_dom_order_big_screen);
window.addEventListener("resize", change_dom_order_small_screen);

change_dom_order_big_screen();
change_dom_order_small_screen();

const song = {
  title: "Blinding Lights",
  artist: "The Weeknd",
  album: "After Hours",
  id: "2",
  size: 5123456,
  playCount: 42,
  created: "2020-03-20",
  lastPlayed: "2025-09-16",
  coverArt: `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1735798846`,
  url: `url`,
};

populate_music_grid_single(song, "audio-feed-large");
