import cv2
import numpy as np
import random
from os import listdir
from os.path import isfile, join
from progressbar import ProgressBar

pbar = ProgressBar()

oppath = '/home/quest/DataSets/png/'
groundpath = '/home/quest/DataSets/groundtruth/'
finalpath = '/home/quest/DataSets/toganpath/'
blurnoiseground = '/home/quest/DataSets/blurnoise/ground/'
blurnoise = '/home/quest/DataSets/blurnoise/togan/'
blurground = '/home/quest/DataSets/blur/blur/'
blur = '/home/quest/DataSets/blur/togan/'
blur1 = '/home/quest/DataSets/b1/'
blur2 = '/home/quest/DataSets/b2/'
blur3 = '/home/quest/DataSets/b3/'
blur4 = '/home/quest/DataSets/b4/'

def sp_noise(image,prob):
    '''
    Add salt and pepper noise to image
    prob: Probability of the noise
    '''
    output = np.zeros(image.shape,np.uint8)
    thres = 1 - prob 
    for i in range(image.shape[0]):
        for j in range(image.shape[1]):
            rdn = random.random()
            if rdn < prob:
                output[i][j] = 0
            elif rdn > thres:
                output[i][j] = 255
            else:
                output[i][j] = image[i][j]
    return output

#allfiles = [f for f in listdir(oppath) if isfile(join(oppath, f))]
allfiles = [f for f in listdir(groundpath) if isfile(join(groundpath, f))]

for files in pbar(allfiles):
    img = cv2.imread(groundpath+files)
    b1 = cv2.GaussianBlur(img,(5,5),10)
    cv2.imwrite(blur1+files, b1)
    b2 = cv2.GaussianBlur(img,(5,5),3)
    cv2.imwrite(blur2+files, b2)
    b3 = cv2.GaussianBlur(img,(5,5),.9)
    cv2.imwrite(blur3+files, b3)
    b4 = cv2.GaussianBlur(img,(3,3),.8)
    cv2.imwrite(blur4+files, b4)



