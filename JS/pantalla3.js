document.addEventListener("DOMContentLoaded", () => {
    const botonGrabar = document.getElementById("grabar");
    const preguntaInput = document.getElementById("pregunta");
    const puntuacionInput = document.getElementById("puntuacion");
    const respuestaRadios = document.getElementsByName("respuesta");
    const tablaPreguntas = document.getElementById("tabla-lista-preguntas").getElementsByTagName("tbody")[0];
    const botonAtras = document.getElementById("boton-atras");
    const cargandoTexto = document.getElementById("cargando");

    // Función para habilitar/deshabilitar el botón Grabar
    function validarFormulario() {
        const pregunta = preguntaInput.value.trim();
        const puntuacion = puntuacionInput.value.trim();
        const respuestaSeleccionada = document.querySelector('input[name="respuesta"]:checked');
        const puntuacionValida = /^[1-9]$/.test(puntuacion);
        botonGrabar.disabled = !(pregunta && respuestaSeleccionada && puntuacionValida);
    }

    preguntaInput.addEventListener("input", validarFormulario);
    puntuacionInput.addEventListener("input", validarFormulario);
    respuestaRadios.forEach(radio => radio.addEventListener("change", validarFormulario));

    // Función para guardar la pregunta en las cookies
    function guardarPreguntaEnCookies(pregunta, respuesta, puntuacion) {
        const nuevaPregunta = { pregunta, respuesta, puntuacion, estado: "Guardando..." };
        const preguntasGuardadas = JSON.parse(obtenerCookie("preguntas")) || [];
        preguntasGuardadas.push(nuevaPregunta);
        guardarCookie("preguntas", JSON.stringify(preguntasGuardadas), 7);

        // Agregar a la tabla con estado "Guardando..."
        const fila = agregarPreguntaATabla(nuevaPregunta);

        // Cambiar estado a "OK" después de 5 segundos
        setTimeout(() => {
            nuevaPregunta.estado = "OK";
            fila.cells[3].textContent = "OK"; // Actualizmos solo la celda del estado
            guardarCookie("preguntas", JSON.stringify(preguntasGuardadas), 7); // Actualizmos las cookies
        }, 5000);
    }

    // Función para cargar preguntas desde las cookies
    function cargarPreguntas(conRetraso = false) {
        if (conRetraso) {
            cargandoTexto.style.display = "block";
            setTimeout(() => {
                cargandoTexto.style.display = "none";
                actualizarTablaPreguntas();
            }, 5000);
        } else {
            actualizarTablaPreguntas();
        }
    }

    // Función para actualizar la tabla con preguntas desde las cookies
    function actualizarTablaPreguntas() {
        const preguntasGuardadas = JSON.parse(obtenerCookie("preguntas")) || [];
        tablaPreguntas.innerHTML = ""; 
        preguntasGuardadas.forEach(agregarPreguntaATabla);
    }

    // agregamos una fila a la tabla
    function agregarPreguntaATabla(pregunta) {
        const fila = tablaPreguntas.insertRow();
        fila.innerHTML = `
            <td>${pregunta.pregunta}</td>
            <td>${pregunta.respuesta}</td>
            <td>${pregunta.puntuacion}</td>
            <td>${pregunta.estado}</td>
        `;
        return fila; // Devolvemos la fila creada
    }

    // Le añadimos al boton de grabar la pregunta un evento
    botonGrabar.addEventListener("click", () => {
        const pregunta = preguntaInput.value.trim();
        const respuesta = document.querySelector('input[name="respuesta"]:checked').value;
        const puntuacion = puntuacionInput.value.trim();
        // Desabilitamos el boton cuando se este guardando la respuesta (5seg)
        botonAtras.disabled = true;
        botonAtras.style.backgroundColor = "red";

        guardarPreguntaEnCookies(pregunta, respuesta, puntuacion);

        preguntaInput.value = "";
        puntuacionInput.value = "";
        document.querySelector('input[name="respuesta"]:checked').checked = false;
        validarFormulario();

        setTimeout(() => {
            botonAtras.disabled = false;
            botonAtras.style.backgroundColor = "#008dd4";
        }, 5000);
    });

    cargarPreguntas(true);
    // Evitar que el botón "Atrás" funcione si está deshabilitado.
    botonAtras.addEventListener("click", (event) => {
        if (botonAtras.disabled) {
            event.preventDefault();
        }
    });

    botonGrabar.disabled = true;

    // funcion para guardar la cookie que expira a los 7 dias
    function guardarCookie(nombre, valor, dias = 7) {
        const fechaExpiracion = new Date();
        fechaExpiracion.setDate(fechaExpiracion.getDate() + dias);
        document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${fechaExpiracion.toUTCString()}; path=/`;
    }

    //funcion para obtener la cookie
    function obtenerCookie(nombre) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === nombre) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }
});
