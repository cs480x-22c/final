from ftplib import FTP
from tqdm import tqdm

year = 0
daynumber = 0


import os
os.chdir('./data')

for i in tqdm(range(2003, 2021, 1)):
    for j in range(10, 12, 1):
        ftp = FTP(f'frostbite.ssec.wisc.edu')
        ftp.login("anonymous", "ftplib-example-1")
        ftp.cwd(f'{i}')
        try:
            FILENAME = f'{i}{15+30*j:03}.leads.nc'
            with open(FILENAME, 'wb') as f:
                ftp.retrbinary('RETR ' + FILENAME, f.write)
        except Exception as e:
            print(e)
    for j in range(0, 4, 1):
        ftp = FTP(f'frostbite.ssec.wisc.edu')
        ftp.login("anonymous", "ftplib-example-1")
        ftp.cwd(f'{i}')
        try:
            FILENAME = f'{i}{15+30*j:03}.leads.nc'
            with open(FILENAME, 'wb') as f:
                ftp.retrbinary('RETR ' + FILENAME, f.write)
        except Exception as e:
            print(e)