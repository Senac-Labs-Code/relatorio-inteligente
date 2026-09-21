.PHONY: dev down clean logs prisma-generate agente-lock

dev:
	docker compose up --build

down:
	docker compose down

clean:
	docker compose down -v

logs:
	docker compose logs -f

prisma-generate:
	docker compose exec backend npx prisma generate

agente-lock:
	docker compose exec agente-service uv lock