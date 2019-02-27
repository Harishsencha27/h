var corsURL = ""
corsURL = "https://cors-anywhere.herokuapp.com/"

//var url = "http://127.0.0.1:5000";  //Local Running
var url = "http://3.209.1.133";  //AWS Running

url = corsURL + url 

function addCat(){
    var cUrl = url + "/api/v1/categories";
    var catName = document.getElementById("catName").value;
    var data = [catName];
    var json = JSON.stringify(data);
    console.log(data)

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", cUrl, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhttp.onreadystatechange = function () {

      if (xhttp.readyState == 4){
        var users = xhttp.responseText;
        console.log(users)
      }
      if (xhttp.readyState == 4 && xhttp.status == "201") {
        console.log("Im here")
        window.location.href = "homepage.html";
      } else if(xhttp.readyState == 4) {
        alert(users);
      }

    }
    xhttp.send(json);
}

function pCat(){
  var cUrl = url + "/api/v1/categories";
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", cUrl, true);

  xhttp.onreadystatechange = function () {

      if (xhttp.readyState == 4){
        //console.log(xhttp.responseText)
        var users = xhttp.responseText;
        users = JSON.parse(users)
        console.log(users)
      }

      if (xhttp.readyState == 4 && xhttp.status == "200") {

            
            var arr = [];

            for(var k in users) 
            {
              arr.push(k);
              console.log(k)
            }

            console.log(arr)
            var i;

            for(i = 0; i<arr.length; i++)
            {

              var innerDiv = document.createElement("div");
              innerDiv.setAttribute("class","desc")

              var a = document.createElement("a");
              a.setAttribute("href","acts.html?cname="+arr[i])

              var node = document.createTextNode(arr[i]);

              a.appendChild(node);

              innerDiv.appendChild(a);

              var div = document.getElementById("mainDiv");
              div.appendChild(innerDiv);
            }
      } 


      else if(xhttp.readyState == 4) {
        alert(users);
      }

    }
    
    xhttp.send();

}

function delCat(){

    var catName = document.getElementById("delCat").value;
    var cUrl = url + "/api/v1/categories/" + catName;
    var xhttp = new XMLHttpRequest()
    xhttp.open("DELETE", cUrl, true);

    xhttp.onreadystatechange = function () {

      if (xhttp.readyState == 4){
        var users = xhttp.responseText;
        console.log(users)
      }
      if (xhttp.readyState == 4 && xhttp.status == "200") {
        console.log("Im here")
        window.location.href = "homepage.html";
      } else if(xhttp.readyState == 4) {
        alert(users);
      }

    }
    xhttp.send(null);

}