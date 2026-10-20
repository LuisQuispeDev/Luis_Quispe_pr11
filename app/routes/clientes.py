
from datetime import date
from decimal import Decimal, InvalidOperation

from flask import Blueprint, render_template, request, current_app
from app.database import obtener_conexion


clientes_bp = Blueprint("clientes", __name__)


# Productos disponibles para los formularios
PRODUCTOS = [
    {"id": 1, "nombre": "Uva Italia", "unidad": "kg"},
    {"id": 2, "nombre": "Uva Red Globe", "unidad": "kg"},
    {"id": 3, "nombre": "Uva Crimson", "unidad": "kg"},
]


@clientes_bp.route("/")
def inicio():
    return render_template(
        "secciones/inicio.html",
        contenido=None
    )


@clientes_bp.route("/nosotros")
def nosotros():
    return render_template("secciones/nosotros.html")


@clientes_bp.route("/productos")
def productos():
    return render_template(
        "secciones/productos.html",
        productos=PRODUCTOS
    )


# CONTACTO: guardar datos en la tabla Consultas
@clientes_bp.route("/contacto", methods=["GET", "POST"])
def contacto():

    if request.method == "GET":
        return render_template("secciones/contacto.html")

    nombre = request.form.get("nombre", "").strip()
    empresa = request.form.get("empresa", "").strip()
    correo = request.form.get("correo", "").strip()
    telefono = request.form.get("telefono", "").strip()
    asunto = request.form.get("asunto", "").strip()
    mensaje = request.form.get("mensaje", "").strip()

    if not all([nombre, correo, asunto, mensaje]):
        return render_template(
            "secciones/contacto.html",
            error="Completa los campos obligatorios."
        ), 400

    conexion = None
    cursor = None

    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute("""
            INSERT INTO Consultas (
                full_name,
                company_association,
                email,
                phone,
                subject,
                message
            )
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            nombre,
            empresa or None,
            correo,
            telefono or None,
            asunto,
            mensaje
        ))

        conexion.commit()

        return render_template(
            "secciones/contacto.html",
            enviada=True
        )

    except Exception:
        if conexion:
            conexion.rollback()

        current_app.logger.exception(
            "Error al registrar la consulta en MySQL."
        )

        return render_template(
            "secciones/contacto.html",
            error="No se pudo guardar la consulta. Revisa la terminal."
        ), 500

    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()


# SOLICITUD: guardar datos en la tabla Solicitudes
@clientes_bp.route("/solicitud", methods=["GET", "POST"])
def solicitud():

    if request.method == "GET":
        return render_template(
            "secciones/solicitud.html",
            productos=PRODUCTOS
        )

    empresa = request.form.get("empresa", "").strip()
    ruc = request.form.get("ruc", "").strip()
    contacto = request.form.get("contacto", "").strip()
    telefono = request.form.get("telefono", "").strip()
    correo = request.form.get("correo", "").strip()
    producto_id_texto = request.form.get("producto_id", "").strip()
    cantidad_texto = request.form.get("cantidad", "").strip()
    fecha_texto = request.form.get("fecha", "").strip()
    mensaje = request.form.get("mensaje", "").strip()

    if not all([
        empresa,
        ruc,
        contacto,
        telefono,
        correo,
        producto_id_texto,
        cantidad_texto,
        fecha_texto
    ]):
        return render_template(
            "secciones/solicitud.html",
            productos=PRODUCTOS,
            error="Completa todos los campos obligatorios, incluida la fecha de entrega."
        ), 400

    # Validar RUC: debe contener 11 dígitos
    if not ruc.isdigit() or len(ruc) != 11:
        return render_template(
            "secciones/solicitud.html",
            productos=PRODUCTOS,
            error="El RUC debe contener exactamente 11 dígitos."
        ), 400

    # Validar producto y cantidad
    try:
        producto_id = int(producto_id_texto)
        cantidad = Decimal(cantidad_texto.replace(",", "."))

        if producto_id <= 0 or not cantidad.is_finite() or cantidad <= 0:
            raise ValueError

    except (ValueError, InvalidOperation):
        return render_template(
            "secciones/solicitud.html",
            productos=PRODUCTOS,
            error="Selecciona un producto y una cantidad válida."
        ), 400

    # Validar fecha
    try:
        fecha = date.fromisoformat(fecha_texto)

    except ValueError:
        return render_template(
            "secciones/solicitud.html",
            productos=PRODUCTOS,
            error="La fecha de entrega no es válida."
        ), 400

    # Buscar el producto seleccionado
    producto = next(
        (p for p in PRODUCTOS if p["id"] == producto_id),
        None
    )

    if not producto:
        return render_template(
            "secciones/solicitud.html",
            productos=PRODUCTOS,
            error="El producto seleccionado no está disponible."
        ), 400

    conexion = None
    cursor = None

    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute("""
            INSERT INTO Solicitudes (
                company_association,
                ruc,
                contact_person,
                phone,
                email,
                product_name,
                quantity_kg,
                delivery_date,
                additional_details,
                status
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            empresa,
            ruc,
            contacto,
            telefono,
            correo,
            producto["nombre"],
            cantidad,
            fecha,
            mensaje or None,
            "pending"
        ))

        conexion.commit()

        return render_template(
            "secciones/solicitud.html",
            productos=PRODUCTOS,
            enviada=True
        )

    except Exception:
        if conexion:
            conexion.rollback()

        current_app.logger.exception(
            "Error al registrar la solicitud en MySQL."
        )

        return render_template(
            "secciones/solicitud.html",
            productos=PRODUCTOS,
            error="No se pudo guardar la solicitud. Revisa la terminal."
        ), 500

    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()
