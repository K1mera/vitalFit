import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../../store";
import { uploadfiles } from "../../../firebase/config";
import Swal from "sweetalert2";

export default function AddProducts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);
  const [fileViewed, setfileViewed] = useState([]);
  const [succes, SetSucces] = useState(false);
  const [cargaExitosa, setCargaExitosa] = useState(null);

  console.log(cargaExitosa);

  const fileUrlRef = useRef([]);

  const { products } = useSelector((state) => state.product);

  const validationProduct = (productName) => {
    console.log(productName);
    const ProductoExistente = products.some(
      (prod) => prod.name === productName
    );

    return ProductoExistente;
  };

  useEffect(() => {
    if (cargaExitosa) {
      Swal.fire({
        title: "El producto se creo con exito!",
        icon: "success",
      });
    } else if (cargaExitosa === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El producto ya existe!",
      });
    }

    setCargaExitosa(null);
  }, [cargaExitosa]);

  const hanldeFileChange = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const review = selectedFilesArray.map((file, index) => ({
      id: index,
      file: file,
      previewUrl: URL.createObjectURL(file), //crea una url de vista previa
    }));
    setFile((prevFiles) => [...prevFiles, ...selectedFilesArray]);
    setfileViewed((prevFiles) => [...prevFiles, ...review]);
  };

  const deleteFile = (id) => {
    const filtro = fileViewed.filter((file) => file.id !== id);
    setfileViewed(filtro);
    setFile(filtro);
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    try {
      const response = await Promise.all(file.map((file) => uploadfiles(file)));
      fileUrlRef.current = response;
      SetSucces(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data) => {
    data.flavour = data.flavour.split(",").map((item) => item.trim());
    data.pre_description = data.pre_description
      .split(",")
      .map((item) => item.trim());
    data.stock = Number(data.stock);
    data.image = file.length ? fileUrlRef.current : file;
    data.categoryId = Number(data.categoryId);
    console.log(fileUrlRef);

    const response = validationProduct(data.name);
    console.log(response);
    console.log(data);
    if (response === false) {
      dispatch(postProduct(data, setCargaExitosa));
    } else {
      setCargaExitosa(false);
    }
  };

  console.log(file);
  return (
    <div className=" font-bebas text-gray-700 relative w-full h-[90%] overflow-scroll bg-primaryLight px-5 py-2 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2 ">
            Nombre del producto:
          </label>
          <input
            className="border-stone-400/90 rounded w-full py-1 px-3 bg-stone-200/70"
            type="text"
            {...register("name", {
              required: true,
              maxLength: 50,
            })}
          />
          {errors.name?.type === "required" && (
            <span className="text-red-500 text-sm">Campo Obligatorio</span>
          )}
          {errors.name?.type === "maxLength" && (
            <span className="text-red-500 text-sm">
              El campo nombre debe tener menos de 50 caracteres
            </span>
          )}
        </div>
        <div className="relative"></div>
        <label className="block  text-sm font-bold mb-2 " htmlFor="price">
          Precio:
        </label>
        <div className="flex items-center">
          <span className="absolute pl-1">$</span>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <input
                className=" border-stone-400/90 bg-stone-200/70 rounded py-1 px-3 "
                {...field}
                type="text"
                placeholder="0.00"
                onChange={(e) => {
                  const inputValue = e.target.value;

                  // Elimina todo excepto dígitos y puntos
                  const cleanedValue = inputValue.replace(/[^\d.]/g, "");

                  // Dividir la parte entera y la parte decimal
                  const [integerPart, decimalPart] = cleanedValue.split(".");

                  // Limitar la longitud de la parte decimal a dos caracteres
                  const limitedDecimalPart =
                    decimalPart !== undefined
                      ? `.${decimalPart.slice(0, 2)}`
                      : "";

                  // Formatea el valor final
                  const formattedValue = `${integerPart}${limitedDecimalPart}`;

                  // Actualiza el valor del campo
                  field.onChange(formattedValue);
                }}
              />
            )}
          />
          {errors.price?.type === "required" && (
            <span className="text-red-500 text-sm">Campo Obligatorio</span>
          )}
        </div>
        <div className="mb-4">
          <label className=" block text-gray-700 text-sm font-bold mb-2">
            Tamaño:
          </label>
          <input
            className="border-stone-400/90 rounded w-full py-1 px-3 bg-stone-200/70"
            type="text"
            {...register("size", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.size?.type === "required" && (
            <span className="text-red-500 text-sm">Campo Obligatorio</span>
          )}
          {errors.size?.type === "maxLength" && (
            <span className="text-red-500 text-sm">
              No puede tener mas de 30 caracteres
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="  block text-gray-700 text-sm font-bold mb-2">
            Stock:
          </label>
          <input
            className="border-stone-400/90 rounded w-full py-1 px-3 bg-stone-200/70"
            type="text"
            {...register("stock", {
              required: true,
              maxLength: 20,
              pattern: /^[0-9]+$/,
            })}
          />
          {errors.stock?.type === "required" && (
            <span className="text-red-500 text-sm">Campo Obligatorio</span>
          )}
          {errors.stock?.type === "maxLength" && (
            <span className="text-red-500 text-sm">
              No puede tener mas de 20 caracteres
            </span>
          )}
          {errors.stock?.type === "pattern" && (
            <span className="text-red-500 text-sm">
              No se permiten valores que no sean numeros
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className=" block text-gray-700 text-sm font-bold mb-2">
            Imagen del producto:
          </label>
          <input
            className=" border-stone-400/90 rounded w-full py-1 px-3 bg-stone-200/70"
            type="file"
            multiple
            {...register("image", {
              required: true,
            })}
            onChange={hanldeFileChange}
          />
          <div className="mt-2 flex space-x-2">
            {fileViewed.map((file, index) => (
              <div key={index}>
                <img
                  src={file.previewUrl}
                  // alt={`Preview ${index}`}
                  className="max-w-20 max-h-20"
                />
                <button
                  className="absolute bg-red-500 text-white p-1 rounded"
                  onClick={() => deleteFile(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
            onClick={handleSubmitFile}
          >
            cargar imagenes
          </button>
          {errors.image?.type === "required" && (
            <span className="text-red-500 text-sm">Campo Obligatorio</span>
          )}
        </div>
        {succes && (
          <div className="mb-4">
            <label className=" block text-gray-700 text-sm font-bold mb-2">
              Sabor: (separado por comas)
            </label>
            <input
              className="border-stone-400/90 rounded w-full py-1 px-3 bg-stone-200/70"
              type="text"
              {...register("flavour", {
                required: true,
              })}
            />
            {errors.flavour?.type === "required" && (
              <span className="text-red-500 text-sm">Campo Obligatorio</span>
            )}
          </div>
        )}
        {succes && (
          <div className="mb-4">
            <label className=" block text-gray-700 text-sm font-bold mb-2">
              Descripcion:
            </label>
            <input
              className="border-stone-400/90 rounded w-full py-1 px-3 bg-stone-200/70"
              type="text"
              {...register("description", {
                required: true,
              })}
            />
            {errors.description?.type === "required" && (
              <span className="text-red-500 text-sm">Campo Obligatorio</span>
            )}
          </div>
        )}

        {succes && (
          <div className="mb-4">
            <label className=" block text-gray-700 text-sm font-bold mb-2">
              PreDescripcion: (separado por comas)
            </label>
            <input
              className="border-stone-400/90 rounded w-full py-1 px-3 bg-stone-200/70"
              type="text"
              {...register("pre_description", {
                required: true,
              })}
            />
            {errors.pre_description?.type === "required" && (
              <span className="text-red-500 text-sm">Campo Obligatorio</span>
            )}
          </div>
        )}
        {succes && (
          <div>
            <label className=" block text-gray-700 text-sm font-bold mb-2">
              Categoria
            </label>
            <select
              className=" border-stone-400/90 bg-stone-200/70 rounded py-1 px-3 "
              {...register("categoryId")}
            >
              <option value="1">Proteina</option>
              <option value="2">Control de peso</option>
              <option value="5">Creatina</option>
              <option value="6">Aminoacidos</option>
              <option value="8">Energia</option>
            </select>
          </div>
        )}

        {succes && (
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          >
            Crear Producto
          </button>
        )}
      </form>
    </div>
  );
}
