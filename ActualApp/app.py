import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_mongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DATABASE_URI'] ="mongodb://dbUser:dbUser@cluster0-shard-00-00.lfpww.mongodb.net:27017,cluster0-shard-00-01.lfpww.mongodb.net:27017,cluster0-shard-00-02.lfpww.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-za5qq0-shard-0&authSource=admin&retryWrites=true&w=majority"

mongo = PyMongo(app)

#Front end route
@app.route('/')
def index():
    return render_template("index.html")

#service route
@app.route("/api")
def stringencyRoute():
      
    return jsonify(data)

if __name__ == "__main__":
    app.run()