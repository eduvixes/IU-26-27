# Contenido #

## Semana 2 ##

* Propósito

Se pretende hacer una página html que contenga todos los componentes visuales necesarios para hacer la gestión (altas, bajas, modificaciones, borrados y detalle) de una entidad de la base de datos.
El menú se usa para acceder a cada entidad que se quiere manejar instanciando la clase de la entidad.
El menú se debe ocultar o mostrar según se desee.
En este ejemplo se plantea para una entidad solamente la validación de una operación de alta de usuario.
La validación se hará a nivel de cada campo del formulario mediante un evento asociado al campo después de que el usuario introduzca el valor.
Existirá tambien una validación a nivel de submit que comprobará que todos los campos son correctos para poder dejar ejecutar el action del formulario.
El ejemplo no esta completo para que se pueda completar por los alumnos.

* index.html 

html con un conjunto de divs semánticos en el body que estructuran la página con:

header para poner la cabecera de la página
nav para mostrar/ocultar menu
aside para las opciones del menu
section para el formulario
article por si es necesario
footer para pie de pagina
script js para ocultar los elementos necesarios cuando se cargan y declarar la función para ocultar y mostrar las opciones de menú.

En el header se carga

la clase js de la entidad persona
el css que se usa para formatear la apariencia
la clase para definir las operaciones sobre los objetos del dom
la clase para definir las validaciones atomicas estandar disponibles para todos los campos de formulario.


* persona_Class.js


* Dom_Class.js


* Validations_Class.js


