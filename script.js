const lista = document.getElementById("lista");

// Cargar recordatorios guardados
document.addEventListener("DOMContentLoaded", cargarRecordatorios);

function agregarRecordatorio() {
    const texto = document.getElementById("texto").value;
    const fecha = document.getElementById("fecha").value;

    if (texto === "" || fecha === "") {
        alert("Completa todos los campos");
        return;
    }

    const recordatorio = {
        texto,
        fecha
    };

    guardarRecordatorio(recordatorio);
    mostrarRecordatorio(recordatorio);
    programarAlerta(recordatorio.texto, new Date(recordatorio.fecha));

    document.getElementById("texto").value = "";
    document.getElementById("fecha").value = "";
}

function mostrarRecordatorio(recordatorio) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span>${recordatorio.texto}<br>
        <small>${new Date(recordatorio.fecha).toLocaleString()}</small></span>
        <button onclick="eliminarRecordatorio(this)">❌</button>
    `;

    lista.appendChild(li);
}

function eliminarRecordatorio(boton) {
    const li = boton.parentElement;
    li.style.opacity = "0";
    li.style.transform = "translateX(20px)";

    setTimeout(() => {
        li.remove();
        actualizarLocalStorage();
    }, 300);
}

function guardarRecordatorio(recordatorio) {
    const recordatorios = JSON.parse(localStorage.getItem("recordatorios")) || [];
    recordatorios.push(recordatorio);
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
}

function cargarRecordatorios() {
    const recordatorios = JSON.parse(localStorage.getItem("recordatorios")) || [];
    recordatorios.forEach(r => {
        mostrarRecordatorio(r);
        programarAlerta(r.texto, new Date(r.fecha));
    });
}

function actualizarLocalStorage() {
    const recordatorios = [];
    document.querySelectorAll("li").forEach(li => {
        const texto = li.querySelector("span").childNodes[0].textContent;
        const fecha = li.querySelector("small").textContent;
        recordatorios.push({ texto, fecha });
    });
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
}

function programarAlerta(texto, fecha) {
    const tiempo = fecha.getTime() - new Date().getTime();
    if (tiempo > 0) {
        setTimeout(() => {
            alert("⏰ Recordatorio: " + texto);
        }, tiempo);
    }
}
