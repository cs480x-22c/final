#scrape data and save in .csv files

import pandas as pd
import requests
from bs4 import BeautifulSoup 

#scrape wikipedia constellation information 
def scrape(name):
    base_url = "https://en.wikipedia.org/wiki/List_of_stars_in_"
    name_url = name.replace(" ", "_")
    url = base_url + name_url
    response = requests.get(url)
    
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", {"class":"wikitable"})
    
    df = pd.read_html(str(table))
    df = pd.DataFrame(df[0])
    df["Constellation"] = name
    df = df.iloc[:-2 , :]
    return df

#scrape seasky constellation information
def scrape2(name):
    base_url = "http://www.seasky.org/constellations/constellation-"
    name_url = name.replace(" ", "-").lower()
    
    name_url = name_url.replace("ö", "o") #Boötes breaks stuff
    
    url = base_url + name_url + ".html"
    response = requests.get(url)
    
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("div", {"class":"text2"}).text
    table = table.replace("\t", "")
    
    names = table.split("\n")
    names = names[1:-1]
    
    df = pd.DataFrame();
    df["Number"] = range(1, len(names) + 1)
    df["Name"] = names
    df["Name"] = df["Name"].apply(lambda x: x.strip())
    df["Constellation"] = name
    return df

star_dfs = [] #star names and locations
pathnums_dfs = [] #map stars to numbers for paths

names = pd.read_csv("helper-csvs/names.csv")
for name in names.Name:
    print(name)
    star_dfs.append(scrape(name))
    if name != "Norma" and name != "Caelum" and name != "Scorpius" and name != "Crux": #incorrect data
        pathnums_dfs.append(scrape2(name))

star_df = pd.concat(star_dfs)
pathnums_df = pd.concat(pathnums_dfs)

#remove messier objects since they are not stars
messier = []
for i in range(1, 110 + 1):
    messier.append("M" + str(i))
messier.append("Large Magellanic Cloud")
not_messier = pathnums_df["Name"].apply(lambda x: x not in messier)
pathnums_df = pathnums_df[not_messier]

star_df.to_csv("helper-csvs/stars.csv", index=False)
pathnums_df.to_csv("helper-csvs/pathnums.csv", index=False)