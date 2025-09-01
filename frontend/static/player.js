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
