from flask import Flask, render_template, request
import threading
import webbrowser
import json 
import pandas as pd
import os

df = pd.read_csv('Data/Person.csv',low_memory=False,index_col=None)

app = Flask(__name__,static_url_path='', 
            static_folder='static',
            template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/getfiles")
def getfiles():
    csv_files =[]
    dir_list = os.listdir("Data")
    for f in dir_list:
        if "csv" in f:
            csv_files.append(f)
    print(csv_files)
    return json.dumps(csv_files)


@app.route("/getfileheaders", methods = ['GET'])
def getfileheaders():
    file_name = request.args.get("file")
    print(file_name)
    with open("Data/"+file_name) as f:
        first_line = f.readline().rstrip().split(",")
        print(first_line)
    return json.dumps(first_line)

@app.route("/getdata", methods = ['GET'])
def getdata():
  year = request.args.get('year')
  print(type(year),year)
  df_slect = df[df['time'] == int(year)]
  return df_slect[['id_person','dag','potentialearnings']].to_json(orient='records')    

if __name__ == "__main__":
    port = 5432
    url = "http://127.0.0.1:{0}".format(port)
    threading.Timer(1.25, lambda: webbrowser.open(url) ).start()
    app.run(port=port, debug=False)
