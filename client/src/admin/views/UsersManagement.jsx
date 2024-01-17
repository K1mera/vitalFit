import getUsers from "../../firebase/getUsers"
import {UserCardComp} from "../components";


export const UsersManagement = () => {

    // const startIndex = (currentPage - 1) * 8;

    const users = async() => {
        const res = await getUsers();
        return res;
    }
    console.log(users());

  return (
    <main className="flex flex-col gap-5">
        <section>
            <h1 className="font-bebas text-xl">Usuarios</h1>
        </section>
        <section className="flex flex-col gap-2">
            <UserCardComp />
            <UserCardComp />
        </section>

    </main>
  )
}
