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
