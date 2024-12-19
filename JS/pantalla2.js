document.addEventListener("DOMContentLoaded", () => {
    // Accedemos a los valores de las cookies
    const correo = leerCookie("usuarioCorreo");
    const nombre = leerCookie("usuarioNombre");
    const ultimoAcceso = leerCookie("ultimoAcceso");
    const botonIrPreguntas = document.getElementById("boton-ir-preguntas");
    botonIrPreguntas.addEventListener("click", () => {
        window.location.href = "../HTML/pantalla3.html"; // redirigimos
    });
    // Verificamos si los datos existen en las cookies
    if (correo && nombre && ultimoAcceso) {
        // Mostrar los datos en la pagina
        const elementoNombre = document.getElementById("usuario-nombre");
        const elementoUltimoAcceso = document.getElementById("ultimo-acceso");

        // Asignamos los valores de las cookies
        if (elementoNombre) {
            elementoNombre.textContent = nombre; 
        }
        if (elementoUltimoAcceso) {
            elementoUltimoAcceso.textContent = ultimoAcceso; 
        }
    } else {
        // Si no se encuentran datos, mostrar valores predeterminados
        // Probar a imprimir por consola
        console.log("No se encontraron datos en las cookies.");
    }

    // Función para leer cookies
    function leerCookie(nombre) {
        const nombreEQ = nombre + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nombreEQ) === 0) {
                return decodeURIComponent(c.substring(nombreEQ.length, c.length));
            }
        }
        return null;
    }
});
