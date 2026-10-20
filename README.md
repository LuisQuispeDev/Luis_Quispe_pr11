# ASE261S2_T03_wp

## NUEVO PANEL DE ADMINISTRACIÓN

El panel ahora está organizado en cuatro áreas:

- **Dashboard:** resumen de consultas, solicitudes y productos.
- **Productos:** crear, editar, publicar/ocultar y eliminar productos.
- **Consultas:** tabla independiente con los mensajes del formulario de contacto.
- **Solicitudes:** tabla independiente con empresa, producto, cantidad, unidad y fecha.

### Productos

Desde **Productos → Nuevo producto** se puede registrar:

- Imagen.
- Nombre.
- Descripción.
- Categoría.
- Precio en soles.
- Unidad de venta: kg, g, unidad, caja, saco, tonelada, docena, litro, paquete u otra.
- Estado publicado/oculto.

La página pública `/productos` toma estos datos directamente de MySQL.

### Migración de base de datos

Antes de usar el nuevo catálogo, ejecuta:

`MIGRACION_PRODUCTOS.sql`

en la base de datos `renace_canete`.

La migración crea la tabla `productos` y agrega a `solicitudes_comerciales` los campos necesarios para guardar la unidad y el producto seleccionado.
