import os
import uuid

from flask import (
    Blueprint, render_template, request, redirect, url_for,
    session, flash, current_app
)
from werkzeug.utils import secure_filename

from app.database import obtener_conexion

admin_bp = Blueprint("admin", __name__, template_folder="../templates")

ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "webp", "gif"}


def administrador_autenticado():
    return session.get("administrador_autenticado") is True


def imagen_permitida(nombre):
    return (
        "." in nombre
        and nombre.rsplit(".", 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS
    )


def guardar_imagen(archivo):
    if not archivo or not archivo.filename:
        return None

    if not imagen_permitida(archivo.filename):
        raise ValueError("Formato de imagen no permitido. Usa JPG, PNG, WEBP o GIF.")

    carpeta = os.path.join(current_app.static_folder, "img", "productos")
    os.makedirs(carpeta, exist_ok=True)

    extension = archivo.filename.rsplit(".", 1)[1].lower()
    nombre = f"producto_{uuid.uuid4().hex}.{extension}"
    archivo.save(os.path.join(carpeta, nombre))
    return f"img/productos/{nombre}"


def eliminar_imagen(ruta):
    if not ruta:
        return
    # Solo permite borrar archivos dentro de static/img/productos.
    carpeta = os.path.abspath(os.path.join(current_app.static_folder, "img", "productos"))
    archivo = os.path.abspath(os.path.join(current_app.static_folder, ruta))
    if archivo.startswith(carpeta + os.sep) and os.path.isfile(archivo):
        try:
            os.remove(archivo)
        except OSError:
            current_app.logger.warning("No se pudo eliminar la imagen %s", archivo)


@admin_bp.route("/admin")
def index():
    if administrador_autenticado():
        return redirect(url_for("admin.dashboard"))
    return redirect(url_for("admin.login"))


@admin_bp.route("/admin/login", methods=["GET", "POST"])
def login():
    if administrador_autenticado():
        return redirect(url_for("admin.dashboard"))

    if request.method == "POST":
        usuario = request.form.get("usuario", "").strip()
        contrasena = request.form.get("contrasena", "")

        usuario_correcto = os.environ.get("RENACE_ADMIN_USER", "admin")
        contrasena_correcta = os.environ.get("RENACE_ADMIN_PASSWORD", "123")

        if not contrasena_correcta:
            flash(
                "El administrador todavía no está configurado. Configura RENACE_ADMIN_PASSWORD.",
                "error",
            )
        elif usuario == usuario_correcto and contrasena == contrasena_correcta:
            session.clear()
            session["administrador_autenticado"] = True
            session.permanent = True
            return redirect(url_for("admin.dashboard"))
        else:
            flash("El usuario o la contraseña son incorrectos.", "error")

    return render_template("admin/login.html")


@admin_bp.route("/admin/dashboard")
def dashboard():
    if not administrador_autenticado():
        return redirect(url_for("admin.login"))

    conexion = cursor = None
    datos = {
        "total_consultas": 0,
        "total_solicitudes": 0,
        "total_productos": 0,
        "actividad_reciente": [],
        "productos_destacados": [],
    }
    error_bd = None

    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)

        cursor.execute("SELECT COUNT(*) AS total FROM consultas")
        datos["total_consultas"] = cursor.fetchone()["total"]

        cursor.execute("SELECT COUNT(*) AS total FROM solicitudes_comerciales")
        datos["total_solicitudes"] = cursor.fetchone()["total"]

        cursor.execute("SELECT COUNT(*) AS total FROM productos")
        datos["total_productos"] = cursor.fetchone()["total"]

        cursor.execute("""
            SELECT nombre, tipo, fecha
            FROM (
                SELECT nombre, 'Consulta' AS tipo, fecha_creacion AS fecha
                FROM consultas
                UNION ALL
                SELECT empresa AS nombre, 'Solicitud' AS tipo, fecha_creacion AS fecha
                FROM solicitudes_comerciales
            ) AS actividad
            ORDER BY fecha DESC
            LIMIT 8
        """)
        datos["actividad_reciente"] = cursor.fetchall()

        cursor.execute("""
            SELECT id, nombre, descripcion, precio, unidad, imagen, activo
            FROM productos
            ORDER BY id DESC
            LIMIT 4
        """)
        datos["productos_destacados"] = cursor.fetchall()

    except Exception:
        current_app.logger.exception("Error al cargar el dashboard administrativo.")
        error_bd = "No se pudieron cargar los datos. Comprueba MySQL y ejecuta la migración SQL incluida."
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()

    return render_template("admin/dashboard.html", error_bd=error_bd, **datos)


