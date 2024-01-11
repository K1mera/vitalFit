export const validationForm = (values) => {
  let errors = {};
  let expresionRegular = /^[0-9]+$/;
  let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let expresionPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!values.nombre) {
    errors.nombre = "El nombre debe ser requerido";
  }

  if (!expresionRegular.test(values.dni)) {
    errors.dni = "El DNI debe contener sólo numeros";
  }

  if (!regexEmail.test(values.correo)) {
    errors.correo = "El email es invalido";
  }

  if (!expresionPassword.test(values.contraseña)) {
    errors.contraseña =
      "La contraseña debe tener mayusculas, numeros y letras, al menos 6 caracteres";
  }

  if (values.confirmarContraseña !== values.contraseña) {
    errors.confirmarContraseña = "La contraseña no coincide con la anterior";
  }
  return errors;
};
