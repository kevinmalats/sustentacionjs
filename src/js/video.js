var btnVideo= document.getElementById("recargarvideo");
btnVideo.addEventListener("click", recargarvideo);

function recargarvideo(){
  let video= document.getElementById("videExplicacion");
  video.play();
}
