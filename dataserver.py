from flask import Flask, render_template, request
import threading
import webbrowser
import json 
import pandas as pd
import os

df=None

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
    return json.dumps(csv_files)

@app.route("/getunique", methods = ['GET'])
def getunique():
    global df
    fileChoice = request.args.get("fileChoice")
    header = request.args.get("header")
    return json.dumps(pd.unique(df[header]).tolist())
    
@app.route("/getfileheaders", methods = ['GET'])
def getfileheaders():
    global df
    file_name = request.args.get("file")
    with open("Data/"+file_name) as f:
        first_line = f.readline().rstrip().split(",")
        print(first_line)
    df = pd.read_csv('Data/'+file_name,low_memory=False,index_col=None)
    return json.dumps(first_line)

@app.route("/getdata", methods = ['GET'])
def getdata():
  year = request.args.get('year')
  x_axis = request.args.get('x_axis')
  y_axis = request.args.get('y_axis')
  print(type(year),year)
  df_slect = df[df['time'] == int(year)]
  return df_slect[['id_person',x_axis,y_axis]].to_json(orient='records')    

@app.route("/getpersondata", methods = ['GET'])
def getpersondata():
  id_person = request.args.get('id_person')
  print(id_person)
  df_slect = df[df['id_person'] == int(id_person)]
  return df_slect.to_json(orient='records')  


if __name__ == "__main__":
    port = 5432
    url = "http://127.0.0.1:{0}".format(port)
    # time lag for serve to start before webpage called
    threading.Timer(1.25, lambda: webbrowser.open(url) ).start()
    app.run(port=port, debug=False)
