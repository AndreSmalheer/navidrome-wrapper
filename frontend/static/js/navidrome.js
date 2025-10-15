//This sciprt interact with the navidrome api to get data from navidrome
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
      coverArt: `${navidrome_url}/rest/getCoverArt?u=${user}&p=${pass}&v=1.16.1&c=${client}&id=${song.coverArt}`,
      url: `${navidrome_url}/rest/stream?u=${user}&p=${pass}&v=1.16.1&c=${client}&id=${song.id}`,
    });
  });
}

async function getAlbumInfo(album_id) {
  const url = `${navidrome_url}/rest/getMusicDirectory?u=${user}&p=${pass}&v=1.16.1&c=${client}&f=${album_id}`;
  const response = await fetch(url);
  const data = await response.json();

  const album = data["subsonic-response"]?.directory;

  if (!album) return null;

  // Extract album info
  const albumInfo = {
    id: album.id,
    title: album.title,
    artist: album.child?.[0]?.displayArtist || album.child?.[0]?.artist || "",
    coverArt: album.coverArt
      ? `${navidrome_url}/rest/getCoverArt?u=${user}&p=${pass}&v=1.16.1&c=${client}&id=${album.coverArt}`
      : null,
    songs:
      album.child?.map((song) => ({
        id: song.id,
        title: song.title,
        artist: song.displayArtist || song.artist,
        size: song.size,
        playCount: song.playCount,
        created: song.created,
        lastPlayed: song.played,
        url: `${navidrome_url}/rest/stream?u=${user}&p=${pass}&v=1.16.1&c=${client}&id=${song.id}`,
      })) || [],
  };

  // return albumInfo;
  console.log(albumInfo);
}

// home_view();

album_details_view();
