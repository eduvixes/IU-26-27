# SEMANA 11: RESTful (Parte II)

> **Nota y advertencia**: Este directorio utiliza un ejemplo de entidad y una estructura de código que no corresponde con la arquitectura de la ET2 u ET3. 
Simplemente sirve como ejemplo para ilustrar el ejercicio y la presentación del funcionamiento del Postman, y la introduccion al funcionamiento y lógica de los APIs backend RESTful, y sus interacciones con un frontend Client.
>
> Por lo tanto, **el código de este directorio no debe usarse como referencia o base para la preparación de las entregas de la asignatura**, tan solo como ejemplos de Servers backend RESTful y un Client compatible simple, util para probar estos Servers y el Postman.

## Estructura

2 Carpetas Principales:

1. frontend-simple-fastapi (Client): Un cliente simple, que muestra los ejemplos mostrados en la clase practica. Esta implementado con HTML, un script CSS simple, y scripts Javascript nativo. Contiene codigo para hacer pruebas con el Inspector y ejecutar funcionalidades CRUD de Users. Se puede configurar para poder comunicarse con los Servers en otra carpeta. 

2. dynamic-fastapi-server-generator (Server FastAPI), que contiene: 

- dynamic_restful_server_generator.py: un script generador Server RESTful dynamico, implementado en Python. Extrae los metadatos de una base de datos (especificamente una base de datos MySQL), y los usa para crear los objetos Modelo (cada modelo representa una tabla del bbdd) y los endpoints basicos para cada objeto Modelo:
    - GET 
    - GET (by Id)
    - POST
    - PUT (by Id)
    - DELETE (by Id)

    - NOTA: El script esta diseñado especificamente para bases de datos sql, especificamente MySQL. Si se quiere llamar a otro tipo de base de datos, es muy probable que sea necesario modificar el script. Muy posiblemente, sea necesario modificar las librerias que importan el script, y el parte del script que lee los metadatos de la bbdd, para crear los objetos modelo.

- fastapi_app.sql: un script sql de prueba. Con ello, se puede crear una base de datos "de prueba", para probar el script "dynamic_restful_server_generator.py".

- postman-test-scripts.js: un documento Javascript, que contiene unos scripts y tests básicos para Postman.

- main.py: un server RESTful, creado a partir de ejecutar el script dynamic_restful_server_generator.py, y usando la base de datos creado por el script fast_app.sql como origen. Se puede usar como un punto de referencia.

- main - fixed.py: el mismo server RESTful que main.py, modificado para arreglar el problema del formateo de los datetimes. Se utiliza como ejemplo de como el server creado dinamicamente puede ser modificado para ajustarse a nuevos requisitos o para devolver mejores respuestas. Se puede usar como un punto de referencia.

- models.py: un documento Python que corresponde con la capa Modelo, creado por "sqlacodegen", usando la base de datos creado por el script fast_app.sql como origen. Se puede usar como un punto de referencia. 

    - NOTA: "sqlacodegen" es una herramienta que genera automáticamente modelos de SQLAlchemy a partir de una base de datos existente.

- carpeta "ejemplos_api_tiempo_ejecucion": contiene 2 scripts en Python que crean un Servidor RESTful, que solamente funciona durante su "tiempo de ejecución". Para probarlos y ejecutarlos, sigue los pasos que aparecen en la página web:
https://dev.to/yrrrrrf/your-database-is-your-api-auto-generate-a-fastapi-backend-in-seconds-2hip


## Como crear la base de datos (usando XAMPP)
1. Descarga el instalador de XAMPP e instalalo
2. Abre el XAMPP Control Panel
3. Inicia Apache y MySQL
4. En una navegador web, usa el url: http://localhost/phpmyadmin/
5. En la página principal, selecciona la pestaña SQL
6. Copia y pega el contenido del archivo "fastapi_app.sql" y pulsa "Continuar"
7. Abre el cmd de Windows y ejecuta los siguientes commandos:
    - pip install pymysql
    - pip install mysqlclient

