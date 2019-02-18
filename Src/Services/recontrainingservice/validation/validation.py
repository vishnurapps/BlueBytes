import numpy as np
import scipy.misc
from test import *
import sys

inputImage = sys.argv[1]
outputPath = sys.argv[2]
outputImage = denoise(inputImage, outputPath)
#scipy.misc.imsave(outputPath, outputImage)

print("COMPLETED")
#pprint("PSNR")
#pprint("SSIM")
#print ("\n".join(sys.argv))
#print(inputFilePath)
#print(genFilePath)
