var update = function(data){
    console.log(data[0]);
    getfileheaders(data[0])
  }

  var output = function(data){
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
 
  
  var getfiles = function(){
    var url = new URL("http://127.0.0.1:5432/getfiles");
    fetch(url)
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => update(json)) //print data to console
      .catch((err) => console.log("Request Failed", err)); 

  }

  var getfileheaders = function(file){
    var url = new URL("http://127.0.0.1:5432/getfileheaders");
    url.searchParams.append("file", file);
    fetch(url)
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => output(json)) //print data to console
      .catch((err) => console.log("Request Failed", err)); 

  }

  document.getElementById("output").innerHTML="MAIN"
  getfiles()