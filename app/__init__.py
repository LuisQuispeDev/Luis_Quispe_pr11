import os
from datetime import timedelta
from flask import Flask


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = os.environ.get("RENACE_SECRET_KEY", "renace-canete")
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024

    from app.routes.clientes import clientes_bp
    from app.admin.routes import admin_bp

    app.register_blueprint(clientes_bp)
    app.register_blueprint(admin_bp)

    return app
