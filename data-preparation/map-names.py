#map names for paths to names in wikipedia data

import pandas as pd
import numpy as np

greek = pd.read_csv("helper-csvs/greek.csv")
pathnums = pd.read_csv("helper-csvs/pathnums.csv")
names = pd.read_csv("helper-csvs/names.csv")
stars = pd.read_csv("helper-csvs/stars.csv")
manual_names = pd.read_csv("helper-csvs/manual_names.csv", encoding='latin1')
manual_HD = pd.read_csv("helper-csvs/manual_HD.csv", encoding='latin1')

#manually convert names without matches
def replace(name):   
    #fix typos in website
    name = name.replace("Leporus", "Leporis")
    name = name.replace("Ophichi", "Ophiuchi")
    name = name.replace("Theya", "Theta")
    
    search = manual_names.loc[manual_names["Name"] == name]
    if len(search) == 1:
        search = search.iloc[0]
        return search["Name_Converted"]
    return name 

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
def search(name, name_converted, constellation):
    #search if name matches official name
    searchNameResult = stars.loc[stars["Name"] == name_converted]
    #search if name is listed in notes
    searchNotesResult = stars["Notes"].apply(lambda x: name_converted in str(x))
    
    if len(searchNameResult) == 1:
        return searchNameResult.iloc[0].HD
    elif sum(searchNotesResult) == 1:
        idx = np.where(searchNotesResult)[0][0]
        return stars.iloc[idx].HD
    else: #if no matches or multiple matches need to manually find number
        filterByConstellation = manual_HD.loc[manual_HD["Constellation"] == constellation]
        searchHD = filterByConstellation.loc[filterByConstellation["Name"] == name]
        return searchHD.iloc[0].HD
       
pathnums["Name"] = pathnums["Name"].apply(lambda x: replace(x))
pathnums["Name_Converted"] = pathnums.apply(lambda x: convertName(x["Name"], x["Constellation"]), axis=1)
pathnums["HD"] = pathnums.apply(lambda x: search(x["Name"], x["Name_Converted"], x["Constellation"]), axis=1)
pathnums["HD"] = pd.to_numeric(pathnums["HD"])
stars["HD"] = pd.to_numeric(stars["HD"], errors="coerce")
stars.drop_duplicates(subset="HD", inplace=True)

#create combined file
mapping = pathnums.merge(stars, how="inner", on="HD")
mapping = mapping[["Number", "Constellation_x", "HD", "RA", "Dec", "vis.mag."]]
mapping.rename(columns={"Constellation_x":"Constellation", "vis.mag.":"Mag"}, inplace=True)

mapping.to_csv("path_mappings.csv", index=False)