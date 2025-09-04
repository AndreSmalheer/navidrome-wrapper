let audio_playing = false;
let track_list = [];
let track_list_poistion = 0;

function create_music_controls(url) {
  // audio controller
  audioPlayer = document.createElement("audio");
  audioPlayer.src = url;
  audioPlayer.id = "player-audio";
  audioPlayer.autoplay = true;
  audioPlayer.hidden = true;
  document.body.appendChild(audioPlayer);
  playing = true;

  //progress bar
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

    progress.addEventListener("click", (e) => {
      const rect = progress.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioPlayer.currentTime = percent * audioPlayer.duration;
    });

    audioPlayer.addEventListener("ended", () => {
      handle_song_end();
    });

    audioPlayer.addEventListener("timeupdate", () => {
      if (audioPlayer.duration > 0) {
        progress.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      } else {
        progress.value = 0;
      }
    });
  }

  // title
  let title = document.createElement("p");
  title.id = "song-title";
  title.textContent = "Test";
  document.body.appendChild(title);

  // artist
  let artist = document.createElement("p");
  artist.id = "song-artist";
  artist.textContent = "test";
  document.body.appendChild(artist);

  // Previous button
  let prev = document.createElement("button");
  prev.textContent = "Previous";
  prev.id = "global-prev-btn";
  prev.onclick = play_prev_song;
  document.body.appendChild(prev);

  // Play/Pause button
  let play = document.createElement("button");
  play.textContent = "Play/Pause";
  play.id = "global-play-btn";
  play.onclick = toggle_audio;
  document.body.appendChild(play);

  // Next button
  let next = document.createElement("button");
  next.textContent = "Next";
  next.id = "global-next-btn";
  next.onclick = play_next_song;
  document.body.appendChild(next);
}

function handle_song_end() {
  progress_bar = document.getElementById("audio-progress").value = 0;
  audio_playing = false;
  play_next_song();
}

function play_prev_song() {
  track_list_poistion -= 1;
  prev_song = track_list[track_list_poistion];
  audioPlayer = document.getElementById("player-audio");

  if (prev_song) {
    if (audio_playing === true) {
      progress_bar = document.getElementById("audio-progress").value = 0;
      audio_playing = false;
      audioPlayer.pause();
    }

    document.getElementById("song-title").textContent = prev_song.title;
    document.getElementById("song-artist").textContent = prev_song.artist;

    audioPlayer.src = prev_song.url;
    audioPlayer.play();
    audio_playing = true;
  } else {
    track_list_poistion += 1;
  }
}

function toggle_audio() {
  player = document.getElementById("player-audio");

  if (audio_playing === true) {
    player.pause();
    audio_playing = false;
  } else {
    player.play();
    audio_playing = true;
  }
}

function play_next_song() {
  track_list_poistion += 1;
  next_song = track_list[track_list_poistion];
  audioPlayer = document.getElementById("player-audio");
  console.log(next_song);

  if (next_song) {
    if (audio_playing === true) {
      progress_bar = document.getElementById("audio-progress").value = 0;
      audio_playing = false;
      audioPlayer.pause();
    }

    document.getElementById("song-title").textContent = next_song.title;
    document.getElementById("song-artist").textContent = next_song.artist;

    audioPlayer.src = next_song.url;
    audioPlayer.play();
    audio_playing = true;
  } else {
    track_list_poistion -= 1;
  }
}

function playSong(song) {
  url = song.url;
  track_list.push(song);

  if (audio_playing === false) {
    audioPlayer = document.getElementById("player-audio");
    if (!audioPlayer) {
      create_music_controls(url);
      audioPlayer = document.getElementById("player-audio");
    }

    document.getElementById("song-title").textContent = song.title;
    document.getElementById("song-artist").textContent = song.artist;

    audioPlayer.pause;
    audioPlayer.src = song.url;
    audioPlayer.play;

    audio_playing = true;
  }
}
