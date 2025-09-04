const songsArray = []; //array used to store all the songs listed from navidrome server

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
      url: `${navidrome_url}/rest/stream?u=${user}&p=${pass}&v=1.16.1&c=${client}&id=${song.id}`,
    });
  });
}

function addSongToDaw(song) {
  const container = document.getElementById("song_cards_container");

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
      <button onclick="playSong('${song.url}')">Play Song</button>
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
