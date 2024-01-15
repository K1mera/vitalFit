import { useSelector } from "react-redux";
import Card from "../components/Card/Card";
import "./home.css";
import { Link } from "react-router-dom";
import { productsFilters } from "../store";
import { useDispatch } from "react-redux";
import { Loading } from "../components";

export const Home = () => {
    const { copyProducts, loading, filters } = useSelector(
        (state) => state.product
    );
    const destacados = seleccionarElementosAleatorios(copyProducts, 5);
    const productoHeader = seleccionarElementoAleatorio(copyProducts);
    const product1 = seleccionarElementoAleatorio(copyProducts);
    const product2 = seleccionarElementoAleatorio(copyProducts);
    const dispatch = useDispatch();

    const navToCategory = (e) => {
        dispatch(productsFilters({ ...filters, category: e.target.value }));
    };

    function seleccionarElementoAleatorio(array) {
        const indiceAleatorio = Math.floor(Math.random() * array.length);
        return array[indiceAleatorio];
    }

    function seleccionarElementosAleatorios(array, cantidad) {
        if (array.length === 0 || cantidad <= 0 || cantidad > array.length) {
            return [];
        }

        const copiaArray = array.slice();
        const elementosSeleccionados = [];

        for (let i = 0; i < cantidad; i++) {
            const indiceAleatorio = Math.floor(
                Math.random() * copiaArray.length
            );
            const elementoSeleccionado = copiaArray.splice(
                indiceAleatorio,
                1
            )[0];
            elementosSeleccionados.push(elementoSeleccionado);
        }

        return elementosSeleccionados;
    }

    return (
        <div>
            {/* Aqui abajo pongan el componente que van a trbajar */}
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <div className=" bg-[url('/images/Rectangle.jpg')] bg-center bg-no-repeat bg-cover">
                        <section className="header flex w-full h-[420px] justify-evenly bg-black/60">
                            <section className="textHeader flex items-center text-white font-montserrat text-4xl font-extralight	">
                                <span>
                                    Vuelvete imparable con el <br /> Nuevo {" "}
                                    <strong>{productoHeader.name}</strong>
                                </span>
                            </section>
                            <section className="offerCard flex justify-center items-center">
                                <Card {...productoHeader} />
                            </section>
                        </section>
                    </div>
                    <div className="categories flex justify-center bg-primaryLight py-5">
                        <section className="buttonsCategories flex gap-12">
                            <Link to="/productsPage">
                                <button
                                    className="categoriesButton"
                                    value="Proteína"
                                    onClick={navToCategory}
                                >
                                    PROTEINA
                                </button>
                            </Link>
                            <Link to="/productsPage">
                                <button
                                    className="categoriesButton"
                                    value="Creatina"
                                    onClick={navToCategory}
                                >
                                    CREATINA
                                </button>
                            </Link>
                            <Link to="/productsPage">
                                <button
                                    className="categoriesButton"
                                    value="Energía"
                                    onClick={navToCategory}
                                >
                                    ENERGIA
                                </button>
                            </Link>
                            <Link to="/productsPage">
                                <button
                                    className="categoriesButton"
                                    value="Control de peso"
                                    onClick={navToCategory}
                                >
                                    CONTROL DE PESO
                                </button>
                            </Link>
                        </section>
                    </div>
                    <div className="destacadosTitle font-bebas text-center text-[40px] pt-8">
                        <span>DESTACADOS</span>
                    </div>
                    <div className="destacadosCards flex justify-evenly">
                        {destacados.map((e) => (
                            <Card key={e.id} {...e} />
                        ))}
                    </div>
                    <div className="photosContainer flex justify-evenly h-[600px] my-[60px]">
                        <section className="photoDiv1 flex flex-col items-center justify-between w-[45%] bg-[url('/images/menconcapucha.jpg')] bg-no-repeat bg-cover">
                            <section className="descriptionText bg-primaryLight w-[90%] rounded-[20px] font-bebas text-2xl py-2.5 px-5 mt-3.5 text-center ">
                                <p>
                                    Los productos Mass Gain están compuestos
                                    principalmente por carbohidratos. Su función
                                    principal es contribuir en la ganancia de
                                    masa muscular y en el aumento de peso.
                                </p>
                            </section>
                            <section className="productSection flex justify-center items-end h-1/2">
                                <div className="productDescription bg-white flex items-center w-[70%] h-1/2 rounded-[20px] mb-[8%] relative">
                                    <section className="w-1/4 overflow-hidden ml-[5px]">
                                        <Link
                                            to={`/detail/${product1.id}`}
                                            className="w-full"
                                        >
                                            <img
                                                src={product1.image}
                                                alt=""
                                                className="images-inphoto"
                                            />
                                        </Link>
                                    </section>
                                    <section className="w-3/4">
                                        <p className="parrafoProducto font-montserrat text-xs font-semibold m-[5%] line-clamp-5">
                                            {product1.description}
                                        </p>
                                    </section>
                                    <Link to={`/detail/${product1.id}`}>
                                        <button className="addButton absolute top-[90%] left-[40%] ">
                                            Ver detalles
                                        </button>
                                    </Link>
                                </div>
                            </section>
                        </section>
                        <section className="photoDiv1 flex flex-col items-center justify-between w-[45%] bg-[url('/images/mujersogas.jpg')] bg-no-repeat bg-cover bg-center">
                            <section className="descriptionText bg-primaryLight w-[90%] rounded-[20px] font-bebas text-2xl py-2.5 px-5 mt-3.5 text-center ">
                                <p>
                                    Las creatinas aportan energía y vitalidad,
                                    fomentando no solo el rendimiento deportivo,
                                    sino que también el rendimiento mental.
                                </p>
                            </section>
                            <section className="productSection flex justify-center items-end h-1/2">
                                <div className="productDescription bg-white flex items-center w-[70%] h-1/2 rounded-[20px] mb-[8%] relative">
                                <section className="w-1/4 overflow-hidden ml-[5px]">
                                        <Link
                                            to={`/detail/${product2.id}`}
                                            className="w-full"
                                        >
                                            <img
                                                src={product2.image}
                                                alt=""
                                                className="images-inphoto"
                                            />
                                        </Link>
                                    </section>
                                    <section className="w-3/4">
                                        <p className="parrafoProducto font-montserrat text-xs font-semibold m-[5%] line-clamp-5">
                                            {product2.description}
                                        </p>
                                    </section>
                                    <Link to={`/detail/${product2.id}`}>
                                        <button className="addButton absolute top-[90%] left-[40%] ">
                                            Ver detalles
                                        </button>
                                    </Link>
                                </div>
                            </section>
                        </section>
                    </div>
                    <div className="font-bebas text-center text-[40px] pt-8">
                        <span>
                            ¿POR QUE{" "}
                            <span className="text-primary">VITALFIT?</span>
                        </span>
                    </div>
                    <div className="characteristicsViatlFit flex flex-wrap justify-center gap-[80px] mt-[30px] mb-[90px]">
                        <div className="characteristic flex w-[350px] flex-col items-center text-center">
                            <img src="images/confianza.jpg" alt="" />
                            <h6 className="font-bebas text-2xl text-primary">
                                CONFIANZA
                            </h6>
                            <p>
                                Comprometidos con tu bienestar, aseguramos
                                productos consistentes y de alta calidad
                            </p>
                        </div>
                        <div className="characteristic flex w-[350px] flex-col items-center text-center">
                            <img src="images/transparencia.jpg" alt="" />
                            <h6 className="font-bebas text-2xl text-primary">
                                TRANSPARENCIA
                            </h6>
                            <p>
                                Información clara sobre nuestras vitaminas y
                                suplementos. Creemos en construir una relación
                                honesta, y tomes decisiones informadas sobre tu
                                bienestar.
                            </p>
                        </div>
                        <div className="characteristic flex w-[350px] flex-col items-center text-center">
                            <img src="images/respeto.jpg" alt="" />
                            <h6 className="font-bebas text-2xl text-primary">
                                RESPETO
                            </h6>
                            <p>
                                Tu bienestar es nuestra prioridad, y nos
                                esforzamos por ganarnos tu confianza con cada
                                elección que hagas con nosotros.
                            </p>
                        </div>
                        <div className="characteristic flex w-[350px] flex-col items-center text-center">
                            <img src="images/orientacion.jpg" alt="" />
                            <h6 className="font-bebas text-2xl text-primary">
                                ORIENTACION
                            </h6>
                            <p>
                                Seguimos estándares rigurosos. Nuestras
                                directrices garantizan la calidad y eficacia de
                                cada vitamina y suplemento proteico que
                                ofrecemos.
                            </p>
                        </div>
                        <div className="characteristic flex w-[350px] flex-col items-center text-center">
                            <img src="images/empatia.jpg" alt="" />
                            <h6 className="font-bebas text-2xl text-primary">
                                EMPATIA
                            </h6>
                            <p>
                                Comprendemos tus necesidades y aspiraciones de
                                bienestar, y trabajamos para ser parte de tu
                                jornada hacia una vida más saludable y plena.
                            </p>
                        </div>
                        <div className="characteristic flex w-[350px] flex-col items-center text-center">
                            <img src="images/cercania.jpg" alt="" />
                            <h6 className="font-bebas text-2xl text-primary">
                                CERCANIA
                            </h6>
                            <p>
                                {" "}
                                Estamos cerca de ti en tu búsqueda de bienestar,
                                ofreciendo vitaminas y suplementos de calidad,
                                queriendo hacer parte de proceso saludable.{" "}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center gap-10 my-10">
                        <div className="vasoFoto 2-[40%]">
                            <img src="images/vaso.jpg" alt="" />
                        </div>
                        <div className="noestasSeguroContainer flex w-[30%] bg-primaryLight font-bebas text-[42px] p-2.5 flex-col justify-around">
                            <div className="w-[40%]">
                                <p>¿No estas seguro de qué es mejor para ti?</p>
                                <p className="font-montserrat text-xl">
                                    No te preocupes!
                                </p>
                            </div>
                            <button className="w-full categoriesButton">
                                SEPARA UNA ASESORIA
                            </button>
                        </div>
                    </div>
                    <div className="bg-tertiary flex">
                        <div className="w-3/5 flex items-center justify-center">
                            <img
                                src="images/suplementos.jpg"
                                alt=""
                                className="w-4/6 m-3"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-start w-1/4 gap-5 ">
                            <div className="w-2/4">
                                <p className="font-['Bebas_Neue'] text-3xl">
                                    SUSCRIBITE A <br /> NUESTRO NEWSLETTER
                                </p>
                            </div>
                            <div className="flex items-center h-8  w-1/3">
                                <input
                                    type="text"
                                    placeholder="Ingresa tu E-mail"
                                    className="border-black h-full text-center    rounded-l-lg font-['Montserrat']"
                                />
                                <button className="bg-primary text-white   rounded-r-lg font-['Bebas_neue'] text-lg px-5 h-full transition hover:scale-110 duration-300">
                                    ENVIAR
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
