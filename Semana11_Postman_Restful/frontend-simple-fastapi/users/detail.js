var URLSERVERdetail = "";

if(localStorage === null){
  window.location.href = "../404.html";
}

if(localStorage !== null && localStorage.getItem("backendUrl") !== null){
    const backendUrl = localStorage.getItem("backendUrl");
    URLSERVERdetail = backendUrl + "/users/";
}

var URLString = window.location.href.split('?');
var datosURL = URLString[1].split('&');
var idHTML = datosURL[0].replace("id=","");

console.log(URLString);
console.log(datosURL);
console.log(idHTML);
console.log(URLSERVERdetail);


function getUser() {

    // url al servidor REST - Peticion GET: 
    // http://localhost:5000/users/id_user 
    return fetch(URLSERVERdetail + idHTML)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(data);
                return appendData(data);
            }).catch((err) => {
                console.log(err);
            }) 
        });

}

function appendData(data){
    var con=document.getElementById("main-container")

    var c=document.createElement("div")
    c.textContent="ID: " + data.id                      
    con.appendChild(c);

    var d=document.createElement("div")
    d.textContent="Name: " + data.nameUser                      
    con.appendChild(d);

    var e=document.createElement("div")
    e.textContent="Email: " + data.emailUser                      
    con.appendChild(e);


    var buttons = document.getElementById("button-container");

    var button = document.createElement("button");
    button.innerHTML = "Cancelar";
    button.onclick = onbuttonclicked;
    buttons.appendChild(button);   
}

function onbuttonclicked() {
  if (onbuttonclicked) {
    window.location.href = "table_pag.html?page=1";
  }
}

function onbuttonclickedFiltro() {
  if (onbuttonclickedFiltro) {
    history.back();
  }
}


getUser();