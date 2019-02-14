import gdcm
import sys
from os import listdir, system
from os.path import isfile, join
if __name__ == "__main__":
    mypath='/home/vishnu/Projects/series-000001/'
    oppath='/home/vishnu/Projects/output/'
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    for files in onlyfiles:
        file1= mypath+files
        file2 = oppath+files

  #file1 = sys.argv[1] # input filename
  #file2 = sys.argv[2] # output filename

        reader = gdcm.ImageReader()
        reader.SetFileName( file1 )

        if not reader.Read():
            sys.exit(1)

        change = gdcm.ImageChangeTransferSyntax()
        change.SetTransferSyntax( gdcm.TransferSyntax(gdcm.TransferSyntax.ImplicitVRLittleEndian) )
        change.SetInput( reader.GetImage() )
        if not change.Change():
            sys.exit(1)

        writer = gdcm.ImageWriter()
        writer.SetFileName( file2 )
        writer.SetFile( reader.GetFile() )
        writer.SetImage( change.GetOutput() )

        if not writer.Write():
            sys.exit(1)
