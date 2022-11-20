# Python program to read
# json file
  
  
import json
  
# Opening JSON file

with open('test.json', 'r') as f:
  
    # returns JSON object as 
    # a dictionary
    data = f.read()
    data = eval(data)


import pymongo  # package for working with MongoDB
mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
pomodoro_db = mongo_client['pomodoro']
centers_collection = pomodoro_db['centers']

for center in data:
    center['coordinates'] = {"lat": format(center['coordinates'][0], '.3f'), "lng": format(center['coordinates'][1], '.3f')}
    print(center)
    centers_collection.insert_one(center)

    
  

