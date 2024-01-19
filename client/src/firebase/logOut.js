import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";

const auth = getAuth();

const logOutUser = async () => {
  const response = await Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: true,
    showCancelButton: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  }).fire({
    icon: "question",
    title: `¿Quieres cerrar sesión?`,
  });

  if (response.isConfirmed === true) {
    await signOut(auth);
    console.log("El usuario cerro sesión exitosamente");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: `Sesión cerrada exitosamente`,
    });
    setTimeout(() => {
      window.location.href = "/home";
    }, 2000);

    return true;
  } else {
    console.log("No se pudo cerrar sesion");
    return false;
  }
};

export default logOutUser;
