export const Detail = () => {
  const detailProducts = {
    id: 1,
    name: "ISO WHEY PROTEIN 1",
    price: 10000,
    image:
      "http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw",
    type: "PROTEINAS",
    offer: true,
  };

  return (
    <main className="flex flex-column items-center w-screen gap-2">
      <section className="w-full flex flex-column" >
        <img
          className="w-85 h-85"
          style={{
            marginLeft: "100px",
            marginTop: "20px",
            width: "20%",
            float: "left",
            marginRight: "2%",
            marginLeft: "20%",
            boxSizing: "border-box",
          }}
          src={detailProducts.image}
        />
        <div
          style={{
            width: "48%",
            float: "right",
            marginRight: "5%",
            marginTop: "20px",
            boxSizing: "border-box",
            background: "#D9D9D9",
            padding: "10px",
            borderRadius: "17px",
          }}
          className=""
        >
          <h1
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: "#000",
              fontSize: "1.4rem",
            }}
          >
            {detailProducts.name}
          </h1>
          <h1> ⭐ ⭐ ⭐ ⭐ ⭐ 7 opiniones</h1>
          <h1
            style={{
              color: "#D74545",
              fontSize: "1.5rem",
              marginTop: "16px",
            }}
          >
            {detailProducts.price}
          </h1>
          <button
            style={{
              border: "2px solid #000",
              color: "#000",
              padding: "10px 20px",
              borderRadius: "15px",
              marginTop: "5px",
            }}
          >
            - 1 +
          </button>{" "}
          <button
            style={{
              background: "#2FD6BD",
              color: "white",
              padding: "10px",
              borderRadius: "15px",
              fontFamily: "NuevaFuente,  bebas neue",
              fontSize: "1.2rem",
              marginLeft: "6px",
            }}
          >
            AGREGAR
          </button>
          <p
            style={{
              fontFamily: "NuevaFuente, montserrat",
              marginTop: "10px",
            }}
          >
            Es un producto muy bueno. Potencia musculos rapidamente y permite el
            desarrollo adecuado de los huesos, y el cuero cabelludo, saludable y
            nutritivo recomendado por terapeutas en todo el mundo.
          </p>
          <strong>
            <h1
              style={{
                fontSize: "1.1rem",
                marginTop: "5px",
              }}
            >
              Caracteristicas
            </h1>
          </strong>
          <li>Resultados rápidos</li>
          <li>Fácil digestión</li>
          <li>Amigable con nuestro intestino</li>
        </div>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            width: "100px",
            height: "100px",
            marginTop: "150px",
            marginLeft: "8%",
            alignItems: "center",
            paddingTop: "105px",
          }}
        >
          <div>
            <img
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "10px",
              }}
              src="https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912832/62358693-avatar-hombre-de-dibujos-animados-usuario-de-persona-masculina-ilustraci%C3%B3n-vectorial.jpg"
            />
            <h1
              style={{
                color: "#000",
                fontFamily: "Nueva Fuente, bebas neue",
                fontSize: "1.2rem",
              }}
            >
              USER 1
            </h1>
            <h1
              style={{
                display: "flex",
                width: "50px",
                marginTop: "30px",
              }}
            >
              ⭐⭐⭐⭐⭐
            </h1>

            <h2
              style={{
                width: "235px",
                marginTop: "6px",
              }}
            >
              Muy buen producto, llevo dos días usandolo y ya parezco Hulk
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};
