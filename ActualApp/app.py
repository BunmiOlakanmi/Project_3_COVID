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

<<<<<<< Updated upstream
#connect to MongoDB Atlas database
client= MongoClient("mongodb://dbUser:dbUser@cluster0-shard-00-00.lfpww.mongodb.net:27017,cluster0-shard-00-01.lfpww.mongodb.net:27017,cluster0-shard-00-02.lfpww.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-za5qq0-shard-0&authSource=admin&retryWrites=true&w=majority")
db = client.covid_db
=======
#app.config['MONGO_DATABASE_URI'] ="mongodb://dbUser:dbUser@cluster0-shard-00-00.lfpww.mongodb.net:27017,cluster0-shard-00-01.lfpww.mongodb.net:27017,cluster0-shard-00-02.lfpww.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-za5qq0-shard-0&authSource=admin&retryWrites=true&w=majority"

#mongo = PyMongo(app)
>>>>>>> Stashed changes

#Front end route
@app.route('/')
def index():
    return render_template("index.html")

#service route
@app.route("/api")
def stringencyRoute():
<<<<<<< Updated upstream
    data= db.collection_stringency.find()
    json_docs = []
    for doc in data:
        json_doc = json.dumps(doc, default=json_util.default)
        json_docs.append(json_doc)
    return jsonify(json_docs)
=======
    return "welcome" 
    #return jsonify(data)
>>>>>>> Stashed changes

if __name__ == "__main__":
    app.run(debug=True)