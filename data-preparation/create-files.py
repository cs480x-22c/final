#create geojson from paths and path mappings

import pandas as pd
import json

#convert numbers to latitude and longitude
def convertToLon(n, constellation):
    constellationData = mappings[mappings["Constellation"] == constellation]
    data = constellationData.loc[constellationData["Number"] == n]
    return data.iloc[0].Lon

def convertToLat(n, constellation):
    #print(n, constellation)
    constellationData = mappings[mappings["Constellation"] == constellation]
    data = constellationData.loc[constellationData["Number"] == n]
    return data.iloc[0].Lat

def makeFeature(constellation):    
    constellationData = paths[paths["Name"] == constellation]
    
    typeField = "Feature"
    idField = names.loc[names["Name"] == constellation].iloc[0].Abbreviation
    nameField = constellation
    geometryType = "MultiLineString"
    
    geometryCoordinates = []
    for index, row in constellationData.iterrows():
        coordinate = [[row.StartLon, row.StartLat], [row.EndLon, row.EndLat]]
        geometryCoordinates.append(coordinate)
    
    properties = {"name": nameField}
    geometry = {"type": geometryType, "coordinates": geometryCoordinates}
    
    feature = {"type": typeField, "id": idField, "properties": properties, "geometry": geometry}
    return feature

def makeGeoJSON(file, names):
    features = []
    for name in names:
        feature = makeFeature(name)
        features.append(feature)
    data = {"type":"FeatureCollection", "features":features}
    
    with open('../' + file, 'w') as f:
       json.dump(data, f)

paths = pd.read_csv("paths.csv")
mappings = pd.read_csv("path_mappings.csv")
names = pd.read_csv("helper-csvs/names.csv")

paths["StartLat"] = paths.apply(lambda x: convertToLat(x["Start"], x["Name"]), axis=1)
paths["StartLon"] = paths.apply(lambda x: convertToLon(x["Start"], x["Name"]), axis=1)
paths["EndLat"] = paths.apply(lambda x: convertToLat(x["End"], x["Name"]), axis=1)
paths["EndLon"] = paths.apply(lambda x: convertToLon(x["End"], x["Name"]), axis=1)

makeGeoJSON("paths.geojson", names.Name)

#get stars that are used in paths
start_df = paths[["Name", "Start"]]
start_df.rename(columns={"Start": "Number", "Name": "Constellation"}, inplace=True)
end_df = paths[["Name", "End"]]
end_df.rename(columns={"End": "Number", "Name": "Constellation"}, inplace=True)
nums_used = pd.concat([start_df, end_df])
nums_used.drop_duplicates(subset=["Constellation", "Number"], inplace=True)
stars = nums_used.merge(mappings, on=["Constellation", "Number"])
stars.to_csv("../stars.csv", index=False)