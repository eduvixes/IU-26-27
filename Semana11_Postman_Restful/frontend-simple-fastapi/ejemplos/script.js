document.getElementById("btnCargar").addEventListener("click", obtenerDatos)

function obtenerDatos() {
    console.log("Solicitando datos a la api...");

    //Ejemplo de petición get con parámetros
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
        .then(response => {
            console.log("Status:", response.status);
            return response.json();
        })
        .then(datos => {
            console.log("Datos recibidos:", datos);
            mostrarResultado(datos);
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}

function mostrarResultado(datos) {
    const div = document.getElementById("resultado");
    div.innerHTML = `<strong>Primer post:</strong><br>${datos[0].title}`;
}