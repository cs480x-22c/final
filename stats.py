import os
from glob import glob
from PIL import Image
from tqdm import tqdm
import numpy as np

stats = {}

for netcdf in tqdm(glob('./processed/*.png')):
    src = os.path.abspath(netcdf)
    key = os.path.basename(src)
    # Open an already existing image
    imageObject = Image.open(src)
    x = np.asarray(imageObject)[:, :, 0] # Get the red channel
    bin = (x==255).astype(int)
    stats[key] = int(bin.sum())

import json
with open('stats.json', 'w') as f:
    json.dump(stats, f)