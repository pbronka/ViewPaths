var fileChoice = ""
var time = ""
var xAxis = "dag"
var yAxis = "potentialearnings"
var personId = ""

var personIdData={}



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
  document.getElementById(menuId).innerHTML = ""
  for (f in data) {
    fstring = "'"+data[f]+"'"
    line = '<option onclick="'+functionId+'()">' + data[f] + '</option>'
    document.getElementById(menuId).innerHTML += line
  }
}

var setXaxis = function(){
  let select = document.getElementById('xaxismenu');
  xAxis = select.options[select.selectedIndex].text;  
  getdata()
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



var headermenu = function (data) {
  document.getElementById("filelable").innerHTML="Files"
  fillList("headermenu","getunique",data)
  fillSelect("xaxismenu","setXaxis",data)
  fillSelect("yaxismenu","setYaxis",data)
}


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
  getunique("time")
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
  console.log(personId);
  url.searchParams.append("id_person", personId);
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => outdata(json)) //print data to console
    .catch((err) => console.log("Request Failed", err)); // Catch errors
};
var outdata = function(data){
  let body = ""
  let head = "<tr>"
  console.log(data);
  for (let key in data[0]){
    head += "<th>"+key+"</th>"
  }
  head+="</tr>" 
  document.getElementById("pheader").innerHTML=head
  for(let i=0 ;i< data.length;i++){
    body+="<tr>"
    for (let key in data[i]){
      body += "<td>"+data[i][key]+"</td>"
    }
    body+="</tr>"
  }
  document.getElementById("pdata").innerHTML=body
  
}
console.log("main 0.0009");
let scatter = new ScatterPlot("plot")
getfiles()