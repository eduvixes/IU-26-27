class Validations{

	constructor(){
		
	}
	
	/**
	
		min_size()
		@param {string} id Id objeto dom
		@param {number} minsize tamaño minimo a validar 
		@return {bool} true si satisface la validación y false si no la satisface

	*/
	
	
	min_size(id, minsize){
		let elemento = document.getElementById(id);
		switch (elemento.tagName){
			case 'INPUT':
				switch (elemento.type){
					case 'number':
					case 'email':
					case 'text':
						let valorelemento = elemento.value;
						if (valorelemento.length<minsize){
							return false;
						}
						else{
							return true;
						}
						break;
					case 'file':
						break;
					default:
						break;
				
				}
				break;
			case 'SELECT':
				break;
			default:
				break;
		}

	}

	/**
	
		max_size()
		@param {string} id Id objeto dom
		@param {number} minsize tamaño maximo a validar 
		@return {bool} true si satisface la validación y false si no la satisface
		
	*/
	
	max_size(id, maxsize){
		let elemento = document.getElementById(id);
		switch (elemento.tagName){
			case 'INPUT':
				switch (elemento.type){
					case 'number':
					case 'email':
					case 'text':
						let valorelemento = elemento.value;
						if (valorelemento.length>maxsize){
							return false;
						}
						else{
							return true;
						}
						break;
					case 'file':
						break;
					default:
						break;
				
				}
				break;
			case 'SELECT':
				break;
			default:
				break;
		}

	}

	/**
	
		format()
		@param {string} id Id objeto dom
		@param {number} {string} regular expression to testing id html element value
		@return {bool} result of regular expression testing  
		
	*/
	
	format(id, exprreg){
		let expresionregular = new RegExp(exprreg);
		let valor = document.getElementById(id).value;
		return expresionregular.test(valor);
	}

}