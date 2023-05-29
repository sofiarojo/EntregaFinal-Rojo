// ----- Carrito/ Ventana del Carrito ----->
const pintarCarrito = () => {
    contenidoVentana.innerHTML = "";
    contenidoVentana.style.display = "flex";
    const ventanaCarrito = document.createElement("div");
    ventanaCarrito.className = "ventana-carrito";

    contenidoVentana.append(ventanaCarrito);

    const buttonVentana = document.createElement("h1");
    buttonVentana.innerText = "x";
    buttonVentana.className = "button-ventana-carrito";

    buttonVentana.addEventListener("click", () => {
        contenidoVentana.style.display = "none";
    })

    ventanaCarrito.append(buttonVentana);

    carrito.forEach((curso) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "carrito-content";
        contenidoCarrito.innerHTML = `
            <img src = "${curso.img}">
            <h3>${curso.nombre}</3>
            <h5>${curso.nivel}</h5>
            <p class="precio">$${curso.precio}</p>
            <span class= "restar"> - </span>
            <p>Cant: ${curso.cantidad}</p>
            <span class= "sumar"> + </span>
            <p>Total: $${curso.cantidad * curso.precio}</p>
            <span class="delete-curso"> ❌ </span>
        `;

        contenidoVentana.append(contenidoCarrito);

        let restar = contenidoCarrito.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (curso.cantidad !== 1) {
                curso.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = contenidoCarrito.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            curso.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = contenidoCarrito.querySelector(".delete-curso");

        eliminar.addEventListener("click", () => {
            Swal.fire({
                title: "¡Atención!",
                text: `¿Querés eliminar el curso "${curso.nombre}"?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText: `Cancelar`,
            }).then((result) => {
                if(result.isConfirmed){
                    eliminarCurso(curso.id);
                    Swal.fire({
                        title: "¡Listo!",
                        icono: "success",
                        text: "Se ha eliminado el curso de tu carrito. 😔"
                    })
                }
            })
        });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("button");
    totalCompra.className = "total-contenido";
    totalCompra.innerHTML =  `Total a pagar : $${total}`;
    
    contenidoVentana.append(totalCompra);

};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarCurso = (id) => {
    encontrarId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== encontrarId;
    });

    carritoCont();
    saveLocal();
    pintarCarrito();
};

const carritoCont = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

};
carritoCont();

// ----- Vaciar Carrito ----->

