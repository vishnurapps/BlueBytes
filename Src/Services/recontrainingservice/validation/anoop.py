# from flask import Flask, render_template, request, jsonify, send_file
# import numpy as np
# import scipy.misc
# import base64
# from io import BytesIO
# from test import *
# import time
# import sys

# if __name__=="__main__":
#     inputImage = sys.argv[1]
#     outputPath = sys.argv[2]+'vishnu.png'
#     print(inputImage)
#     print(outputPath)
#     outputImage = denoise(inputImage)
#     scipy.misc.imsave(outputPath, outputImage)

import numpy as np
import scipy.misc
from test import *
import sys

inputImage = sys.argv[1]
outputPath = sys.argv[2]
outputImage = denoise(inputImage)
scipy.misc.imsave(outputPath, outputImage)
