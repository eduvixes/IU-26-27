var URLSERVERdetail = "";
var URLSERVERModify = "";

if(localStorage === null){
  window.location.href = "../404.html";
}

if(localStorage !== null && localStorage.getItem("backendUrl") !== null){
    const backendUrl = localStorage.getItem("backendUrl");
    URLSERVERdetail = backendUrl + "/users/";
    URLSERVERModify = backendUrl + "/users/";
}

var URLString = window.location.href.split('?');
var datosURL = URLString[1].split('&');
var idHTML = datosURL[0].replace("id=","");


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

function appendData(data){
    if(data && data.length != 0){
        document.getElementById("nameUser").value = data.nameUser;
        document.getElementById("emailUser").value = data.emailUser;
    }

    var buttons = document.getElementById("button-container");

    var buttonSub = document.createElement("button");
    buttonSub.innerHTML = "Guardar cambios";
    buttonSub.onclick = sendData;
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

function isValidName(str) {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 _-]+$/;
  return regex.test(str);
}

async function sendData(){

    const emailPattern = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    const dniPattern = /^[0-9]{8}[A-Z]{1}$/;

    var nameUser = document.getElementById("nameUser").value;
    var emailUser = document.getElementById("emailUser").value;

    if(nameUser === "" || emailUser === ""){
        alert("Todos los campos son obligatorios.");

    }else if(!emailPattern.test(emailUser)){
        alert('No es un correo electrónico adecuado');

        document.getElementById("emailUser").focus();

    }else if(!isValidName(nameUser)){
        alert('No se permiten caracteres prohibidos al nombre.');
        console.error("No se permiten caracteres prohibidos al nombre.");

        document.getElementById("nameUser").focus();

    }else if (nameUser.length>50){
        alert("El nombre debe tener menos de 51 caracteres.");

		document.getElementById("nameUser").focus();

    }else if (nameUser.length<2){ 
        alert("El nombre debe tener al menos 2 caracteres.");

		document.getElementById("nameUser").focus();
        document.getElementById("nameUser").value = "";


    }else{

        const modUser = {
            nameUser: nameUser,
            emailUser: emailUser,
        }

        // url al servidor REST - Peticion PUT: 
        // http://localhost:5000/users/id_user
        const response = await fetch(URLSERVERModify + idHTML, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(modUser)
        })

        if(!response.ok){
            alert("No se ha podido modificar usuario")
            window.location.href = "table_pag.html?page=" + 1;
        }else{

            const result = await response.json();
            console.log(result);

            if(result.status === 400 || result.status === 500 || result.hasOwnProperty("error")){
                alert("No se ha podido modificar usuario")
                window.location.href = "table_pag.html?page=" + 1;
                
            }else{
                alert("Usuario modificado correctamente")
                window.location.href = 'table_pag.html?page=' + 1;
                
            }
        }

    }
}

getUser();