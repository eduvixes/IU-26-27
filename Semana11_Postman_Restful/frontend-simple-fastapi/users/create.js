var URLSERVERCreate = "";

if(localStorage === null){
  window.location.href = "../404.html";
}

if(localStorage !== null && localStorage.getItem("backendUrl") !== null){
    const backendUrl = localStorage.getItem("backendUrl");
    URLSERVERCreate = backendUrl + "/users";
}

var datosURL = window.location.href;

function appendButtons(){

    var buttons = document.getElementById("button-container");

    var buttonSub = document.createElement("button");
    buttonSub.innerHTML = "Crear";
    buttonSub.onclick = sendData;
    buttons.appendChild(buttonSub);  

    var buttonCan = document.createElement("button");
    buttonCan.innerHTML = "Cancelar";
    buttonCan.onclick = onbuttonclicked;
    buttons.appendChild(buttonCan);  
}

function onbuttonclicked() {
  if (onbuttonclicked) {
    window.location.href = "table_pag.html?page=1";
  }
}

function isValidName(str) {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 _-]+$/;
  return regex.test(str);
}

async function sendData(){

    const emailPattern = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

    var nameUser = document.getElementById("nameUser").value;
    var emailUser = document.getElementById("emailUser").value;


    if(nameUser === "" || emailUser === ""){
        alert("Todos los campos son obligatorios.");

    }else if(!emailPattern.test(emailUser)){
        alert('No es un correo electrónico adecuado');

        document.getElementById("emailUser").focus();
        document.getElementById("emailUser").value = "";

    }else if(!isValidName(nameUser)){
        alert('No se permiten caracteres prohibidos al nombre.');
        console.error("No se permiten caracteres prohibidos al nombre.");

        document.getElementById("nameUser").focus();
        document.getElementById("nameUser").value = "";


    }else if (nameUser.length>50){
        alert("El nombre debe tener menos de 51 caracteres.");

		document.getElementById("nameUser").focus();
        document.getElementById("nameUser").value = "";

    }else if (nameUser.length<2){ 
        alert("El nombre debe tener al menos 2 caracteres.");

		document.getElementById("nameUser").focus();
        document.getElementById("nameUser").value = "";

    }else{

        const nuevoUsers = {
            nameUser: nameUser,
            emailUser: emailUser,
        }

        // url al servidor REST - Peticion POST: 
        // http://localhost:5000/users  
        const apiCall = await fetch(URLSERVERCreate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(nuevoUsers)
        })

        if(!apiCall.ok){
            alert("No se ha podido crear usuario");
            window.location.href = "table_pag.html?page=" + 1; 
        }else{        

            const result = await apiCall.json();
            console.log(result);

            if(result.status === 400 || result.status === 500 || result.hasOwnProperty("error")){
                alert("No se ha podido crear usuario");
                window.location.href = "table_pag.html?page=" + 1; 
            }else{
                //console.log(response);
                alert("Usuario creado correctamente");
                window.location.href = "table_pag.html?page=" + 1;        
            }
        } 
    }
}

appendButtons()