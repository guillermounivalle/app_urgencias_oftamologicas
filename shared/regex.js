//Validación de caracteres especiales en email y contraseña
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordRegex = /[$%&|?()<>#¡]/;

export default {
	emailRegex,
	passwordRegex
};