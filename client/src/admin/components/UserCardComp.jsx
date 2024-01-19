import { useEffect, useState } from "react";
import { firebaseDb } from "../../firebase/config";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const UserCardComp = ({ user, actualizarPadre }) => {
    const [botonStatus, setBotonStatus] = useState(user.disabled);
    const { displayName, email, role, id } = user;


    useEffect(() => {
        setBotonStatus(user.disabled);
    }, [user.disabled]);

    const inhabilitarUsuario = async (uid) => {
        const usuarioRef = doc(firebaseDb, "users", uid);
        const usuarioDoc = await getDoc(usuarioRef);
        const currentDisabledStatus = usuarioDoc.data().disabled;
        try {
            await updateDoc(usuarioRef, {
                disabled: !currentDisabledStatus,
            });
            setBotonStatus(!botonStatus);
            actualizarPadre()
            console.log("Usuario inhabilitado en Firestore");
        } catch (error) {
            console.error("Error al inhabilitar usuario", error);
        }
    };

    return (
        <main className="py-2 px-4 h-12 bg-white/70  items-center rounded-xl flex gap-2 font-montserrat">
            <h2 className="w-[25%]">{displayName}</h2>
            <p className="w-[40%]">{email}</p>
            <span className="text-red-500 w-[12%]">{role}</span>
            <button
                onClick={() => inhabilitarUsuario(id)}
                className={`py-1 px-2 rounded ${
                    botonStatus
                        ? "bg-red-500 hover:bg-red-700 text-white"
                        : "bg-green-500 hover:bg-green-700 text-white"
                }`}
            >
                {botonStatus ? "inhabilitado" : "habilitado"}
            </button>
        </main>
    );
};
