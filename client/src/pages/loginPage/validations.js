export const validationUser = (values) => {
    let errors = {};
    let expresionPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  
    if (!regexEmail.test(values.correo)) {
      errors.correo = "El correo es invalido";
    }
  
    if (!expresionPassword.test(values.contraseña)) {
      errors.contraseña =
        "La contraseña debe tener mayusculas, numeros y letras, al menos 6 caracteres";
    }
  
    return errors;
  };