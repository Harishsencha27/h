//HTML and Flask Intergration using AJAX XMLHTTPRequest

var corsURL = ""
corsURL = "https://cors-anywhere.herokuapp.com/"

//var url = "http://127.0.0.1:5000";  //Local Running
var url = "http://3.209.1.133";  //AWS Running

url = corsURL + url


function upvote(e){
    var cUrl = url + "/api/v1/acts/upvote"

    var voteBTN = e.target;
    var actId = voteBTN.getAttribute("id");
    console.log(actId);
    data = [actId]
    var json = JSON.stringify(data)
    console.log(json)

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", cUrl, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhttp.onreadystatechange = function () {

          if (xhttp.readyState == 4){
            var users = xhttp.responseText;
            console.log(users)
          }
          if (xhttp.readyState == 4 && xhttp.status == "200") {
            console.log("Im here")
            window.location.reload()
          } else if(xhttp.readyState == 4) {
            alert(users);
          }

      }

    xhttp.send(json);
}


function delAct(){

    var actId = document.getElementById("delName").value;
    var cUrl = url + "/api/v1/acts/" + actId;
    var xhttp = new XMLHttpRequest()
    xhttp.open("DELETE", cUrl, true);

    xhttp.onreadystatechange = function () {

      if (xhttp.readyState == 4){
        var users = xhttp.responseText;
        console.log(users)
      }
      if (xhttp.readyState == 4 && xhttp.status == "200") {
        window.location.reload()
      } else if(xhttp.readyState == 4) {
        alert(users);
      }

    }
    xhttp.send(null);

}

function upload(){

      cUrl = url + "/api/v1/acts";
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", cUrl, true);
      xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      
      data = {}
      var actID = Math.floor(Math.random()*10000) + 1;
      data["actId"] = actID

      var uname = document.getElementById("UpUname").value;
      data["username"] = uname

      timestamp = "01-12-2019:59-59-01"
      data["timestamp"] = timestamp

      var caption = document.getElementById("ta").value;
      data["caption"] = caption

      var query = window.location.search.substring(1);
      var qs = parse_query_string(query);
      cname = qs["cname"];
      data["categoryName"] = cname
      
      var newb64 = b64.replace(/.*,/,'')
      data["imgB64"] = newb64

      console.log(data)
      var json = JSON.stringify(data)
      console.log(json)

      xhttp.onreadystatechange = function () {

          if (xhttp.readyState == 4){
            var users = xhttp.responseText;
            console.log(users)
          }
          if (xhttp.readyState == 4 && xhttp.status == "201") {
            console.log("Im here")
            window.location.reload()
          } else if(xhttp.readyState == 4) {
            alert(users);
          }

      }

      xhttp.send(json);

}

function previewFile() {
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
  reader.addEventListener("load", function () {
    b64 = reader.result
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function loadActs(){

    var query = window.location.search.substring(1);
    var qs = parse_query_string(query);
    cname = qs["cname"];
    
    cUrl = url + "/api/v1/categories/"+cname+"/acts";
    console.log(cUrl);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", cUrl, true);

    xhttp.onreadystatechange = function () {


        if (xhttp.readyState == 4){
          var list = xhttp.responseText;
          list = JSON.parse(list)
        }

        if (xhttp.readyState == 4 && xhttp.status == "200") {

            for(var i=0;i<list.length;i++){

                currDict = list[i]

                var obj = JSON.parse(JSON.stringify(currDict))

                gDiv = document.createElement("div");
                gDiv.setAttribute("class","gallery");

                var actId = document.createElement("label");
                actId.setAttribute("class","actID");
                actId.innerHTML = obj.actId;

                gDiv.appendChild(actId);

                var image = document.createElement("img");
                image.setAttribute("src", "data:image/png;base64," + obj.imgB64);
                image.setAttribute("class", "imgact")
                image.setAttribute("width", 600)
                image.setAttribute("height", 400)

                gDiv.appendChild(image);

                cDiv = document.createElement("div");
                cDiv.setAttribute("class","desc");
                cDiv.innerHTML = obj.caption;

                gDiv.appendChild(cDiv);

                vDiv = document.createElement("div");
                vDiv.setAttribute("class","like-content");

                voteBTN = document.createElement("button");
                voteBTN.setAttribute("class","btn-secondary like-review")
                voteBTN.setAttribute("id", obj.actId)
                voteBTN.addEventListener("click", upvote, false)

                css = document.createElement("i");
                css.setAttribute("class","fa fa-heart")
                css.setAttribute("aria-hidden","true")

                voteBTN.appendChild(css);

                voteBTN.innerHTML = "VOTE";

                vDiv.appendChild(voteBTN);

                var upV = document.createElement("label");
                upV.setAttribute("class","noOfVotes");
                upV.innerHTML = obj.upvotes;

                vDiv.appendChild(upV);

                gDiv.appendChild(vDiv);


                var mainDiv = document.getElementById("main");
                mainDiv.appendChild(gDiv);

            }
        }

        else if(xhttp.readyState == 4) {
          alert(list);
        }

       
    }

    xhttp.send(null);

}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}