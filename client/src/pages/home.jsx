import "./home.css";

export const Home = () => {
    return (
        <div className="homecontainer">
            {/* Aqui abajo pongan el componente que van a trbajar */}

            <div className="text-image-container">
                <div className="text">
                    <span>
                        Vuelvete imparable con el <br /> Nuevo combo{" "}
                        <strong>Beast</strong>
                    </span>
                </div>
                <div className="offer">
                    <div className="imagen"></div>
                    <div>
                        <button className="boton-comprar">Comprar</button>
                    </div>
                </div>
            </div>
            <div className="categorias-container">
                <div className="buttons-container">
                    <button className="button-categoria">PROTEINAS</button>
                    <button className="button-categoria">CREATINAS</button>
                    <button className="button-categoria">ENERGIA</button>
                    <button className="button-categoria">
                        CONTROL DE PESO
                    </button>
                </div>
            </div>
            <div className="destacados-text">
                <span>DESTACADOS</span>
            </div>
            <div className="destacados-container">
                <div className="producto-destacado">
                    <img
                        src="images/pre-war.png"
                        alt=""
                        className="images-destacados"
                    />
                    <span>PRE WORKOUT 400GR</span>
                    <span>$10.000</span>
                    <button className="boton-comprar">Agregar</button>
                </div>
                <div className="producto-destacado">
                    <img
                        src="images/muscletech.jpg"
                        alt=""
                        className="images-destacados"
                    />
                    <span>100% CAFFEINE MUSCLETECH</span>
                    <span>$12.000</span>
                    <button className="boton-comprar">Agregar</button>
                </div>
                <div className="producto-destacado">
                    <img
                        src="images/creatina.jpg"
                        alt=""
                        className="images-destacados"
                    />
                    <span>CREATINE 500GR</span>
                    <span>$13.500</span>
                    <button className="boton-comprar">Agregar</button>
                </div>
            </div>
            <div className="photos-container">
                <div className="photo-div1">
                    <div className="motivation-container">
                        <p>
                            Los productos Mass Gain están compuestos
                            principalmente por carbohidratos. Su función
                            principal es contribuir en la ganancia de masa
                            muscular y en el aumento de peso.
                        </p>
                    </div>
                    <div className="product-buy">
                        <div className="product-div">
                            <img
                                src="images/mass-gainer.jpg"
                                alt=""
                                className="images-inphoto"
                            />
                            <p className="parrafo-producto-photo">
                                Mass Gainer Quamtrax es un ganador de peso alto
                                en carbohidratos que proporciona una energía y
                                una ganancia muscular extremas, además de una
                                mejor recuperación.{" "}
                            </p>
                            <button className="boton-comprar-photo">
                                {" "}
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="photo-div2">
                    <div className="motivation-container">
                        <p>
                            Las vitaminas aportan energía y vitalidad,
                            fomentando no solo el rendimiento deportivo, sino
                            que también el rendimiento mental.
                        </p>
                    </div>
                    <div className="product-buy">
                        <div className="product-div">
                            <img
                                src="images/glutamina.jpg"
                                alt=""
                                className="images-inphoto"
                            />
                            <p className="parrafo-producto-photo">
                                BCAA + Glutamina es un complemento alimenticio a
                                base de aminoácidos ramificados y glutamina para
                                proteger la masa muscular durante el ejercicio,
                                reducir la sensación de cansancio y comenzar la
                                recuperación lo antes posible.
                            </p>
                            <button className="boton-comprar-photo">
                                {" "}
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="destacados-text">
                <span>
                    ¿POR QUE <span className="text-primary">VITALFIT?</span>
                </span>
            </div>
            <div className="why-container">
                <div className="carac-vitalfit-container">
                    <img src="images/confianza.jpg" alt="" />
                    <h6 className="h6 text-primary">CONFIANZA</h6>
                    <p>
                        Comprometidos con tu bienestar, aseguramos productos
                        consistentes y de alta calidad
                    </p>
                </div>
                <div className="carac-vitalfit-container">
                    <img src="images/transparencia.jpg" alt="" />
                    <h6 className="h6 text-primary">TRANSPARNCIA</h6>
                    <p>
                        Información clara sobre nuestras vitaminas y
                        suplementos. Creemos en construir una relación honesta,
                        y tomes decisiones informadas sobre tu bienestar.
                    </p>
                </div>
                <div className="carac-vitalfit-container">
                    <img src="images/respeto.jpg" alt="" />
                    <h6 className="h6 text-primary">RESPETO</h6>
                    <p>
                        Tu bienestar es nuestra prioridad, y nos esforzamos por
                        ganarnos tu confianza con cada elección que hagas con
                        nosotros.
                    </p>
                </div>
                <div className="carac-vitalfit-container">
                    <img src="images/orientacion.jpg" alt="" />
                    <h6 className="h6 text-primary">ORIENTACION</h6>
                    <p>
                        Seguimos estándares rigurosos. Nuestras directrices
                        garantizan la calidad y eficacia de cada vitamina y
                        suplemento proteico que ofrecemos.
                    </p>
                </div>
                <div className="carac-vitalfit-container">
                    <img src="images/empatia.jpg" alt="" />
                    <h6 className="h6 text-primary">EMPATIA</h6>
                    <p>
                        Comprendemos tus necesidades y aspiraciones de
                        bienestar, y trabajamos para ser parte de tu jornada
                        hacia una vida más saludable y plena.
                    </p>
                </div>
                <div className="carac-vitalfit-container">
                    <img src="images/cercania.jpg" alt="" />
                    <h6 className="h6 text-primary">CERANIA</h6>
                    <p>
                        {" "}
                        Estamos cerca de ti en tu búsqueda de bienestar,
                        ofreciendo vitaminas y suplementos de calidad, queriendo
                        hacer parte de proceso saludable.{" "}
                    </p>
                </div>
            </div>
            <div
                className="flex justify-center gap-10 my-10
            "
            >
                <div className="vaso-container">
                    <img src="images/vaso.jpg" alt="" />
                </div>
                <div className="noestasseguro-container">
                    <div className="noestasseguro-p">
                        <p>¿No estas seguro de qué es mejor para ti?</p>
                        <p id="notepreocupes">No te preocupes!</p>
                    </div>
                    <button className="button-categoria" id="separaunaasesoria">
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
                        <button className="bg-primary text-white   rounded-r-lg font-['Bebas_neue'] text-lg px-5 h-full">
                            ENVIAR
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-60 bg-black bg-foot bg-right bg-no-repeat ">
                <div className="w-full h-full bg-opacity-75 pt-10 pl-20 flex items-start gap-52  bg-black  ">
                    <div>
                        <img src="images/logo.png" alt="" />
                    </div>
                    <div className="text-white">
                        <p className="font-['Bebas_Neue'] text-2xl ">
                            SITIO WEB
                        </p>
                        <ul className="font-['Montserrat']">
                            <li>Productos</li>
                            <li>Asesoria</li>
                            <li>Ofertas</li>
                            <li>Preguntas frecuentes</li>
                            <li>Blog</li>
                            <li>Contacto</li>
                        </ul>
                    </div>
                    <div className="text-white h-full">
                        <p className="font-['Bebas_Neue'] text-2xl">
                            SOCIAL MEDIA
                        </p>
                        <ul className="font-['Montserrat']">
                            <li className="flex  items-center gap-5 my-2">
                                <img
                                    src="images/facebooklogo.png"
                                    alt=""
                                    className="h-5"
                                />
                                <span className="text-end">Facebook</span>
                            </li>
                            <li className="flex h-5 items-center gap-5 my-2">
                                <img
                                    src="images/instlogo.png"
                                    alt=""
                                    className="h-5"
                                />
                                <span className="text-end">Instagram</span>
                            </li>
                            <li className="flex h-5 items-center gap-5 my-2">
                                <img
                                    src="images/youtube.png"
                                    alt=""
                                    className="h-5"
                                />
                                <span className="text-end">YouTube</span>
                            </li>
                            <li className="flex h-5 items-center gap-5 my-2">
                                <img
                                    src="images/tiktok.png"
                                    alt=""
                                    className="h-5"
                                />
                                <span className="text-end">TikTok</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
