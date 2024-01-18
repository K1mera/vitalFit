import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postProduct } from "../../../store";
import { uploadfiles } from "../../../firebase/config";

export default function AddProducts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);
  const [fileViewed, setfileViewed] = useState([]);
  const [succes, SetSucces] = useState(false);

  const fileUrlRef = useRef([]);

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
    data.image = fileUrlRef.current;
    data.categoryId = Number(data.categoryId);
    console.log(fileUrlRef);

    console.log(data);

    dispatch(postProduct(data));
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
              {" "}
              El campo nombre debe tener menos de 50 caracteres
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Precio:
          </label>
          <input
            className="border-stone-400/90 rounded w-full py-1 px-3 bg-stone-200/70"
            type="text"
            {...register("price", {
              required: true,
            })}
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
            })}
          />
          {errors.size?.type === "required" && (
            <span className="text-red-500 text-sm">Campo Obligatorio</span>
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
            })}
          />
          {errors.stock?.type === "required" && (
            <span className="text-red-500 text-sm">Campo Obligatorio</span>
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
              Sabor:
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
              PreDescripcion:
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
