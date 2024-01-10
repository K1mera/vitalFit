
import { LogoIcon } from "../icons";
import { AdminOption } from "../components"
import bgImage from "../icons/image-loginPage.jpeg";

export const AdminDashboard = () => {

    
  return (
    <main className="h-screen w-full flex justify-center items-center">
      <LogoIcon className={"w-[34px] h-[69px] absolute top-10 left-10 z-50"} />
      <img className="w-full h-full object-cover absolute top-0 left-0" src={bgImage} />
      <section className="flex gap-5 justify-between items-center h-[70%] w-[80%] z-40">
        <aside className="bg-[#475157F2] h-full gap-1 w-[30%] rounded-xl flex flex-col p-5">
            <AdminOption title={'ordenes'} />
            <AdminOption title={'control de inventario'} />
            <AdminOption title={'gestion de usuarios'} />
        </aside>
        <section className="bg-primaryLight w-full h-full rounded-xl">
            {/* render selected option */}
            
        </section>
      </section>
    </main>
  );
}
