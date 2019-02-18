import time
from progressbar import ProgressBar
from os import listdir
from os.path import isfile, join
pbar = ProgressBar()

#import tensorflow as tf
import numpy as np
import scipy.misc

from utils import merge_images,imsave
#from model import *

#from skimage import measure

groundpath = '/home/quest/DataSets/groundtruth/'
blurpath = '/home/quest/DataSets/blur/togan/'
trainingpath = '/home/quest/DataSets/combine/'

allfiles = [f for f in listdir(groundpath) if isfile(join(groundpath, f))]

for element in pbar(allfiles):
    image1 = scipy.misc.imread(blurpath+element, mode='RGB').astype('float32')
    image2 = scipy.misc.imread(groundpath+element, mode='RGB').astype('float32')
    img = merge_images(image1, image2)
    npad = ((56, 56), (0, 0), (0, 0))
    img = np.pad(img, pad_width=npad, mode='constant', constant_values=0)
    img = np.expand_dims(img, axis=0)
    #print(img[0].shape)
    scipy.misc.imsave(trainingpath+element, img[0])