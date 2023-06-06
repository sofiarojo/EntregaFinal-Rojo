// ----- Traer ID a JS ----->
const yogaContenido = document.getElementById("yogaContenido");
const verCarrito = document.getElementById("verCarrito");
const contenidoVentana = document.getElementById("contenidoVentana");
const cantidadCarrito = document.getElementById("cantidadCarrito");


//----- Recorriendo los cursos ----->

const getCursos = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((curso) => {
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

            //Utilizacion de la "libreria" Toastify para avisarle que agrego algun curso al carrito
            Toastify({    
                text: `¡Perfecto!✨ Agregaste el curso "${curso.nombre}" al carrito.`,
                duration: 1200,
                className: 'notificacion'
            }).showToast();
        });
    });
};

getCursos();


//----- Storage y JSON ----->
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};



