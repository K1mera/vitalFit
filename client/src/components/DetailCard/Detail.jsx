import { useState } from "react";
import Calification from "../Calification";
import { CardsProducts } from "../CardsProducts/CardsProducts";

const detailProducts = {
  id: 1,
  name: "ISO WHEY PROTEIN 1",
  price: 10000,
  image:
    "http://drive.google.com/uc?export=view&id=1e5K09pxyEJjxOpmurWuP7V5quvuQ2Pjw",
  type: "PROTEINAS",
  offer: true,
};

const detailUsers = [
  {
    id: 1,
    name: "USER 1",
    image:
      "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912832/62358693-avatar-hombre-de-dibujos-animados-usuario-de-persona-masculina-ilustraci%C3%B3n-vectorial.jpg",
    description: "Muy buen producto, llevo dos días usandolo y ya parezco Hulk",
    offer: true,
  },
  {
    id: 1,
    name: "USER 2",
    image:
      "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912832/62358693-avatar-hombre-de-dibujos-animados-usuario-de-persona-masculina-ilustraci%C3%B3n-vectorial.jpg",
    description: "Muy buen producto, llevo dos días usandolo y ya parezco Hulk",
  },
  {
    id: 1,
    name: "USER 3",
    image:
      "https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160912832/62358693-avatar-hombre-de-dibujos-animados-usuario-de-persona-masculina-ilustraci%C3%B3n-vectorial.jpg",
    description: "Muy buen producto, llevo dos días usandolo y ya parezco Hulk",
  },
];

const cardsProducts = [
  {
    name: "PRE WORKOUT 400GR",
    imagen:
      "https://stayfit.com.ar/wp-content/uploads/2022/10/1-33-349x349.png",
    price: "$10.000",
  },
  {
    name: "100% CAFFEINE MUSCLETECH",
    imagen:
      "https://d2d21jw8en5l3a.cloudfront.net/vendty2_db_41754_merc2021/imagenes_productos/309_cafeina_125_tabletas_muscletech_imagen.jpeg",
    price: "$12.000",
  },
  {
    name: "CREATINE 500GR",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2-BQXeInIiUbUTQrQkZ4yMeyAImgiTQFyw&usqp=CAU",
    price: "$14.000",
  },
];

export const Detail = () => {
  const [count, setCount] = useState(0);

  const incrementarContador = () => {
    setCount(count + 1);
  };

  const disminuirContador = () => {
    setCount(count - 1);
  };

  return (
    <div
      className="flex flex-column items-center w-screen gap-2"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <section className="w-full flex flex-column" style={{}}>
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
            borderRadius: "25%",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                border: "2px solid #000",
                color: "#000",
                padding: "8px",
                borderRadius: "15px",
                marginTop: "5px",
                width: "12%",
                gap: "12%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2%",
              }}
            >
              <button
                onClick={disminuirContador}
                disabled={count === 0 && true}
              >
                -
              </button>
              <p
                style={{
                  fontFamily: "Nueva Fuente, bebas neue",
                  fontSize: "1.2rem",
                }}
              >
                {count}
              </p>{" "}
              <button onClick={incrementarContador}>+</button>
            </div>
            <div
              style={{
                float: "",
              }}
            >
              <button
                style={{
                  background: "#2FD6BD",
                  color: "white",
                  padding: "10px",
                  borderRadius: "15px",
                  fontFamily: "NuevaFuente,  bebas neue",
                  fontSize: "1.2rem",
                  marginLeft: "6px",
                  marginTop: "10px",
                }}
              >
                AGREGAR
              </button>
            </div>
          </div>
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
      <div
        style={{
          gap: 30,
          display: "flex",
          marginTop: "4.5%",
        }}
        className="w-full flex flex-column"
      >
        {detailUsers.map((item) => (
          <Calification
            key={item.id}
            title={item.name}
            image={item.image}
            description={item.description}
          />
        ))}
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: "5%",
          color: "#475157",
          fontFamily: "Nueva Fuente, bebas neue",
          fontSize: "1.3rem",
        }}
        className="w-full"
      >
        Ver más
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: "3.5%",
          fontFamily: "Nueva Fuente, bebas neue ",
          fontSize: "2rem",
        }}
        className="w-full"
      >
        OPCIONES SIMILARES
      </div>
      <div
        style={{
          gap: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2.5%",
          marginBottom: "5%",
        }}
        className="w-full"
      >
        {cardsProducts.map((i) => {
          return (
            <CardsProducts name={i.name} imagen={i.imagen} price={i.price} />
          );
        })}
      </div>
    </div>
  );
};
