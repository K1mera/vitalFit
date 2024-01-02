export const validationEmail = (values) => {
  let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (!regexEmail.test(values)) {
    return "El email debe contener un @";
  } else {
    return "";
  }
};
