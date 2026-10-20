FROM python:3.13-slim

# Bufferes y .pys: Logs en vivo, sin obsoletos
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUMBUFFERED=1

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY .env .
COPY app.py .
COPY app ./app

# Puerto por defecto
ENV PORT=5000
EXPOSE 5000

CMD ["python", "app.py"]