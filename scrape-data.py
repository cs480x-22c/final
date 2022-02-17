import pandas as pd
import requests
from bs4 import BeautifulSoup 

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
    
names = pd.read_csv("names.csv")
dfs = []
for name in names.Name:
    print(name)
    dfs.append(scrape(name))
    
df = pd.concat(dfs)

df.to_csv("constellations.csv")