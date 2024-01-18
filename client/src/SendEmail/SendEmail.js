import emailjs from "emailjs-com";

const sendEmail = async (to_email, message, finishMessage) => {
  const estructuraCorreo = {
    from_name: "VitalFitApp!",
    from_email: "VitalFitApp.4@gmail.com",
    to_email,
    message,
    finishMessage,
  };

  const serviceID = "service_b7x0yxk";
  const templateID = "template_flad8yt";

  emailjs.init("NAmw66C0MvdblO1rC");

   emailjs
    .send(serviceID, templateID, estructuraCorreo)
    .then((response) => {
      console.log("Correo electrónico enviado con éxito:", response);
    })
    .catch((error) => {
      console.error("Error al enviar el correo electrónico:", error);
    });
};

export default sendEmail;