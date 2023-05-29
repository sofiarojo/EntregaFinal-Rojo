// ----- Traer ID a JS ----->
const yogaContenido = document.getElementById("yogaContenido");
const verCarrito = document.getElementById("verCarrito");
const contenidoVentana = document.getElementById("contenidoVentana");
const cantidadCarrito = document.getElementById("cantidadCarrito");

//----- Variable del carrito ----->
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//----- Recorriendo los cursos ----->
cursos.forEach((curso) => {
    let contenido = document.createElement("div");
    contenido.className = "card";
    contenido.innerHTML = `
        <img src = "${curso.img}">
        <h3>${curso.nombre}</h3>
        <h5>${curso.nivel}</h5>
        <p class="precio">$${curso.precio}</p>
    `;

    yogaContenido.append(contenido);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "comprar";

    contenido.append(comprar);

    comprar.addEventListener("click", () => {
        const repetir = carrito.some((repetirCurso) => repetirCurso.id === curso.id);
        console.log(repetir);

        if(repetir === true){
            carrito.map((clase) => {
                if(clase.id === curso.id){
                    clase.cantidad++;
                }
            });
        }else{
            carrito.push ({
            id: curso.id,
            img: curso.img,
            nombre: curso.nombre,
            nivel: curso.nivel,
            precio: curso.precio,
            cantidad: curso.cantidad,
            });
        }
        console.log(carrito);
        carritoCont();
        saveLocal();

        Toastify({
            text: `¡Perfecto! Agregaste el curso "${curso.nombre}" al carrito`,
            duration: 2500,
            className: 'notificacion'
        }).showToast();
    });
});

//----- Storage y JSON ----->
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};



