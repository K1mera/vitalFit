import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { userAuth } from "../../context/auth-context";
import { userDirectionBDD } from "../../firebase/userDirectionBDD";
import { useNavigate } from "react-router-dom";

const PreCheckout = () => {
  const { currentUser, user, loading, setShowCart } = useContext(userAuth);
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios(
        "https://apis.datos.gob.ar/georef/api/provincias"
      );
      setProvincias(data.provincias);
    }
    fetchData();
  }, []);
  const navigate = useNavigate();
  const {
    getValues,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { provincia } = getValues();

  //Trae los municipios de acuerdo a la provincia seleccionada
  const handleProvincias = async (e) => {
    handleMunicipios(e.target.value);
  };

  const handleMunicipios = async (provincia) => {
    const { data } = await axios(
      `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=500`
    );
    setMunicipios(data.municipios);
  };

  //si user ya tiene data registrada, trae los municipios de acuerdo a la provincia guardada en bdd
  if (!loading) {
    if (user.dataCompleted) {
      if (!municipios.length) handleMunicipios(provincia);
    }
  }

  const handleData = async (data) => {
    if (data) {
      await userDirectionBDD(currentUser.uid, data);
      setShowCart(true);
    }
  };

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <form className="flex-row my-2 mx-auto w-[50vw] font-bebas text-xl">
          <p>
            Los campos con <span className="text-primary">*</span> son
            obligatorios
          </p>
          <div className="max-w-fit mx-auto">
            <div className="m-2">
              <label htmlFor="nombre" className="m-5">
                <span className="text-primary text-2xl mr-1">*</span>
                Nombre:
              </label>
              <input
                id="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  maxLength: {
                    value: 15,
                    message: "Debe tener menos de 15 caracteres",
                  },
                  pattern: {
                    value:
                      /^[A-Z][A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\s]+$/,
                    message:
                      "Ingresa un nombre valido, la primera letra debe ser mayúscula",
                  },

                  value: user.name || "",
                })}
                onChange={(e) => setValue("name", e.target.value)}
                type="text"
                className={`p-1.5 w-72 font-montserrat  border-x-transparent  border-t-transparent border-b-2 focus:ring-0 focus:border-transparent focus:border-b-red-500${
                  errors.name ? `bg-red-200` : ""
                } border-zinc-600`}
                placeholder="nombre"
              />
              <p className=" text-red-500 font-medium">
                {errors.name?.message}
              </p>
            </div>
            <div className="m-2">
              <label htmlFor="apellido" className="m-5">
                <span className="text-primary text-2xl mr-1">*</span>
                Apellido:
              </label>
              <input
                id="apellido"
                {...register("apellido", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  maxLength: {
                    value: 15,
                    message: "Debe tener menos de 15 caracteres",
                  },
                  pattern: {
                    value:
                      /^[A-Z][A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\s]+$/,
                    message:
                      "Ingresa un apellido valido, la primera letra debe ser mayúscula",
                  },
                  value: user.apellido || "",
                })}
                type="text"
                className={`p-1.5 w-72 font-montserrat  border-x-transparent  border-t-transparent border-b-2 focus:ring-0 focus:border-transparent focus:border-b-red-500${
                  errors.apellido ? `bg-red-200` : ""
                } border-zinc-600`}
                placeholder="apellido"
              />
              <p className=" text-red-500 font-medium">
                {errors.apellido?.message}
              </p>
            </div>
            <div className="m-2">
              <label htmlFor="documento" className="m-5">
                <span className="text-primary text-2xl mr-1">*</span>
                DNI:
              </label>
              <input
                id="documento"
                {...register("documento", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  pattern: {
                    value: /^[0-9-]+$/i,
                    message: "Documento invalido",
                  },
                  maxLength: {
                    value: 15,
                    message: "Debe tener menos de 15 caracteres",
                  },
                  value: user.documento || "",
                })}
                type="text"
                className={`p-1.5 w-72 font-montserrat border-x-transparent  border-t-transparent border-b-2 focus:ring-0 focus:border-transparent focus:border-b-red-500${
                  errors.documento ? `bg-red-200` : ""
                } border-zinc-600`}
                placeholder="numero de documento"
              />
              <p className=" text-red-500 font-medium">
                {errors.documento?.message}
              </p>
            </div>
            <div className="m-2">
              <label htmlFor="teléfono" className="m-5">
                <span className="text-primary text-2xl mr-1">*</span>
                Teléfono:
              </label>
              <input
                id="telefono"
                {...register("telefono", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  pattern: {
                    value: /^\+\d{1,3}\s?\d{4,}$/,
                    message: "Numero de telfono invalido",
                  },
                  value: user.telefono || "",
                })}
                type="text"
                className={`p-1.5 w-72 font-montserrat  border-x-transparent  border-t-transparent border-b-2 focus:ring-0 focus:border-transparent focus:border-b-red-500${
                  errors.telefono ? `bg-red-200` : ""
                } border-zinc-600`}
                placeholder="+573245271273"
              />
              <p className=" text-red-500 font-medium">
                {errors.telefono?.message}
              </p>
            </div>
            <div className="m-2">
              <label htmlFor="provincias" className="m-5">
                <span className="text-primary text-2xl mr-1">*</span>
                Provincia:
              </label>
              <select
                id="provincia"
                {...register("provincia", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  value: user.provincia || "",
                })}
                onChange={handleProvincias}
                className="border-x-transparent border-t-transparent border-b-2 w-72 font-montserrat focus:ring-0 focus:border-transparent focus:border-b-red-500">
                <option value="Elige una provincia" disabled>
                  Elige una provincia
                </option>
                {provincias.length &&
                  provincias.map((el, index) => (
                    <option key={index} value={el.nombre}>
                      {el.nombre}
                    </option>
                  ))}
              </select>
              <p className=" text-red-500 font-medium">
                {errors.provincia?.message}
              </p>
            </div>
            <div className="m-2">
              <label htmlFor="municipios" className="m-5">
                <span className="text-primary text-2xl mr-1">*</span>
                Municipio:
              </label>
              <select
                id="municipio"
                {...register("municipio", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  value: user.municipio || "",
                })}
                className="border-x-transparent border-t-transparent border-b-2 w-72 font-montserrat focus:ring-0 focus:border-transparent focus:border-b-red-500">
                <option value="Elige un municipio" disabled>
                  Elige un municipio
                </option>
                {municipios.length &&
                  municipios.map((el, index) => (
                    <option key={index} value={el.nombre}>
                      {el.nombre}
                    </option>
                  ))}
              </select>
              <p className=" text-red-500 font-medium">
                {errors.municipio?.message}
              </p>
            </div>
            <div className="m-2">
              <label htmlFor="ciudad" className="m-5">
                <span className="text-primary text-2xl mr-1">*</span>
                Ciudad:
              </label>
              <input
                id="ciudad"
                {...register("ciudad", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  pattern: {
                    value:
                      /^[A-Za-z0-9äÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\s\-,#.]+$/,

                    message: "Ciudad inválida",
                  },
                  maxLength: {
                    value: 25,
                    message: "Debe tener menos de 25 caracteres",
                  },
                  value: user.ciudad || "",
                })}
                type="text"
                className={`p-1.5 w-72 font-montserrat  border-x-transparent  border-t-transparent border-b-2 focus:ring-0 focus:border-transparent focus:border-b-red-500${
                  errors.ciudad ? `bg-red-200` : ""
                } border-zinc-600`}
                placeholder="Ingrese una ciudad"
              />
              <p className=" text-red-500 font-medium">
                {errors.ciudad?.message}
              </p>
            </div>
            <div className="m-2">
              <label htmlFor="calle" className="m-5">
                <span className="text-primary text-2xl mr-1">*</span>
                Calle:
              </label>
              <input
                {...register("calle", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  maxLength: {
                    value: 20,
                    message: "Debe tener menos de 20 caracteres",
                  },
                  pattern: {
                    value:
                      /^[A-Za-z0-9äÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\s\-,#.]+$/,
                    message: "Calle inválida",
                  },
                  value: user.calle || "",
                })}
                type="text"
                className={`p-1.5 w-72 font-montserrat  border-x-transparent  border-t-transparent border-b-2 focus:ring-0 focus:border-transparent focus:border-b-red-500${
                  errors.calle ? `bg-red-200` : ""
                } border-zinc-600`}
                placeholder="nombre de calle"
              />
              <p className=" text-red-500 font-medium">
                {errors.calle?.message}
              </p>
            </div>
            <div className="m-2">
              <label htmlFor="Altura" className="m-5">
                <span className="text-primary text-2xl mr-1">*</span>
                Altura:
              </label>
              <input
                id="altura"
                {...register("altura", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio",
                  },
                  maxLength: {
                    value: 10,
                    message: "Debe tener menos de 10 caracteres",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9\s\-,#.]+$/,
                    message: "Altura de calle inválida",
                  },
                  value: user.altura || "",
                })}
                type="text"
                className={`p-1.5 w-72 font-montserrat  border-x-transparent  border-t-transparent border-b-2 focus:ring-0 focus:border-transparent focus:border-b-red-500${
                  errors.altura ? `bg-red-200` : ""
                } border-zinc-600`}
                placeholder="altura de calle"
              />
              <p className=" text-red-500 font-medium">
                {errors.altura?.message}
              </p>
            </div>
            <div className="m-2">
              <label htmlFor="piso/departamento" className="m-5">
                Piso / Dpto :
              </label>
              <input
                id="pisoDpto"
                {...register("pisoDpto", {
                  pattern: {
                    value: /^[A-Za-z0-9\s\-,#.]+$/,
                    message: "Piso / dpto inválido",
                  },
                  value: user.pisoDpto || "",
                })}
                type="text"
                className={`p-1.5 w-72 font-montserrat  border-x-transparent  border-t-transparent border-b-2 focus:ring-0 focus:border-transparent focus:border-b-red-500${
                  errors.pisoDpto ? `bg-red-200` : ""
                } border-zinc-600`}
                placeholder="nº de piso / departamento"
              />
              <p className=" text-red-500 font-medium">
                {errors.pisoDpto?.message}
              </p>
            </div>
          </div>
          <div className="max-w-fit mx-auto">
            <button
              className=" text-white bg-primary p-2 px-5 rounded-xl"
              onClick={handleSubmit(handleData)}>
              finalizar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PreCheckout;
