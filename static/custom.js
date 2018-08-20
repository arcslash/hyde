var live_video = true;
var video_path = "static/test_image.jpg";

function measure(){
  if(live_video){
    $.get('http://localhost:5000/measure');
    video_path = "static/test_image.jpg"
    $('#video_feed').attr('src') = video_path;
    live_video = false;
  }else{
    video_path = "http://localhost:5000/video_feed";
    $('#video_feed').attr('src') = video_path;

  }

}
