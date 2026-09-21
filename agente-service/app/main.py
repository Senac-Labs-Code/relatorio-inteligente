from fastapi import FastAPI

app = FastAPI(
  title="Radar IA - Agente Service",
	description="Serviço de IA do Radar IA",
	version="0.1.0"
)

@app.get("/")
def healthcheck():
	return { "status": "Agente Service está funcionando!" }