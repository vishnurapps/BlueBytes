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

allfiles = [f for f in listdir(oppath) if isfile(join(oppath, f))]

for files in pbar(allfiles):
    img = cv2.imread(oppath+files)
    resze = cv2.resize(img,(256, 256))
    downsize = resze[56:200:,:]
    cv2.imwrite(groundpath+files, downsize)
    noise_img = sp_noise(downsize,0.005)
    cv2.imwrite(finalpath+files, noise_img)
    blurred_img = cv2.GaussianBlur(downsize,(5,5),10)
    cv2.imwrite(blur+files, blurred_img)
    blur_noise_img = cv2.GaussianBlur(noise_img,(5,5),10)
    cv2.imwrite(blurnoise+files, blur_noise_img)

