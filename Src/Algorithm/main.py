from flask import Flask, render_template, request, jsonify, send_file
import numpy as np
import scipy.misc
import base64
from io import BytesIO
from test import *
import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")



@app.route('/denoisify', methods=['GET', 'POST'])
def denoisify():
    if request.method == "POST":
        inputImg = request.files['file']
        outputImg = denoise(inputImg)
        txt=inputImg.filename
        print(txt)
        filename=txt[txt.rfind('/')+1:]
        baseurl=txt[:txt[:txt.rfind('/')].rfind('/')+1]
        print(baseurl)
        groundTruth="/home/quest/DataSets/groundtruth/"+filename
        g=returnGround(groundTruth)
        scipy.misc.imsave('static/output.png', outputImg)
        scipy.misc.imsave('static/gro.png', g)
        return jsonify(result="Success")


if __name__=="__main__":
    app.run(host="0.0.0.0",port="8082")
