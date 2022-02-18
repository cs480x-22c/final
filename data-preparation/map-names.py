#map names for paths to names in wikipedia data

import pandas as pd
import numpy as np

greek = pd.read_csv("greek.csv")
pathkey = pd.read_csv("path_keys.csv")
names = pd.read_csv("names.csv")
stars = pd.read_csv("stars.csv")

#convert greek name and genitive to greek symbol and abbreviation
def convertName(name, constellation):
    nameInfo = names.loc[names["Name"] == constellation].iloc[0]
    genitive = nameInfo["Genitive"]
    abbr = nameInfo["Abbreviation"]
    if genitive in name:
        name = name.replace(genitive, abbr)
    else:
        return name
        
    if "-" in name:
        first = name.split("-")[0]
    else:
        first = name.split()[0]
        
    greekInfo = greek.loc[greek["Name"] == first]
    if len(greekInfo) != 0:
        greekInfo = greekInfo.iloc[0]
        symbol = greekInfo["Symbol"]
        name = name.replace(first, symbol, 1)

    name = name.replace("-", "")
    return name

#find HD catalogue number
def search(name):
    #search if name matches official name
    searchNameResult = stars.loc[stars["Name"] == name]
    #search if name is listed in notes
    searchNotesResult = stars["Notes"].apply(lambda x: name in str(x))
    
    if len(searchNameResult) + sum(searchNotesResult) == 1:
        if len(searchNameResult) == 1:
            return searchNameResult.iloc[0].HD
        else:
            idx = np.where(searchNotesResult)[0][0]
            return stars.iloc[idx].HD
    else: #if no matches or multiple matches, need to manually find number
        return "Manual"
       
pathkey["Converted"] = pathkey.apply(lambda x: convertName(x["Designation"], x["Constellation"]), axis=1)
pathkey["HD"] = pathkey["Converted"].apply(lambda x: search(x))

pathkey.to_csv("path_keys.csv")