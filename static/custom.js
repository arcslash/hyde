var isCameraON = false;//true when camera is on
var video_path = "static/test_image.jpg";
// Get the button that opens the modal
var btn_add = document.getElementById("btn_add");//adding a button to add new garments
var style = window.getComputedStyle(document.documentElement);
var modal = document.getElementById('myModal');
var canvas= document.getElementById("pointsCanvas"),ctx = canvas.getContext("2d");

//mouse move positions
var xpos;
var ypos;

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
  ctx.canvas.width = img.clientWidth;
  ctx.canvas.height = img.clientHeight;
  ctx.fillStyle = "white";
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 100);
  ctx.stroke();


}
function getMouseMoves(mouseEvent){
  var obj = document.getElementById("pointsCanvas");
  var obj_left = 0;
  var obj_top = 0;

  while (obj.offsetParent){
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  if (mouseEvent){
    //FireFox
    xpos = mouseEvent.pageX;
    ypos = mouseEvent.pageY;
  }else{
    //IE
    xpos = window.event.x + document.body.scrollLeft - 2;
    ypos = window.event.y + document.body.scrollTop - 2;
  }
  xpos -= obj_left;
  ypos -= obj_top;
  document.getElementById("cordinates").innerHTML = xpos + ", " + ypos;
}

function getMouseClick(){
    var pointSize = 3; // Change according to the size of the point.
    ctx.fillStyle = "#ff2626"; // Red color

    ctx.beginPath(); //Start path
    ctx.arc(xpos, ypos, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
}
window.onload = initApp;
document.getElementById("pointsCanvas").onmousemove = getMouseMoves;
document.getElementById("pointsCanvas").onmouseup = getMouseClick;

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
