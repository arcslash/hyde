var isCameraON = false;//true when camera is on
var video_path = "static/test_image.jpg";
// Get the button that opens the modal
var btn_add = document.getElementById("btn_add");//adding a button to add new garments
var style = window.getComputedStyle(document.documentElement);
var modal = document.getElementById('myModal');
var canvas= document.getElementById("pointsCanvas"),ctx = canvas.getContext("2d");


ctx.fillStyle = "red";
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();
function measure(){
  $.get('http://localhost:5000/measure',function(data){
    alert( data );
  });

}
function camera(){
  //("$camera_btn")
  if(!isCameraON){
    $("#camera_btn").html('Turn Camera OFF');
    $("#camera_btn").css('background-color', style.getPropertyValue('--colour_button_false'));
    isCameraON = true;
  }else{
    $("#camera_btn").html('Turn Camera ON');
    $("#camera_btn").css('background-color',style.getPropertyValue('--colour_button_true'));
    isCameraON = false;
  }
}
function add_garment(){
    $("#popup_window").css.display = "block";

}

function initApp(){
  camera();
  var img = document.getElementById('canvas_image');
//or however you get a handle to the IMG
  $("#pointsCanvas").width = img.clientWidth;
  $("#pointsCanvas").height = img.clientHeight;


}
window.onload = initApp;


//
// // Get the modal
// var modal = document.getElementById('myModal');
//
//
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks on the button, open the modal
// $("#btn_add").onclick = function() {
//     modal.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
$("#span_close").onclick = function() {
    modal.style.display = "none";
}
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
