let queue = [];
let queue_poistion = 0;

function toggle_audio() {
  const player = document.getElementById("player-audio");

  if (playing === true) {
    player.pause();
    playing = false;
  } else {
    player.play();
    playing = true;
  }
}

function handle_song_end() {
  playing = false;

  audio = document.getElementById("player-audio");

  progress = document.getElementById("audio-progress");

  if (progress) {
    progress.value = 0;
  }

  if (queue.length > queue_poistion) {
    // basic que implementation
    queue_poistion += 1;

    url = queue[queue_poistion - 1];

    playSong(url);
  }
}

function add_to_queue(song) {
  queue.push(song);
}

function playSong(url) {
  if (!playing) {
    audioPlayer = document.getElementById("player-audio");
    if (!audioPlayer) {
      create_music_controls(url);
      audioPlayer = document.getElementById("player-audio");
    }

    audioPlayer.pause;
    audioPlayer.src = url;
    audioPlayer.play;

    playing = true;
  } else {
    add_to_queue(url);
  }
}

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
      audo.currentTime = percent * audo.duration;
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

  // Previous button
  let prev = document.createElement("button");
  prev.textContent = "Previous";
  prev.id = "global-prev-btn";
  prev.onclick = handle_prev_button;
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
  next.onclick = handle_next_button;
  document.body.appendChild(next);
}