@admin_bp.route("/admin/productos")
def productos():
    if not administrador_autenticado():
        return redirect(url_for("admin.login"))

    conexion = cursor = None
    productos_lista = []
    error_bd = None
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("""
            SELECT id, nombre, descripcion, categoria, precio, unidad,
                   imagen, activo, fecha_creacion, fecha_actualizacion
            FROM productos
            ORDER BY id DESC
        """)
        productos_lista = cursor.fetchall()
    except Exception:
        current_app.logger.exception("Error al cargar productos.")
        error_bd = "No se pudieron cargar los productos. Ejecuta la migración SQL."
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()

    return render_template("admin/productos.html", productos=productos_lista, error_bd=error_bd)


@admin_bp.route("/admin/productos/nuevo", methods=["GET", "POST"])
def producto_nuevo():
    if not administrador_autenticado():
        return redirect(url_for("admin.login"))

    if request.method == "POST":
        nombre = request.form.get("nombre", "").strip()
        descripcion = request.form.get("descripcion", "").strip()
        categoria = request.form.get("categoria", "").strip()
        unidad = request.form.get("unidad", "kg").strip()
        precio = request.form.get("precio", "").strip()
        activo = 1 if request.form.get("activo") == "on" else 0

        if not nombre or not descripcion or not precio or not unidad:
            flash("Completa nombre, descripción, precio y unidad.", "error")
            return render_template("admin/producto_form.html", producto=request.form, modo="nuevo")

        try:
            precio_num = float(precio)
            if precio_num < 0:
                raise ValueError
        except ValueError:
            flash("El precio debe ser un número válido mayor o igual a 0.", "error")
            return render_template("admin/producto_form.html", producto=request.form, modo="nuevo")

        try:
            imagen = guardar_imagen(request.files.get("imagen"))

            conexion = obtener_conexion()
            cursor = conexion.cursor()
            cursor.execute("""
                INSERT INTO productos
                (nombre, descripcion, categoria, precio, unidad, imagen, activo)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (nombre, descripcion, categoria, precio_num, unidad, imagen, activo))
            conexion.commit()
            flash("Producto agregado correctamente.", "success")
            return redirect(url_for("admin.productos"))
        except Exception as e:
            if "conexion" in locals() and conexion:
                conexion.rollback()
            current_app.logger.exception("Error al crear producto.")
            flash(f"No se pudo guardar el producto: {e}", "error")
        finally:
            if "cursor" in locals() and cursor:
                cursor.close()
            if "conexion" in locals() and conexion:
                conexion.close()

    return render_template("admin/producto_form.html", producto=None, modo="nuevo")


@admin_bp.route("/admin/productos/<int:producto_id>/editar", methods=["GET", "POST"])
def producto_editar(producto_id):
    if not administrador_autenticado():
        return redirect(url_for("admin.login"))

    conexion = cursor = None
    producto = None
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM productos WHERE id = %s", (producto_id,))
        producto = cursor.fetchone()
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()

    if not producto:
        flash("El producto no existe.", "error")
        return redirect(url_for("admin.productos"))

    if request.method == "POST":
        nombre = request.form.get("nombre", "").strip()
        descripcion = request.form.get("descripcion", "").strip()
        categoria = request.form.get("categoria", "").strip()
        unidad = request.form.get("unidad", "kg").strip()
        precio = request.form.get("precio", "").strip()
        activo = 1 if request.form.get("activo") == "on" else 0

        try:
            precio_num = float(precio)
            if not nombre or not descripcion or not unidad or precio_num < 0:
                raise ValueError
        except ValueError:
            flash("Revisa los campos obligatorios y el precio.", "error")
            producto.update(request.form)
            return render_template("admin/producto_form.html", producto=producto, modo="editar")

        nueva_imagen = None
        try:
            archivo = request.files.get("imagen")
            if archivo and archivo.filename:
                nueva_imagen = guardar_imagen(archivo)

            conexion = obtener_conexion()
            cursor = conexion.cursor()
            if nueva_imagen:
                cursor.execute("""
                    UPDATE productos
                    SET nombre=%s, descripcion=%s, categoria=%s, precio=%s,
                        unidad=%s, imagen=%s, activo=%s
                    WHERE id=%s
                """, (nombre, descripcion, categoria, precio_num, unidad,
                      nueva_imagen, activo, producto_id))
            else:
                cursor.execute("""
                    UPDATE productos
                    SET nombre=%s, descripcion=%s, categoria=%s, precio=%s,
                        unidad=%s, activo=%s
                    WHERE id=%s
                """, (nombre, descripcion, categoria, precio_num, unidad,
                      activo, producto_id))
            conexion.commit()

            if nueva_imagen and producto.get("imagen"):
                eliminar_imagen(producto["imagen"])

            flash("Producto actualizado correctamente.", "success")
            return redirect(url_for("admin.productos"))
        except Exception as e:
            if "conexion" in locals() and conexion:
                conexion.rollback()
            if nueva_imagen:
                eliminar_imagen(nueva_imagen)
            current_app.logger.exception("Error al editar producto.")
            flash(f"No se pudo actualizar el producto: {e}", "error")
        finally:
            if "cursor" in locals() and cursor:
                cursor.close()
            if "conexion" in locals() and conexion:
                conexion.close()

    return render_template("admin/producto_form.html", producto=producto, modo="editar")


@admin_bp.route("/admin/productos/<int:producto_id>/eliminar", methods=["POST"])
def producto_eliminar(producto_id):
    if not administrador_autenticado():
        return redirect(url_for("admin.login"))

    conexion = cursor = None
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT imagen FROM productos WHERE id=%s", (producto_id,))
        producto = cursor.fetchone()

        cursor.execute("DELETE FROM productos WHERE id=%s", (producto_id,))
        conexion.commit()

        if producto:
            eliminar_imagen(producto.get("imagen"))
        flash("Producto eliminado.", "success")
    except Exception:
        if conexion:
            conexion.rollback()
        current_app.logger.exception("Error al eliminar producto.")
        flash("No se pudo eliminar el producto.", "error")
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()

    return redirect(url_for("admin.productos"))


@admin_bp.route("/admin/consultas")
def consultas():
    if not administrador_autenticado():
        return redirect(url_for("admin.login"))

    conexion = cursor = None
    registros = []
    error_bd = None
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("""
            SELECT id, nombre, empresa, correo, telefono, asunto,
                   mensaje, fecha_creacion
            FROM consultas
            ORDER BY id DESC
        """)
        registros = cursor.fetchall()
    except Exception:
        current_app.logger.exception("Error al cargar consultas.")
        error_bd = "No se pudieron cargar las consultas."
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()

    return render_template("admin/consultas.html", consultas=registros, error_bd=error_bd)


@admin_bp.route("/admin/solicitudes")
def solicitudes():
    if not administrador_autenticado():
        return redirect(url_for("admin.login"))

    conexion = cursor = None
    registros = []
    error_bd = None
    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("""
            SELECT s.id, s.empresa, s.ruc, s.contacto, s.telefono, s.correo,
                   s.producto, s.cantidad_kg, s.cantidad, s.unidad,
                   s.fecha, s.mensaje, s.fecha_creacion,
                   p.nombre AS producto_nombre
            FROM solicitudes_comerciales s
            LEFT JOIN productos p ON p.id = s.producto_id
            ORDER BY s.id DESC
        """)
        registros = cursor.fetchall()
    except Exception:
        current_app.logger.exception("Error al cargar solicitudes.")
        error_bd = "No se pudieron cargar las solicitudes."
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()

    return render_template("admin/solicitudes.html", solicitudes=registros, error_bd=error_bd)


@admin_bp.route("/admin/logout", methods=["POST"])
def logout():
    if not administrador_autenticado():
        return redirect(url_for("admin.login"))
    session.clear()
    flash("Has cerrado sesión correctamente.", "success")
    return redirect(url_for("admin.login"))
