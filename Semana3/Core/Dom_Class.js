class dom extends dom_table {

	constructor(){
		super()
	}

	show_element(id){
		document.getElementById(id).style.display = 'block';
	}

	mostrar_error_campo(id, codigoerror){
		document.getElementById('span_error_'+id).style.display = 'inline';
		document.getElementById('error_'+id).innerHTML = codigoerror;
		document.getElementById(id).style.borderBlockColor = 'red';
		document.getElementById('submit_button').focus();
	}

	mostrar_exito_campo(id){
		document.getElementById('span_error_'+id).style.display = 'none';
		document.getElementById('error_'+id).innerHTML = '';
		document.getElementById(id).style.borderBlockColor = 'green';
	}

	fillform(formdata, idform){
		document.getElementById(idform).innerHTML = formdata;
		document.getElementById(idform).style.display = 'block';
	}


	crearElementoHtml(tag, tipo, nombrecampo, valores){

		switch (tag){
			case 'input':
				
				//si tiene mas de un valor, creo y relleno todos los campos y devuelvo el primero
				let counter = 0;
				for (var clave in valores){
					
					var nombrecampo = clave;
					var valorcampo = valores[nombrecampo];
					var element = this.createInput(nombrecampo, tipo);
					this.fillElementValue(element, valorcampo);
					if (counter == 0){
						var elementToReturn = element;
					}
					counter++;

				}
				
				return elementToReturn;
				break;
			case 'file':
				element = this.createInput(nombrecampo, tipo);
				this.fillElementFile(element, valores);
				return element;
				break;
			default:
				element = document.createElement(tag);
				element.type = tipo;
				element.id = nombrecampo;
				this.fillElementValue(element, '');
				return element;
				break;	
		}

	}

	createInput(nombre, tipo){
		var newElement = document.createElement('input');
		newElement.type = tipo;
		newElement.id = nombre;
		newElement.name = nombre;
		return newElement;
	}

	fillElementValue(elemento, valor){
		elemento.value = valor;
	}

	fillElementFile(elemento, valores){
	
		// creo objeto html sino tengo cargado el formulario (para crear cada elemento dinamicamente dentro del form)
        //construyo objeto file y relleno valor para prueba
        if (Object.keys(valores).length != 0){
                              
			var nombrefichero = valores.format_name_file;
			var tipomime = valores.type_file;
			var maxsize = valores.max_size_file;   

			var file = new File([new ArrayBuffer(maxsize)], nombrefichero ,{type:tipomime, webkitRelativePath:"C:\\fakepath\\"+nombrefichero});
					
			// Create a data transfer object. Similar to what you get from a `drop` event as `event.dataTransfer`
			const dataTransfer = new DataTransfer();

			// Add your file to the file list of the object
			dataTransfer.items.add(file);

			// Save the file list to a new variable
			const fileList = dataTransfer.files;

			// Set your input `files` to the file list
			elemento.files = fileList;

        }
		else{
			const dataTransfer = new DataTransfer();
			const fileList = dataTransfer.files;
			elemento.files = fileList;
		}
	
	}

	vaciarDiv(iddiv){
		document.getElementById(iddiv).innerHTML = '';
	}

	colocarelemento(elemento, divdestino){
		document.getElementById(divdestino).append(elemento);
	}

}

	/**
 * if id and mode switch the state of display of html element(id) to 'none' or 'block'/'inline'
 * if 'on'/'off' force html element (id) to show or hide
 * 
 * 
 * @param {string} id  id of html element to show/hide
 * @param {string} mode 'block'/'inline'
 * @param {string} ponerestado 'on'/'off'
 */

	function switch_display_mode(id,mode, ponerestado=null){

	if (ponerestado == 'on'){
		document.getElementById(id).style.display = mode;
	}
	else{
		if (ponerestado == 'off'){
		document.getElementById(id).style.display = 'none';
		}
		else{ 
			if (document.getElementById(id).style.display == 'none'){
				document.getElementById(id).style.display = mode;
			}
			else{
				document.getElementById(id).style.display = 'none';
			}
		}
	}
}


