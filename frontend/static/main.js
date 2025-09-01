const songsArray = []; //array used to store all the songs lssited from navidrome server
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

function playSong(url) {
  if (!playing) {
    audo = document.createElement("audio");
    audo.src = url;
    audo.id = "player-audio";
    audo.autoplay = true;
    audo.hidden = true;
    document.body.appendChild(audo);

    // create progress bar
    let progress = document.getElementById("audio-progress");
    if (!progress) {
      progress = document.createElement("progress");
      progress.id = "audio-progress";
      progress.max = 100;
      progress.value = 0;
      progress.style.width = "300px";
      progress.style.display = "block";
      progress.style.margin = "10px 0";
      document.body.appendChild(progress);
    }

    progress.addEventListener("click", (e) => {
      const rect = progress.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audo.currentTime = percent * audo.duration;
    });

    // update progress as the song plays
    audo.addEventListener("timeupdate", () => {
      progress.value = (audo.currentTime / audo.duration) * 100;
    });

    playing = true;

    // add controls
    let player = document.getElementById("global-play-btn");
    if (!player) {
      play = document.createElement("button");
      play.textContent = "Play/Pause";
      play.id = "global-play-btn";
      play.onclick = toggle_audio;
      document.body.appendChild(play);
    }
  } else {
    console.log("already playing something");
  }
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

async function main() {
  await listAllSongs("json&id=69IwB2p7tQDejD3lowUIFo");

  songsArray.forEach((song) => {
    addSongToDaw(song);
  });
}

main();
