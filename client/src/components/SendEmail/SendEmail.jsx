const [formData, setFormData] = useState({
  name: "Camila",
  email: "cami562ggh@gmail.com",
  message: "Compra en proceso...Todo está saliendo genial!",
});

const PruebaEmailJs = () => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Configuración de Email.js
    emailjs.init("");

    // Datos del correo electrónico a enviar
    const emailData = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    // Envío del correo electrónico
    emailjs
      .send("tu_servicio", "tu_plantilla", emailData)
      .then((response) => {
        console.log("Correo electrónico enviado con éxito:", response);
      })
      .catch((error) => {
        console.error("Error al enviar el correo electrónico:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </label>
      <label>
        Correo electrónico:
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
      </label>
      <label>
        Mensaje:
        <textarea
          name="message"
          onChange={handleChange}
          value={formData.message}
        />
      </label>
      <button type="submit">Enviar Correo</button>
    </form>
  );
};

export default PruebaEmailJs;