## Como ejecutar el Server FastAPI main.py que viene por defecto
1. Tener python 3 y un IDE como VSC
2. Abrir API en Visual Studio Code (VSC)
3. Abrir terminal de VSC, entrar en la carpeta dynamic-fastapi-server-generator, en el directorio donde se encuentra main.js
4. Ejecutar comandos en el terminal:
    - pip install sqlalchemy 
    - pip install fastapi
    - pip install "fastapi[standard]" 
    - pip install pydantic
5. Ejecutar comando: "uv run fastapi dev"
6. En caso de que fastapi no funciona, ejecuta: "uv run uvicorn main:app --reload" o "uvicorn main:app --reload"

## Como generar dinamicamente un server RESTful, usando el script "dynamic_restful_server_generator.py"
1. Tener python 3 y un IDE como VSC
2. Abrir API en Visual Studio Code (VSC)
3. Abrir terminal de VSC, entrar en la carpeta dynamic-fastapi-server-generator
4. Ejecutar comandos en el terminal:
    - pip install sqlalchemy 
    - pip install fastapi
    - pip install "fastapi[standard]" 
    - pip install pydantic
4. Ejecutar comando: "python .\dynamic_restful_server_generator.py"
5. Se generará un archivo "main.py" (el Server RESTful), que se puede ejecutar usando el comando "uvicorn main:app --reload"

## Como solo generar un documento Python que corresponde con la capa Modelo, usando sqlacodgen, sin las funcionalidades RESTful
1. Tener python 3 y un IDE como VSC
2. Abrir API en Visual Studio Code (VSC)
3. Abrir terminal de VSC
4. Ejecutar comandos en el terminal:
    - pip install sqlacodegen
    - pip install sqlalchemy
    - pip install sqlmodel
4. Ejecutar comando: "sqlacodegen mysql+pymysql://root:@localhost/fastapi_server --generator sqlmodels > models.py"
    
    - NOTA: "mysql+pymysql://root:@localhost/fastapi_server" corresponde con una base de datos MySQL creado a partir el script fastapi_app.sql, y usando el paquete de herramientas XAMPP. En el caso de que se utiliza otras herramientas y/o base de datos, probablemente sera necesario cambiar elementos de este comando/url 

## Como ejecutar el Client
1. Instalar http-server en el windows cmd usando el siguiente comando: npm install --global http-server
2. En el windows cmd, entrar dentro de la carpeta frontend-simple-fastapi, en el directorio que se encuentra index.html
3. Ejecuta el comando: http-server --proxy http://localhost:8080?
4. En un navegador, ve al url: http://localhost:8080 



## Muestra Breve de código Client (el código que permite la comunicación a los Servers RESTful)


- Get all users (en tabla_pag.js):

``` js
function getAllUsers() {

  // url al servidor REST - Peticion GET: 
  // http://localhost:8000/users 
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
```


- Get user by ID (en detail.js):

``` js
function getUser() {

    // url al servidor REST - Peticion GET: 
    // http://localhost:8000/users/id_user 
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
```


- Crear User (en create.js):

``` js
async function sendData(){

    const nuevoUsers = {
        nameUser: nameUser,
        emailUser: emailUser
    }

    // url al servidor REST - Peticion POST: 
    // http://localhost:8000/users  
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
```


- Modificar User by ID (en modify.js):

``` js
async function sendData(){

    const modUser = {
        nameUser: nameUser,
        emailUser: emailUser
    }

    // url al servidor REST - Peticion PUT: 
    // http://localhost:8000/users/id_user
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
```


- Borrar User by ID (en delete.js):

``` js
async function deleteData(){

    // url al servidor REST - Peticion DELETE: 
    // http://localhost:8000/users/id_user
    const result = await fetch(URLSERVERDelete + idHTML, {
        method: "DELETE"
    })

    console.log(result);

    if(result.status !== 204 || result.hasOwnProperty("error")){
        alert("No se ha podido borrar usuario");
        window.location.href = "table_pag.html?page=" + 1;
        
    }else{
        console.info("Usuario borrado correctamente");
        alert("Usuario borrado correctamente");
        window.location.href = "table_pag.html?page=" + 1;
    }
}
```