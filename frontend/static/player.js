let queue = [];

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
  console.log("Song ended");
  playing = false;

  progress = document.getElementById("audio-progress");

  if (progress) {
    progress.value = 0;
  }

  if (queue.length >= 1) {
    // basic que implementation
    //to do add more song info to the queue
    console.log("song in queue", queue[0]);

    playSong(queue[0]);
    queue.shift();

    console.log(queue);
  }
}

function add_to_queue(song) {
  queue.push(song);
}
