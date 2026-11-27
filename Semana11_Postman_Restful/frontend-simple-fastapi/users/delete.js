var URLSERVERdetail = "";
var URLSERVERDelete = "";

if(localStorage === null){
  window.location.href = "../404.html";
}

if(localStorage !== null && localStorage.getItem("backendUrl") !== null){
    const backendUrl = localStorage.getItem("backendUrl");
    URLSERVERdetail = backendUrl + "/users/";
    URLSERVERDelete = backendUrl + "/users/";
}

function getUser() {

    return fetch(URLSERVERdetail + idHTML)
        .then((response) => { 
            return response.json().then((data) => {
                return appendData(data);
            }).catch((err) => {
                console.log(err);
            }) 
        });

}

var URLString = window.location.href.split('?');
var datosURL = URLString[1].split('&');
var idHTML = datosURL[0].replace("id=","");


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

    var buttonSub = document.createElement("button");
    buttonSub.innerHTML = "Eliminar";
    buttonSub.onclick = deleteData;
    buttons.appendChild(buttonSub);  

    var buttonCan = document.createElement("button");
    buttonCan.innerHTML = "Cancelar";
    buttonCan.onclick = onbuttonclicked;
    buttons.appendChild(buttonCan);  
}

function onbuttonclicked() {
  if (onbuttonclicked) {
    window.location.href = "table_pag.html?page=" + 1;
  }
}

function onbuttonclickedFiltro() {
  if (onbuttonclickedFiltro) {
    history.back();
  }
}

async function deleteData(){

    // url al servidor REST - Peticion DELETE: 
    // http://localhost:5000/users/id_user
    const result = await fetch(URLSERVERDelete + idHTML, {
        method: "DELETE"
    })

    console.log(result);

    if(result.hasOwnProperty("error")){
        alert("No se ha podido borrar usuario");
        window.location.href = "table_pag.html?page=" + 1;
        
    }else{
        console.info("Usuario borrado correctamente");
        alert("Usuario borrado correctamente");
        window.location.href = "table_pag.html?page=" + 1;
    }
    //} 

}

getUser();
