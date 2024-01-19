import { useEffect, useState } from "react";
import getUsers from "../../firebase/getUsers";
import { UserCardComp } from "../components";

export const UsersManagement = () => {

    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * 7;
    const userPaginate = listUsers.slice(startIndex, startIndex + 7);
    const pages = Math.ceil(listUsers.length / 7);
    const [aux, setAux] = useState(true);


    useEffect(() => {
        const users = async () => {
            const res = await getUsers();
            setListUsers(res);
        };
        users();
    }, [aux]);
    
    const handleChangePage = (e) => {
        if (e.target.value === "prev") {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(currentPage + 1);
        }
    };


    const actualizarPadre = ()=> {
        setAux(!aux)
    }

    return (
        <main className="flex flex-col gap-5 h-full">
            <div className="h-[80%]">
                <section>
                    <h1 className="font-bebas text-xl">Usuarios</h1>
                </section>
                <section className="flex flex-col gap-2">
                    {userPaginate.map((user, index) => (
                        <UserCardComp key={index} user={user} actualizarPadre={actualizarPadre}/>
                    ))}
                </section>
            </div>
            <div className="h-[20%] flex items-end justify-center">
                <section className="flex justify-center items-end gap-4">
                    <button
                        value="prev"
                        onClick={handleChangePage}
                        disabled={currentPage <= 1}
                        className=" disabled:opacity-25"
                    >
                        {"<"}
                    </button>
                    <span>
                        Page {currentPage} / {pages}
                    </span>
                    <button
                        value="next"
                        onClick={handleChangePage}
                        disabled={currentPage === pages}
                        className=" disabled:opacity-25"
                    >
                        {">"}
                    </button>
                </section>
            </div>
        </main>
    );
};

