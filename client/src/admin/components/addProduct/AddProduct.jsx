import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../../store";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    price: 0.0,
    size: "",
    stock: 0,
    image: [],
    flavour: [],
    description: "",
    pre_description: [],
  });

  const handlerChange = (e) => {
    if (e.target.name === image) {
      //guardar en un array las referencias de imagenes cargadas
      const selectedImage = Array.from(e.target.files);
      setProductData({
        ...productData,
        [e.target.name]: selectedImage,
      });
    } else if (e.target.name === flavour) {
      const selectedFlavour = e.target.value
        .split(",")
        .map((flavor) => flavor.trim());
      setProductData({
        ...productData,
        [e.target.value]: selectedFlavour,
      });
      //los sabores se reciben en un string separado por , y se convierte en array para mandarlo al back
    } else if (e.target.name === pre_description) {
      const preDescription = e.target.value
        .split(".")
        .map((desc) => desc.trim());
      setProductData({
        ...productData,
        [e.target.name]: preDescription,
      });
      //en el caso de la preDescripcion hace lo mismo, recibe string separa por . en un array
    } else {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(postProduct(productData));
  };

  return (
    <form>
      <label>
        Nombre del producto:
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handlerChange}
        />
      </label>
      <label>
        Precio:
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handlerChange}
        />
      </label>
      <label>
        Tamaño:
        <input
          type="text"
          name="size"
          value={productData.size}
          onChange={handlerChange}
        />
      </label>
      <label>
        Stock:
        <input
          type="number"
          name="stock"
          value={productData.stock}
          onChange={handlerChange}
        />
      </label>
      <label>
        Imagen del producto:
        <input
          type="file"
          name="image"
          value={productData.image}
          onChange={handlerChange}
          multiple // permite seleccionar varios archivos
        />
      </label>
      <label>
        Sabores (separados por comas):
        <input
          type="text"
          name="flavour"
          value={productData.flavour}
          onChange={handlerChange}
        />
      </label>
      <label>
        Descripcion:
        <input
          type="text"
          name="description"
          value={productData.description}
          onChange={handlerChange}
        />
      </label>
      <label>
        Pre Descripcion (separados por puntos):
        <input
          type="text"
          name="pre_description"
          value={productData.pre_description}
          onChange={handlerChange}
        />
      </label>
      <button onSubmit={handlerSubmit}>Crear producto</button>
    </form>
  );
};
