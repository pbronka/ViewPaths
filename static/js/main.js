var fileChoice = ""
var group = ""
var xAxis = ""
var yAxis = ""



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
  var x = select.options[select.selectedIndex].text;  
  console.log("x"+x);
  xAxis=x
}
var setYaxis = function(){
  let select = document.getElementById('yaxismenu');
  let y = select.options[select.selectedIndex].text;  
  console.log("y"+x);
  yAxis=y
}
var setGroup = function(){
  let select = document.getElementById('groupbymenu');
  let x = select.options[select.selectedIndex].text;  
  console.log("g"+x);
  group=x
}

var filemenu = function (data) {
  fillList("filemenu","getfileheaders",data)
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

var getdata = function (year) {
  var url = new URL("http://127.0.0.1:5432/getdata");
  url.searchParams.append("year", year);
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => update(json)) //print data to console
    .catch((err) => console.log("Request Failed", err)); // Catch errors
};


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


var getfiles = function () {
  var url = new URL("http://127.0.0.1:5432/getfiles");
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => filemenu(json)) //print data to console
    .catch((err) => console.log("Request Failed", err));

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
console.log("0.006");

getfiles()