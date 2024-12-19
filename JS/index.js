document.addEventListener("DOMContentLoaded", () => {
    const pantallaBienvenida = document.getElementById("pantalla-bienvenida");
    const pantallaLogin = document.getElementById("pantalla-login");
    const campoCorreo = document.getElementById("correo");
    const mensajeError = document.getElementById("mensaje-error");

    // Mostrar pantalla de login después de 5 segundos
    setTimeout(mostrarPantallaLogin, 5000);

    // combinación Ctrl + F10
    document.addEventListener("keydown", (evento) => {
        if (evento.ctrlKey && evento.key === "F10") {
            mostrarPantallaLogin();
        }
    });

    // Validar correo
    campoCorreo.addEventListener("blur", () => {
        const correo = campoCorreo.value.trim();

        if (!validarCorreo(correo)) {
            mensajeError.style.display = "block";
            campoCorreo.select(); // Seleccionar texto
        } else {
            mensajeError.style.display = "none";
            guardarDatosUsuario(correo); // Guardar datos en cookies
            window.location.href = "../HTML/pantalla2.html"; // Dirigir a pantalla 2
        }
    });

    // Mostrar pantalla login
    function mostrarPantallaLogin() {
        pantallaBienvenida.style.display = "none";
        pantallaLogin.style.display = "block";
    }

    // Validar formato correo
    function validarCorreo(correo) {
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexCorreo.test(correo);
    }

    // Guardar correo, nombre y último acceso en cookies
    function guardarDatosUsuario(correo) {
        const nombre = correo.split("@")[0]; // Nos queamos solo con el nobre (antes de @)
        const fechaUltimoAcceso = new Date().toLocaleString();

        guardarCookie("usuarioCorreo", correo);
        guardarCookie("usuarioNombre", nombre);
        guardarCookie("ultimoAcceso", fechaUltimoAcceso);

    }

    // guardar una cookie con nombre y valor
    function guardarCookie(nombre, valor, dias = 7) {
        const fechaExpiracion = new Date();
        fechaExpiracion.setDate(fechaExpiracion.getDate() + dias);
        document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${fechaExpiracion.toUTCString()}; path=/`;
    }
});

//Funcion para leer cookies
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
