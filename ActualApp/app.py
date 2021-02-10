import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_pymongo import PyMongo
from pymongo import MongoClient
import json
from bson import json_util

app = Flask(__name__)


#connect to MongoDB Atlas database
client= MongoClient("mongodb://dbUser:dbUser@cluster0-shard-00-00.lfpww.mongodb.net:27017,cluster0-shard-00-01.lfpww.mongodb.net:27017,cluster0-shard-00-02.lfpww.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-za5qq0-shard-0&authSource=admin&retryWrites=true&w=majority")
db = client.covid_db


#Front end route
@app.route('/')
def index():
    return render_template("index.html")

#service route
#covid infection data route
@app.route("/api_covid_infection")
def infectionRoute():
    test=db.get_collection("collection_covid_infection").find()
    master_list=[]
    for i in test:
        master_list.append(i)
    for i in master_list:
        del i['_id']

    return jsonify(master_list)

#influenza data route
@app.route("/api_influenza")
def influenzaRoute():
    test=db.get_collection("collection_influenza").find()
    master_list=[]
    for i in test:
        master_list.append(i)
    for i in master_list:
        del i['_id']

    return jsonify(master_list)

#unemployment data route
@app.route("/api_unemployment")
def unemploymentRoute():
    test=db.get_collection("collection_unemployment").find()
    master_list=[]
    for i in test:
        master_list.append(i)
    for i in master_list:
        del i['_id']

    return jsonify(master_list)

if __name__ == "__main__":
    app.run(debug=True)