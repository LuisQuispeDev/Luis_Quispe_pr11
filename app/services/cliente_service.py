
from app.database import obtener_conexion


def guardarContacto(nombre, empresa, correo, telefono, asunto, mensaje):
    conexion = None
    cursor = None

    try:
        conexion = obtener_conexion()
        cursor = conexion.cursor()

        cursor.execute("""
            INSERT INTO consultas
                (nombre, empresa, correo, telefono, asunto, mensaje)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            nombre,
            empresa,
            correo,
            telefono,
            asunto,
            mensaje
        ))

        conexion.commit()
        return True

    except Exception:
        if conexion:
            conexion.rollback()
        raise

    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()
