import { useEffect, useState } from "react";
import getUsers from "../../firebase/getUsers";
import { UserCardComp } from "../components";

export const UsersManagement = () => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  /* const startIndex = (currentPage - 1) * 6;
   const userPaginate = listUsers.slice(startIndex, startIndex + 6);
   const pages = Math.ceil(listUsers.length / 6); */
  const [aux, setAux] = useState(true);

  useEffect(() => {
    const users = async () => {
      const res = await getUsers();
      setListUsers(res);
    };
    users();
  }, [aux]);

  /*    const handleChangePage = (e) => {
        if (e.target.value === "prev") {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(currentPage + 1);
        }
    }; */

  const actualizarPadre = () => {
    setAux(!aux);
  };

  return (
    <main className="flex flex-col gap-5 h-full">
      <div className="h-[80%]">
        <section>
          <h1 className="font-bebas text-xl mb-2">Usuarios</h1>
        </section>
        <section className="flex flex-col gap-2">
          {listUsers.map((user, index) => (
            <UserCardComp
              key={index}
              user={user}
              actualizarPadre={actualizarPadre}
            />
          ))}
        </section>
      </div>
      <div className="h-[20%] flex items-end justify-center">
        {/*    <section className="flex items-center gap-2 w-full justify-center">
            <button
              value="prev"
              onClick={handleChangePage}
              disabled={currentPage <= 1}
              className="font-bebas p-2 hover:text-primary disabled:opacity-25 disabled:hover:text-black"
            >
              prev
            </button>
            <span className="font-bebas text-primary text-xl mb-1">
              {currentPage}
            </span>
            <button
              value="next"
              onClick={handleChangePage}
              disabled={currentPage === pages}
              className="font-bebas p-2 hover:text-primary disabled:opacity-25 disabled:hover:text-black"
            >
              next
            </button>
          </section> */}
      </div>
    </main>
  );
};
