function mostrarSeccion(seccion) {
    const content = document.getElementById('main-content');
    if (seccion === 'destinos') {
        content.innerHTML = `
            <h3>Catálogo de Destinos</h3>
            <form id="formDestino">
                <input type="text" id="nomDestino" placeholder="Nombre" class="form-control mb-2">
                <input type="text" id="ubiDestino" placeholder="Ubicación" class="form-control mb-2">
                <button class="btn btn-success w-100">Guardar</button>
            </form>
            <table class="table mt-3">
                <thead><tr><th>ID</th><th>Nombre</th><th>Ubicación</th></tr></thead>
                <tbody id="tabla-destinos"></tbody>
            </table>`;
        // Aquí llamarías a una función cargarDestinos()
    }
    // ... resto de secciones
}