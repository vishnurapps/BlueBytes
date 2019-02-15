from os import listdir, system
from os.path import isfile, join
mypath = '/home/quest/DataSets/data/'
tmppath = '/home/quest/DataSets/tmpdir/'
oppath = '/home/quest/DataSets/output/'

#List Files
allfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

#Extarct files
for element in allfiles:
	command = 'tar -zxvf ' + mypath + element + ' -C ' + tmppath
	system(command)

#Move Files
command = 'find ' + tmppath + ' -type f -iname "*.dcm" -exec mv -t ' + oppath + ' {} + '
system(command)

#Create image

#Add Noise





