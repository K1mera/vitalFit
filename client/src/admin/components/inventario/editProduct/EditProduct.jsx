import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, putProduct } from "../../../../store";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);

  const productFilter = products.filter((prod) => prod.id == id);
  const product = productFilter[0];
  console.log(product.flavour);

  const [productData, setProductData] = useState({
    name: product.name,
    price: product.price,
    size: product.size,
    stock: product.stock,
    image: [],
    flavour: product.flavour,
    description: product.description,
    pre_description: product.pre_description,
  });

  const handleChange = (e) => {
    if (e.target.name === productData.image) {
      //guardar en un array las referencias de imagenes cargadas
      const selectedImage = Array.from(e.target.files);
      setProductData({
        ...productData,
        [e.target.name]: selectedImage,
      });
    } else if (e.target.name === productData.flavour) {
      const selectedFlavour = e.target.value
        .split(",")
        .map((flavor) => flavor.trim());
      setProductData({
        ...productData,
        [e.target.value]: selectedFlavour,
      });
      //los sabores se reciben en un string separado por , y se convierte en array para mandarlo al back
    } else if (e.target.name === productData.pre_description) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putProduct(productData, id));
    
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={productData.name}
            name="name"
            onChange={handleChange}
            maxLength={20}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Precio
          </label>
          <input
            type="text"
            id="price"
            value={productData.price}
            name="price"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-600"
          >
            Tamaño
          </label>
          <input
            type="text"
            id="size"
            value={productData.size}
            name="size"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-600"
          >
            Stock
          </label>
          <input
            type="text"
            id="stock"
            value={productData.stock}
            name="stock"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Imagen
          </label>
          <img
            src={product.image[0]}
            alt=""
            className="mt-1 mb-4 w-full h-auto rounded"
          />
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="flavour"
            className="block text-sm font-medium text-gray-600"
          >
            Sabor
          </label>
          <input
            type="text"
            id="flavour"
            value={productData.flavour}
            name="flavour"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Descripcion
          </label>
          <textarea
            id="description"
            value={productData.description.join("\n")}
            name="description"
            onChange={(e) =>
              handleChange("description", e.target.value.split("\n"))
            }
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="pre_description"
            className="block text-sm font-medium text-gray-600"
          >
            Pre descripcion
          </label>
          <textarea
            id="pre_description"
            value={productData.pre_description.join("\n")}
            name="pre_description"
            onChange={(e) =>
              handleChange("pre_description", e.target.value.split("\n"))
            }
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Editar producto
        </button>
      </form>
    </div>
  );
}
