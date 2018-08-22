#!/usr/bin/env python
from flask import Flask, render_template, Response
import cv2
from core import utils as utils
from core import models as models
from core.measure import run

app = Flask(__name__)

class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        success, image = self.video.read()
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()



@app.route('/')
def index():
    return render_template('index.html')

def gen(camera):
    while True:
        frame = camera.get_frame()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/measure_feed')
def measure_feed():
    success, image = cv2.imread('core/outputs/original_convert.jpg')
    ret, jpeg = cv2.imencode('.jpg', image)
    return jpeg.tobytes()
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/measure", methods=['GET', 'PUT'])
def measure():
    run()
    return "execution success"


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
