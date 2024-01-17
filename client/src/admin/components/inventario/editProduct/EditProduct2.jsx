import { useForm } from "react-hook-form";
import { putProduct } from "../../../../store";
import { useParams } from "react-router-dom";

export default function EditProduct2() {
  const { register, handleSubmit } = useForm();

  const { id } = useParams();
  const onSubmit = (data) => {
    console.log(data);
    putProduct(data, id);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input type="text" {...register("name")} />
        </div>

        <div>
          <label>precio</label>
          <input type="text" {...register("price")} />
        </div>
        <div>
          <label>size</label>
          <input type="text" {...register("size")} />
        </div>
        <div>
          <label>stock</label>
          <input type="text" {...register("stock")} />
        </div>
        <div>
          <label>image</label>
          <input type="text" {...register("image")} />
        </div>
        <div>
          <label>flavour</label>
          <input type="text" {...register("flavour")} />
        </div>
        <div>
          <label>descripcion</label>
          <input type="text" {...register("description")} />
        </div>
        <div>
          <label>pre descripcion</label>
          <input type="text" {...register("pre-description")} />
        </div>
        <button type="submit">enviAR</button>
      </form>
    </div>
  );
}
