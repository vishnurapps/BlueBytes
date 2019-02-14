import os
urls = ['https://mri.radiology.uiowa.edu/VHDicom/VHFCT1mm/VHF-Ankle.tar.gz', 'https://mri.radiology.uiowa.edu/VHDicom/VHFCT1mm/VHF-Head.tar.gz', 'https://mri.radiology.uiowa.edu/VHDicom/VHFCT1mm/VHF-Hip.tar.gz', 'https://mri.radiology.uiowa.edu/VHDicom/VHFCT1mm/VHF-Knee.tar.gz', 'https://mri.radiology.uiowa.edu/VHDicom/VHFCT1mm/VHF-Pelvis.tar.gz', 'https://mri.radiology.uiowa.edu/VHDicom/VHFCT1mm/VHF-Shoulder.tar.gz', 'https://mri.radiology.uiowa.edu/VHDicom/VHMCT1mm/VHMCT1mm_Head.tar.gz', 'https://mri.radiology.uiowa.edu/VHDicom/VHMCT1mm/VHMCT1mm_Hip.tar.gz', 'https://mri.radiology.uiowa.edu/VHDicom/VHMCT1mm/VHMCT1mm_Pelvis.tar.gz', 'https://mri.radiology.uiowa.edu/VHDicom/VHMCT1mm/VHMCT1mm_Shoulder.tar.gz']
for url in urls:
    command = 'wget ' + url
    os.system(command)

