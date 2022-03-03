import os
from glob import glob
from PIL import Image
from tqdm import tqdm

for netcdf in tqdm(glob('./data/*.nc')):
    try:
        src = os.path.abspath(netcdf)
        dst = './processed/'+os.path.splitext(os.path.basename(netcdf))[0] + '.png'

        os.system(f'gdal_translate -a_nodata 0 NETCDF:"{netcdf}":Mask mask.tif  > /dev/null')
        os.system(f'gdal_calc.py -X mask.tif --outfile=mask1.tif --calc="(X!=201)*X" --NoDataValue=0  > /dev/null')
        os.system('gdal_calc.py -X mask1.tif --outfile=mask2.tif --calc="(X!=200)*X" --NoDataValue=0  > /dev/null')
        # os.system('gdal_calc.py -X mask2.tif --outfile=mask3.tif --calc="(X!=10)*X" --NoDataValue=0')
        os.system('gdal_calc.py -X mask2.tif --outfile=mask4.tif --calc="(X>11)*255+(X<=11)*X" --NoDataValue=0  > /dev/null')
        os.system(f'gdal_translate mask4.tif {dst}  > /dev/null')
        os.remove('mask.tif')
        os.remove('mask1.tif')
        os.remove('mask2.tif')
        # os.remove('mask3.tif')
        os.remove('mask4.tif')
        # Open an already existing image
        imageObject = Image.open(dst)
        # Do a flip of left and right
        img = imageObject.transpose(Image.FLIP_LEFT_RIGHT)
        img = img.convert("RGB")
        pixdata = img.load()
        # Clean the background noise, if color != white, then set to black.
        for y in range(img.size[1]):
            for x in range(img.size[0]):
                if pixdata[x, y] == (255, 255, 255):
                    pixdata[x, y] = (255, 0, 0)
        img.save(dst)
    except:
        print(f"error on image {netcdf}")