export const validationUser = (values) => {
  let errors = {};
  let expresionPassword = /^(?=.*[A-Z])(?=.*\d).+/;

  if (!values.usuario) {
    errors.usuario = "El usuario debe ser requerido";
  }

  if (!expresionPassword.test(values.contraseña)) {
    errors.contraseña =
      "Debe tener al menos un número y una letra en mayúscula";
  }

  return errors;
};
