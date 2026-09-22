class persona extends Validations {
	/**
	 * ejecuta el constructor de la clase de donde hereda
	 * crea como atributo propio la clase de manejo visual del dom para poder utilizar los métodos de modificación de estructura definidos
	 */
	constructor() {
		super();
		this.dom = new dom();
	}

	/*
		  fields validations for ADD
	  */

	/**
	  	
		  @param 
		  @return {string/bool} Error code of field value (fieldname_validationfunction_KO) or true due the field value is correct
  
	  */

	ADD_dni_validation() {
		if (!this.min_size("dni", 9)) {
			this.dom.mostrar_error_campo("dni", "dni_min_size_KO");
			return "dni_min_size_KO";
		}
		if (!this.max_size("dni", 9)) {
			this.dom.mostrar_error_campo("dni", "dni_max_size_KO");
			return "dni_max_size_KO";
		}
		if (!this.format("dni", "[0-9]{8}[A-Z]{1}")) {
			this.dom.mostrar_error_campo("dni", "dni_format_KO");
			return "dni_format_KO";
		}
		this.dom.mostrar_exito_campo("dni");
		return true;
	}

	/** 
	  	
		  @param 
		  @return {bool/string} true if field value is ok or  Error code of field value (fieldname_validationfunction_KO) if field value is not ok
			  {string} Error code of field value (fieldname_validationfunction_KO) 
			  or
			  {bool} true due the field value is correct
  
	  */

	ADD_nombre_persona_validation() {
		if (!this.min_size("nombre_persona", 3)) {
			this.dom.mostrar_error_campo(
				"nombre_persona",
				"nombre_persona_min_size_KO",
			);
			return "nombre_persona_min_size_KO";
		}
		if (!this.max_size("nombre_persona", 35)) {
			this.dom.mostrar_error_campo(
				"nombre_persona",
				"nombre_persona_max_size_KO",
			);
			return "nombre_persona_max_size_KO";
		}
		// allowed format aA to zZ letter
		if (!this.format("nombre_persona", "[ñ.\\-\ a-zA-Zá-úÁ-Ú]*")) {
			this.dom.mostrar_error_campo(
				"nombre_persona",
				"nombre_persona_format_KO",
			);
			return "nombre_persona_format_KO";
		}
		this.dom.mostrar_exito_campo("nombre_persona");
		return true;
	}

	ADD_apellidos_persona_validation() {
		if (!this.min_size("apellidos_persona", 3)) {
			this.dom.mostrar_error_campo(
				"apellidos_persona",
				"apellidos_persona_min_size_KO",
			);
			return "apellidos_persona_min_size_KO";
		}
		if (!this.max_size("apellidos_persona", 35)) {
			this.dom.mostrar_error_campo(
				"apellidos_persona",
				"apellidos_persona_max_size_KO",
			);
			return "apellidos_persona_max_size_KO";
		}
		// allowed format aA to zZ letter
		if (!this.format("apellidos_persona", "[ñ.\\-\ a-zA-Zá-úÁ-Ú]*")) {
			this.dom.mostrar_error_campo(
				"apellidos_persona",
				"apellidos_persona_format_KO",
			);
			return "apellidos_persona_format_KO";
		}
		this.dom.mostrar_exito_campo("apellidos_persona");
		return true;
	}
	ADD_fechaNacimiento_persona_validation() {
		if (!this.format("fechaNacimiento_persona", "\\n{1,2}\/\n{1,2}\/\n{2,4}")) {
			this.dom.mostrar_error_campo(
				"fechaNacimiento_persona",
				"fechaNacimiento_persona_format_KO",
			);
			return "fechaNacimiento_persona_format_KO";
		}
		this.dom.mostrar_exito_campo("fechaNacimiento_persona");
		return true;
	}
	ADD_direccion_persona_validation() {
		if (!this.min_size("direccion_persona", 10)) {
			this.dom.mostrar_error_campo(
				"direccion_persona",
				"direccion_persona_min_size_KO",
			);
			return "direccion_persona_min_size_KO";
		}
		if (!this.max_size("direccion_persona", 200)) {
			this.dom.mostrar_error_campo(
				"direccion_persona",
				"direccion_persona_max_size_KO",
			);
			return "direccion_persona_max_size_KO";
		}
		// allowed format aA to zZ letter
		if (!this.format("direccion_persona", "[ñ.\\-\ \/a-zA-Zá-úÁ-Ú]*")) {
			this.dom.mostrar_error_campo(
				"direccion_persona",
				"direccion_persona_format_KO",
			);
			return "direccion_persona_format_KO";
		}
		this.dom.mostrar_exito_campo("direccion_persona");
		return true;
	}
	ADD_telefono_persona_validation() {
		if (!this.format("telefono_persona", "(\\+34)?\d{9,9}")) {
			this.dom.mostrar_error_campo(
				"telefono_persona",
				"telefono_persona_format_KO",
			);
			return "telefono_persona_format_KO";
		}
		this.dom.mostrar_exito_campo("telefono_persona");
		return true;
	}
	ADD_email_persona_validation() {
		if (!this.format("email_persona", "[^@]+@[^@]+\\.[^@]+")) {
			this.dom.mostrar_error_campo("email_persona", "email_persona_format_KO");
			return "email_persona_format_KO";
		}
		this.dom.mostrar_exito_campo("email_persona");
		return true;
	}
	ADD_nuevo_foto_persona_validation() {
		if (!this.exist_file("nuevo_foto_persona")) {
			this.dom.mostrar_error_campo(
				"nuevo_foto_persona",
				"foto_persona_empty_KO",
			);
			return "nuevo_foto_persona_empty_KO";
		}
		const validTypes = ["image/jpeg", "image/jpg"];
		if (!this.type_file("nuevo_foto_persona", validTypes)) {
			this.dom.mostrar_error_campo(
				"nuevo_foto_persona",
				"nuevo_foto_persona_image_type_KO",
			);
			return "nuevo_foto_persona_image_type_KO";
		}
		const maxSizeInBytes = 2 * 1024 * 1024;
		if (!this.max_size_file("nuevo_foto_persona",maxSizeInBytes)) {
			this.dom.mostrar_error_campo(
				"nuevo_foto_persona",
				"foto_persona_size_KO",
			);
			return "nuevo_foto_persona_size_KO";
		}
		if (!this.format_name_file("nuevo_foto_persona","nuevo_foto_persona")){
			this.dom.mostrar_error_campo(
		    "nuevo_foto_persona",
		    "nuevo_foto_persona_name_format_KO",
		  );
		  return "nuevo_foto_persona_name_format_KO";
		}
		// const fileName = file.name;
		// regex = /^y$/;
		// if (!regex.test(fileName)) {
		//   this.dom.mostrar_error_campo(
		//     "nuevo_foto_persona",
		//     "nuevo_foto_persona_name_format_KO",
		//   );
		//   return "nuevo_foto_persona_name_format_KO";
		// }
		// if (fileName.length < 3) {
		//   this.dom.mostrar_error_campo(
		//     "nuevo_foto_persona",
		//     "nuevo_foto_persona_name_min_size_KO",
		//   );
		//   return "nuevo_foto_persona_name_min_size_KO";
		// }
		// if (fileName.length > 15) {
		//   this.dom.mostrar_error_campo(
		//     "nuevo_foto_persona",
		//     "nuevo_foto_persona_name_max_size_KO",
		//   );
		//   return "nuevo_foto_persona_name_max_size_KO";
		// }
		// this.dom.mostrar_exito_campo("nuevo_foto_persona");
		return true;
	}
	ADD_foto_persona_validation() {
		if (!this.min_size("foto_persona", 3)) {
			this.dom.mostrar_error_campo(
				"foto_persona",
				"foto_persona_min_size_KO",
			);
			return "foto_persona_min_size_KO";
		}
		if (!this.max_size("foto_persona", 15)) {
			this.dom.mostrar_error_campo(
				"foto_persona",
				"foto_persona_max_size_KO",
			);
			return "foto_persona_max_size_KO";
		}
		// allowed format aA to zZ letter
		if (!this.format("foto_persona", "[ñ.\\-\ \/a-zA-Zá-úÁ-Ú]*")) {
			this.dom.mostrar_error_campo(
				"foto_persona",
				"foto_persona_format_KO",
			);
			return "foto_persona_format_KO";
		}
		this.dom.mostrar_exito_campo("foto_persona");
		return true;
	}
	/**
		  @param
		  @return	{bool/object} true if all fields validations are ok or object with the ids of elements and error code if field validation is not ok and true if field validation is ok
  	
	  */

	ADD_submit_persona() {
		// object to store de fields validations
		var set_result = {};

		// store in key (id element) value (result of field validation method)
		set_result.dni = this.ADD_dni_validation();
		set_result.nombre_persona = this.ADD_nombre_persona_validation();
		set_result.apellidos_persona = this.ADD_apellidos_persona_validation();
		set_result.fechaNacimiento_persona =
			this.ADD_fechaNacimiento_persona_validation();
		set_result.direccion_persona = this.ADD_direccion_persona_validation();
		set_result.telefono_persona = this.ADD_telefono_persona_validation();
		set_result.email_persona = this.ADD_email_persona_validation();
		set_result.nueva_foto_persona = this.ADD_nueva_foto_persona_validation();
		set_result.foto_persona = this.ADD_foto_persona_validation();

		// calculate combination of all field validations
		let result =
			set_result.dni &
			set_result.nombre_persona &
			set_result.apellidos_persona &
			set_result.fechaNacimiento_personal &
			set_result.direccion_persona &
			set_result.telefono_persona &
			set_result.email_persona &
			set_result.nueva_foto_persona &
			set_result.foto_persona;

		// convert the result to boolean
		result = Boolean(result);

		// if boolean and true return true
		if (typeof result === "boolean" && result == true) {
			return result;
		} // if not boolean or false return the object with id element as key and code error as value
		else {
			return set_result;
		}
	}
}
