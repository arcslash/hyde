#!/usr/bin/env python
from core import *
from PIL import Image
import numpy as np
import cv2
import scipy.misc
from subprocess import call
import time

typex = 'bra'
needtrain = False

def run():

    if needtrain:
        x_train, y_train, x_test, y_test = utils.load_dataset()
        models.train_main_model(x_train, y_train)
    x_off = 100
    y_off = 50
    filename = "core/testcalibnew1.jpg"
    y_predict = models.predict_main_model(filename)
    points = y_predict[0]
    img = Image.open(filename)
    img.save("core/outputs/original.jpg")
    threshold = 0.8


    x_off_p = 60
    y_off_p = 60
    print("[+]No of points:",len(points)/2)
    file = open("core/outputs/areas.txt","w")
    file.write(str(0 if(typex == "panty") else 1) + '\n')
    file.close()
    for i in range(0,len(points),2):
        area = (points[i] - x_off_p, points[i+1] - y_off_p, points[i] + x_off_p , points[i+1] + y_off_p )
        cropped_img = np.array(img.crop(area).convert('L'))
        scipy.misc.imsave("core/outputs/cropped_"+str(int(i/2))+".jpg", cropped_img)
        file = open("core/outputs/areas.txt","a")
        # file.write(str(area) + '\n')
        file.write(str(area[0]) +'\n' + str(area[1]) + '\n')
        file.close()

    print("[+]Running Nihals code")
    #call(["cmake","core/build"])
    call(["make"])
    call(["./corner"])
    #time.sleep(3)
    call(["./kitty"])


if __name__ == '__main__':
    print("[+]Running individually as the main module")
    run()
