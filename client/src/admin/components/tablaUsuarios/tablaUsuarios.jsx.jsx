import { firebaseDb } from "../../../firebase/config";
import {
    doc,
    updateDoc,
    collection,
    getDocs,
    getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";



const TablaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [botonesActivados, setBotonesActivados] = useState([]);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const querySnapshot = await getDocs(
                    collection(firebaseDb, "users")
                );
                const listaUsuarios = querySnapshot.docs.map((doc) =>
                    doc.data()
                );
                setUsuarios(listaUsuarios);
                const arrayusers = listaUsuarios.map(e => e.disabled)
                console.log(arrayusers);
                setBotonesActivados(arrayusers)
            } catch (error) {
                console.error("Error al obtener usuarios", error);
            }
        };
        obtenerUsuarios();
    }, [firebaseDb]);
    
    console.log(botonesActivados);

    const inhabilitarUsuario = async (id, index) => {
        const usuarioRef = doc(firebaseDb, "users", id);
        const usuarioDoc = await getDoc(usuarioRef);
        const currentDisabledStatus = usuarioDoc.data().disabled;
        try {
            await updateDoc(usuarioRef, {
                disabled: !currentDisabledStatus,
            });
            const nuevosBotonesActivados = [...botonesActivados];
            nuevosBotonesActivados[index] = !nuevosBotonesActivados[index];
            setBotonesActivados(nuevosBotonesActivados);
            console.log("Usuario inhabilitado en Firestore");
        } catch (error) {
            console.error("Error al inhabilitar usuario", error);
        }
    };

    return (
        <div className="w-full">
            <table className="w-full text-center   ">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Id</th>
                        <th>Correo</th>
                        <th>Action</th>
                        {/* Agrega más encabezados según sea necesario */}
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.displayName}</td>
                            <td>{usuario.id}</td>
                            <td>{usuario.email}</td>
                            <button
                                onClick={() =>
                                    inhabilitarUsuario(usuario.id, index)
                                }
                                className={`py-2 px-4 rounded ${
                                    botonesActivados[index]
                                    ? "bg-red-500 hover:bg-red-700 text-white"
                                    : "bg-green-500 hover:bg-green-700 text-white"
                                }`}
                            >
                                {botonesActivados[index]
                                    ? "Inhabilitado"
                                    : "Activo"}
                            </button>
                            {/* Agrega más celdas según sea necesario */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaUsuarios;
