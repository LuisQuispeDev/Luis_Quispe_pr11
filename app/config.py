import os
from dotenv import load_dotenv

# Carga las variables del archivo .env de la raíz del proyecto.
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)
load_dotenv(os.path.join(BASE_DIR, ".env"))


class Config:
    SECRET_KEY = os.getenv(
        "RENACE_SECRET_KEY",
        "cambia-esta-clave-en-produccion"
    )

    DB_HOST = os.getenv("DB_HOST", "").strip()
    DB_PORT = int(os.getenv("DB_PORT", "3306"))
    DB_USER = os.getenv("DB_USER", "").strip()
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    DB_NAME = os.getenv("DB_NAME", "").strip()
