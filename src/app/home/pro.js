const nombre_producto = document.querySelector('#nombre_producto');
const precio_input = document.querySelector('#precio'); // Cambié el nombre para evitar conflicto
const guardar_producto = document.querySelector('#guardar_producto');
const limpiar_producto = document.querySelector('#limpiar_producto');

guardar_producto.addEventListener('click', () => {
    const nombre = nombre_producto.value;
    const precio = precio_input.value; // Cambié el nombre aquí también
    console.log(nombre, precio);
    limpiar()
});
const limpiar = () => {
    nombre_producto.value = "";
    precio_input.value = "";
}
limpiar_producto.addEventListener('click', limpiar);