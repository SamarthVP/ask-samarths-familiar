FROM python:3.9-bullseye

WORKDIR /backend
COPY . .
RUN pip3 install -r requirements.txt

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--reload"]
