var URLSERVERgetall = "";

if(localStorage === null){
  window.location.href = "../404.html";
}

if(localStorage !== null && localStorage.getItem("backendUrl") !== null){

  const backendUrl = localStorage.getItem("backendUrl");
  URLSERVERgetall = backendUrl + "/users";

}

var datosURL = window.location.href.split('?');
var page = datosURL[1].replace("page=","");

console.log(datosURL);
console.log(page);
console.log(URLSERVERgetall);


function getAllUsers() {

  // url al servidor REST - Peticion GET: 
  // http://localhost:5000/users 
  console.log("URLSERVERgetall: " + URLSERVERgetall);
  
  return fetch(URLSERVERgetall)
        .then((response) => { 
            return response.json()

        .then((data) => {
            console.log(data);
            return buildVentana(data);
    
        }).catch((err) => {
            console.log(err);
            return buildVentana(null);

          }) 
        });
}

function buildVentana(data){
  buildTable(data);
}


function buildTable(data) {

  const main = document.getElementById("main-container");

  var a = document.createElement('a');
  var linkText = document.createTextNode("Crear usuario");
  a.appendChild(linkText);
  a.title = "Crear usuario";
  a.href = 'create.html';
  a.className = 'button';
  main.appendChild(a);

  const table = document.getElementById("mytable").getElementsByTagName('tbody')[0];
  if(data !== null && data.length > 0){
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);

      const newRow = table.insertRow();
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      cell1.textContent = data[i].nameUser;

      const butID = data[i].id;

      const buttonDetail = document.createElement('button');
      buttonDetail.id = "detailbutton" + butID;
      buttonDetail.textContent = "Detalle";
      buttonDetail.addEventListener('click', detail);
      cell2.appendChild(buttonDetail);

      const buttonEdit = document.createElement('button');
      buttonEdit.id = "editbutton" + butID;
      buttonEdit.textContent = "Editar";
      buttonEdit.addEventListener('click', edit);
      cell2.appendChild(buttonEdit);

      const buttonDel = document.createElement('button');
      buttonDel.id = "delbutton" + butID;
      buttonDel.textContent = "Eliminar";
      buttonDel.addEventListener('click', del);
      cell2.appendChild(buttonDel);

    }
  }else{

    var newParagraph = document.createElement('p');
    newParagraph.textContent = 'No se han encontrado usuarios';
    main.append(newParagraph);
  }
}

function detail(event){
  console.log("DETAIL");

  var idDetailString = event.target.id;
  const substringToRemove = "detailbutton";
  var datosDetailString = idDetailString.replace(substringToRemove, '');
  var datosDetail = datosDetailString.split('-');

  window.location.href = "detail.html?id=" + datosDetail[0];
}

function edit(event){
  console.log("EDIT");

  var idEditString = event.target.id;
  const substringToRemove = "editbutton";
  var datosEditString = idEditString.replace(substringToRemove, '');
  var datosEdit = datosEditString.split('-');

  window.location.href = "modify.html?id=" + datosEdit[0];
}

function del(event){
  console.log("DELETE");

  var idDelString = event.target.id;
  const substringToRemove = "delbutton";
  var datosDelString = idDelString.replace(substringToRemove, '');
  var datosDel = datosDelString.split('-');

  window.location.href = "delete.html?id=" + datosDel[0];
}


getAllUsers();


