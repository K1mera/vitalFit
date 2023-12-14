export const CardsProducts = ({ name, imagen, price }) => {
  return (
    <div
      className="flex flex-row"
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <div
        style={{
          borderLeft: "1px solid #D9D9D9",
          borderRight: "1px solid #D9D9D9",
          borderBottom: "1px solid #D9D9D9",
          borderTop: "none",
          boxShadow:
            "5px 0 10px -5px rgba(0, 0, 0, 0.5), -5px 0 10px -5px rgba(0, 0, 0, 0.5)",
          padding: "10px 20px",
          borderRadius: "15px",
          marginTop: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img height={160} width={160} src={imagen} />
        </div>
        <div>
          <h1
            style={{
              width: "250px",
              fontFamily: "Nueva Fuente, bebas neue",
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {name}
          </h1>
          <h2
            style={{
              fontFamily: "Nueva Fuente, montserrat",
              fontSize: "1.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {price}
          </h2>
          <br />
          <div style={{
               display: "grid",
               placeItems: "center",
          }} >
            <button
              style={{
                backgroundColor: "#2FD6BD",
                color: "white",
                fontFamily: "Nueva Fuente, bebas neue",
                fontSize: "1.6rem",
                padding: "3%",
                paddingLeft: "12%",
                paddingRight: "12%",
                borderRadius: "20px",
              }}
            >
              AGREGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
