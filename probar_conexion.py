from app.database import obtener_conexion

try:
    conexion = obtener_conexion()

    if conexion.is_connected():
        print("Conexión a MySQL exitosa")

        cursor = conexion.cursor()
        cursor.execute("SELECT DATABASE(), VERSION()")
        print(cursor.fetchone())

        cursor.close()

    conexion.close()

except Exception as error:
    print("Error de conexión:", error)