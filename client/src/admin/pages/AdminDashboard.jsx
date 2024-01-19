import { useState } from "react";
import { LogoIcon } from "../../icons";
import { AdminOption, Inventario } from "../components";
import { UsersManagement } from "../views";

import bgImage from "/assets/image-loginPage.jpeg";
import AddProducts from "../components/addProduct/AddProducts";
import Orders from "../components/orders/Orders";

export const AdminDashboard = () => {
  const [componentSelected, setComponentSelected] = useState("");

  const handleOptionSelect = (option) => {
    setComponentSelected(option);
  };

  const renderSelectedComponent = () => {
    switch (componentSelected) {
      case "Agregar productos":
        return <AddProducts />;
      case "Inventario":
        return <Inventario />;
      case "Control de usuarios":
        return <UsersManagement />;
      case "Ordenes":
        return <Orders />;
      default:
        return <Orders />; // Render nothing if no option is selected
    }
  };

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <LogoIcon className={"w-[34px] h-[69px] absolute top-10 left-10 z-50"} />
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src={bgImage}
      />
      <section className="flex gap-5 justify-between items-center h-[70%] w-[80%] z-40 over">
        <aside className="bg-[#475157F2] h-full gap-1 w-[30%] rounded-xl flex flex-col p-5 ">
          <AdminOption
            title={"ordenes"}
            options={["Ordenes"]}
            handleOptionSelect={handleOptionSelect}
          />
          <AdminOption
            title={"control de inventario"}
            options={["Agregar productos", "Inventario"]}
            handleOptionSelect={handleOptionSelect}
          />
          <AdminOption
            title={"gestion de usuarios"}
            options={["Control de usuarios"]}
            handleOptionSelect={handleOptionSelect}
          />
        </aside>
        <section className="overflow-scroll overflow-x-hidden bg-primaryLight w-full h-full rounded-xl p-5">
          {/* render selected option */}
          {renderSelectedComponent()}
        </section>
      </section>
    </main>
  );
};
