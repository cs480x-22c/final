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
def replace(name, constellation):   
    #fix typos in website
    name = name.replace("Leporus", "Leporis")
    name = name.replace("Ophichi", "Ophiuchi")
    name = name.replace("Theya", "Theta")
    
    filterByConstellation = manual_names.loc[manual_names["Constellation"] == constellation]
    search = filterByConstellation.loc[filterByConstellation["Name"] == name]
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
    #print(name)
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
     
pathnums["Name"] = pathnums.apply(lambda x: replace(x["Name"], x["Constellation"]), axis=1)
#add manual pathnums
manual_pathnums = pd.read_csv("helper-csvs/manual_pathnums.csv")
pathnums = pd.concat([pathnums, manual_pathnums])
       
pathnums["Name_Converted"] = pathnums.apply(lambda x: convertName(x["Name"], x["Constellation"]), axis=1)
pathnums["HD"] = pathnums.apply(lambda x: search(x["Name"], x["Name_Converted"], x["Constellation"]), axis=1)
pathnums["HD"] = pd.to_numeric(pathnums["HD"])
stars["HD"] = pd.to_numeric(stars["HD"], errors="coerce")
stars.drop_duplicates(subset="HD", inplace=True)

#create combined file
mappings = pathnums.merge(stars, how="inner", on="HD")
mappings = mappings[["Number", "Constellation_x", "HD", "RA", "Dec", "vis.mag."]]
mappings.rename(columns={"Constellation_x":"Constellation", "vis.mag.":"Mag"}, inplace=True)

def raToDegree(ra): 
    hours = float(ra.split("h")[0])
    rest = ra.split("h")[1]
    
    minutes = float(rest.split("m")[0])
    rest = rest.split("m")[1]
    
    seconds = float(rest.split("s")[0])
    
    decimal = hours * 15 + minutes * 15 / 60 + seconds * 15 / 3600
    
    return -(decimal - 180)

def decToDegree(dec):
    dec = dec.replace("+", "")
    dec = dec.replace("−", "-")
    
    degree = float(dec.split("°")[0])
    rest = dec.split("°")[1]
    
    minutes = float(rest.split("′")[0])
    rest = rest.split("′")[1]
    
    seconds = float(rest.split("″")[0])
    
    decimal = degree + minutes / 60 + seconds / 3600
    
    return decimal

#get manual path mappings
manual_pathmappings = pd.read_csv("helper-csvs/manual_pathmappings.csv")
mappings = pd.concat([mappings, manual_pathmappings])

#convert to latitude and longitude
mappings["Lon"] = mappings.RA.apply(lambda x: raToDegree(x))
mappings["Lat"] = mappings.Dec.apply(lambda x: decToDegree(x))
mappings.drop(["RA", "Dec"], axis=1, inplace=True)

mappings.to_csv("path_mappings.csv", index=False)