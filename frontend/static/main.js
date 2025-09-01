const songsArray = []; //array used to store all the songs listed from navidrome server
let playing = false; // boolean to keep track of playing songs

async function listAllSongs(album_id) {
  const url = `${navidrome_url}/rest/getMusicDirectory?u=${user}&p=${pass}&v=1.16.1&c=${client}&f=${album_id}`;
  const response = await fetch(url);
  const data = await response.json();

  const songs = data["subsonic-response"]?.directory?.child || [];

  songs.forEach((song) => {
    songsArray.push({
      title: song.title,
      artist: song.displayArtist || song.artist,
      album: song.album,
      id: song.id,
      size: song.size,
      playCount: song.playCount,
      created: song.created,
      lastPlayed: song.played,
    });
  });
}

function addSongToDaw(song) {
  const container = document.getElementById("song_cards_container");

  const src_url = `${navidrome_url}/rest/stream?u=${user}&p=${pass}&v=1.16.1&c=${client}&id=${song.id}`;

  // Create a separate card for each song
  const songCard = document.createElement("div");
  songCard.className = "song_card";

  songCard.innerHTML = `
    <p class="song_title">Title: ${song.title}</p>
    <p class="artist">Artist: ${song.artist}</p>
    <p class="song_album">Album: ${song.album}</p>
    <p class="song_id">ID: ${song.id}</p>
    <p class="song_size">Size: ${song.size}</p>
    <p class="song_play_count">Play Count: ${song.playCount}</p>
    <p class="song_created">Created: ${song.created}</p>
    <p class="song_last_played">Last Played: ${song.lastPlayed}</p>
    <p class="song_url">
      <button onclick="playSong('${src_url}')">Play Song</button>
    </p>
    `;

  container.appendChild(songCard);
}

function handle_prev_button() {
  console.log(queue.length);
  console.log(queue_poistion);

  if (
    queue.length <= queue_poistion &&
    queue.length !== 0 &&
    queue_poistion !== 0
  ) {
    audio = document.getElementById("player-audio");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      console.log(queue);
      console.log(queue);
    }
  }
}

function handle_next_button() {
  if (queue.length > queue_poistion) {
    queue_poistion += 1;

    url = queue[queue_poistion - 1]; // next song
    console.log(url);
    audio = document.getElementById("player-audio");

    if (audio) {
      audio.pause();
      audio.currentTime = 0; // reset position
      console.log("Stopped current audio");
    } else {
      console.log("Audio element not found!");
      return;
    }

    if (url) {
      audio.src = url;
      audio.play();
      console.log("Playing next song:", url);
    }
  } else {
    console.log("No more songs in queue");
  }
}

async function main() {
  await listAllSongs("json&id=69IwB2p7tQDejD3lowUIFo");

  songsArray.forEach((song) => {
    addSongToDaw(song);
  });
}

main();
