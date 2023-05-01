var fileChoice = ""
var time = "2013"
var xAxis = "dag"
var yAxis = "potentialearnings"
var personId = ""

var personIdData={}
var currentDataSet=null
var idcol={}

var getdata = function(){
  if((time!='')&&(xAxis!="")&&(yAxis!="")){
    getSelectedData()
  }

}



var fillList = function(menuId,functionId,data){
  document.getElementById(menuId).innerHTML = ""
  for (f in data) {
    fstring = "'"+data[f]+"'"
    line = '<option onclick="'+functionId+'('+fstring+')">' + data[f] + '</option>'
    document.getElementById(menuId).innerHTML += line
  }
}

var fillSelect = function(menuId,functionId,data){
  console.log(menuId);
  document.getElementById(menuId).innerHTML = ""
  for (f in data) {
    fstring = "'"+data[f]+"'"
    line = '<option onclick="'+functionId+'()">' + data[f] + '</option>'
    document.getElementById(menuId).innerHTML += line
  }
}

var fillTable = function(data){
  let head = "<tr>"
  let c=0
  for (f in data) {
    strfun = 'plotchoice("'+data[f]+'")'
    head += '<th style = "color: green; cursor: pointer;" id = "header'+data[f]+'" onclick='+strfun+'>'+data[f]+"</th>"
    c++; 
  }
  head+="</tr>" 
  document.getElementById("pheader").innerHTML=head
}
var setXaxis = function(){
  let select = document.getElementById('xaxismenu');
  xAxis = select.options[select.selectedIndex].text;  
  getdata()
}

var setTime = function(){
  let select = document.getElementById('timemenu');
  let time = select.options[select.selectedIndex].text;  
  document.getElementById("groupbylabel").innerHTML=time
  getunique(time)
}

var setYaxis = function(){
  let select = document.getElementById('yaxismenu');
  yAxis= select.options[select.selectedIndex].text;  
  getdata()

}
var setGroup = function(){
  let select = document.getElementById('groupbymenu');
  time = select.options[select.selectedIndex].text;  
  getdata()

}



// var headermenu = function (data) {
//   document.getElementById("filelable").innerHTML="Files"
//   fillList("headermenu","getunique",data)
//   fillSelect("xaxismenu","setXaxis",data)
//   fillSelect("yaxismenu","setYaxis",data)
//   fillSelect("timemenu","setTime",data)
// }


var groupbymenu = function (data) {
  fillSelect("groupbymenu","setGroup",data)
  }


var output = function (data) {
  console.log(data);
}



/*
First function called gets oll the files from tha data folder
*/
var getfiles = function () {
  var url = new URL("http://127.0.0.1:5432/getfiles");
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => filemenu(json)) // Fills the file menu
    .catch((err) => console.log("Request Failed", err));

}


var filemenu = function (data) { // load the file menu with all the files 
  fillList("filemenu","getfileheaders",data)  // will call getfileheadres when clicked
  
}

var getfileheaders = function (file) {
  fileChoice = file
  var url = new URL("http://127.0.0.1:5432/getfileheaders");
  url.searchParams.append("file", file);
  document.getElementById("filelable").innerHTML="Loading"
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => headermenu(json)) //print data to console
    .catch((err) => console.log("Request Failed", err));

}

var headermenu = function (data) {
  document.getElementById("filelable").innerHTML="Files"
  // fillList("headermenu","getunique",data)
  fillSelect("xaxismenu","setXaxis",data)
  fillSelect("yaxismenu","setYaxis",data)
  fillSelect("timemenu","setTime",data)
  fillTable(data)

}

var getunique = function (header) {
  var url = new URL("http://127.0.0.1:5432/getunique");
  url.searchParams.append("header", header);
  url.searchParams.append("fileChoice", fileChoice);
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => groupbymenu(json)) //print data to console
    .catch((err) => console.log("Request Failed", err)); // Catch errors
};


var getSelectedData = function () {
  var url = new URL("http://127.0.0.1:5432/getdata");
  url.searchParams.append("year", time);
  url.searchParams.append("x_axis", xAxis);
  url.searchParams.append("y_axis", yAxis);
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => scatter.draw(json,xAxis,yAxis)) //print data to console
    .catch((err) => console.log("Request Failed", err)); // Catch errors
};


var getTestData = function () {
  var url = new URL("http://127.0.0.1:5432/getdata");
  time = 2015
  xAxis = 'dag'
  yAxis = 'potentialearnings'
  url.searchParams.append("year", time);
  url.searchParams.append("x_axis", xAxis);
  url.searchParams.append("y_axis", yAxis);
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => scatter.draw(json,xAxis,yAxis)) //print data to console
    .catch((err) => console.log("Request Failed", err)); // Catch errors
};

var getPersonData = function () {
  var url = new URL("http://127.0.0.1:5432/getpersondata");
  url.searchParams.append("id_person", personId);
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => outdata(json)) //print data to console
    .catch((err) => console.log("Request Failed", err)); // Catch errors
};

var outdata = function(data){
  if(currentDataSet==null){
    currentDataSet = data
  }
  else{
    currentDataSet=currentDataSet.concat(data)
  }
  currentDataSet.sort(function(a,b) {
    return b.time - a.time
  });
  document.getElementById("pdata").innerHTML=""
  let body = ""
  for(let i=0 ;i< currentDataSet.length;i++){
    id = currentDataSet[i].id_person
    body+='<tr style="background-color:'+idcol[id.toString()]+'">'
    for (let key in currentDataSet[i]){
      body += '<td style="color:#ffffff" >'+currentDataSet[i][key]+"</td>"
    }
    body+="</tr>"
  }
  document.getElementById("pdata").innerHTML+=body
  
}

var clearGraph = function(){
  console.log("clear");
  fileChoice = ""
  time = "2013"
  xAxis = ""
  yAxis = ""
  personId = ""
  
  personIdData={}
  currentDataSet=null
  idcol={}
  document.getElementById("lineplot").innerHTML=""
  var res = document.getElementById("pheader").getElementsByTagName('th');
  for(el in res){
    if(res[el]== Object){
      res[el].style.color = "green"    
    }
  }
  document.getElementById("pdata").innerHTML =""
  document.getElementById("plot").innerHTML=""
  scatter = new ScatterPlot("plot")
  getfiles()
}

var clearSelect = function(){
  console.log("clear");
  personId = ""
  personIdData={}
  currentDataSet=null
  idcol={}
  document.getElementById("lineplot").innerHTML=""
  document.getElementById("pdata").innerHTML =""
  document.getElementById("plot").innerHTML=""
  scatter = new ScatterPlot("plot")
  document.getElementById("lineplot").style.visibility='hidden'
  getdata()
}

var plotchoice = function(key){

  document.getElementById("header"+key).style.color = "red"
  let data =[]
  for(let i=0 ;i< currentDataSet.length;i++){
     data.push({id:currentDataSet[i].id_person,date:currentDataSet[i].time,"value":currentDataSet[i][key]})
  }
  let line = new LinePlot("lineplot","Year",key)
  line.update(data,"id")
}
let scatter = new ScatterPlot("plot")
getfiles()