var fileChoice = ""

var filemenu = function (data) {
  document.getElementById("filemenu").innerHTML = ""
  for (f in data) {
    fstring = "'"+data[f]+"'"
    line = '<a class="dropdown-item" onclick="getfileheaders('+fstring+')">' + data[f] + '</a>'
    document.getElementById("filemenu").innerHTML += line
  }

}


var headermenu = function (data) {
  document.getElementById("headermenu").innerHTML = ""
  for (f in data) {
    fstring = "'"+data[f]+"'"
    line = '<a class="dropdown-item" onclick="getunique('+fstring+')">' + data[f] + '</a>'
    document.getElementById("headermenu").innerHTML += line
  }

}


var groupbymenu = function (lable,data) {
  document.getElementById("groupbymenu").innerHTML = ""
  document.getElementById("groupbylable").innerHTML = lable
  
  for (f in data) {
    fstring = "'"+data[f]+"'"
    line = '<a class="dropdown-item" onclick="getunique('+fstring+')">' + data[f] + '</a>'
    document.getElementById("groupbymenu").innerHTML += line
  }

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
    .then((json) => groupbymenu(header,json)) //print data to console
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
  document.getElementById("fileslable").innerHTML = fileChoice
  document.getElementById("output").innerHTML =fileChoice
  var url = new URL("http://127.0.0.1:5432/getfileheaders");
  url.searchParams.append("file", file);
  fetch(url)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => headermenu(json)) //print data to console
    .catch((err) => console.log("Request Failed", err));

}

document.getElementById("output").innerHTML = "MAIN"
getfiles()