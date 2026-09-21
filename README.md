#  Radar IA
Radar IA é um portal de notícias sobre Inteligência Artificial, desenvolvido como um monorepo com três aplicações, orquestradas via Docker Compose.

---

## Arquitetura

O projeto é composto por três aplicações e um banco de dados, orquestrados via Docker Compose:

| Serviço          | Stack                   | Pasta              |
| ---------------- | ----------------------- | ------------------ |
| `frontend`       | React, Vite, TypeScript | `./frontend`       |
| `backend`        | NestJS, TypeScript      | `./backend`        |
| `agente-service` | FastAPI, Python (uv)    | `./agente-service` |
| `radar-postgres` | PostgreSQL 16           | *(imagem oficial)* |

### Comunicação entre os serviços

Dentro da rede do Docker Compose, os serviços se comunicam pelo **nome do serviço**, nunca por `localhost`:

```text
backend  →  http://agente-service:8000
backend  →  postgresql://...@radar-postgres:5432/...
```

A exceção é o navegador: como ele roda na máquina do desenvolvedor (fora da rede Docker), o frontend acessa o backend por `http://localhost:4000`, não pelo nome do serviço.

## Tecnologias

| Categoria      | Tecnologia              | Uso                                                 |
| -------------- | ----------------------- | --------------------------------------------------- |
| Frontend       | React, Vite, TypeScript | Interface do portal                                 |
| API principal  | NestJS, TypeScript      | Regras de negócio e endpoints HTTP                  |
| Serviço de IA  | FastAPI, Python (uv)    | Processamento e integrações relacionadas a IA       |
| Banco de dados | PostgreSQL 16           | Dados da aplicação, compartilhado entre os serviços |
| ORM            | Prisma                  | Acesso ao banco a partir do backend                 |
| Orquestração   | Docker e Docker Compose | Ambiente de desenvolvimento                         |

## Estrutura do repositório

```text
.
├── frontend/          # App React + Vite
├── backend/           # API NestJS + Prisma
├── agente-service/    # Serviço FastAPI (agente de IA)
├── docker-compose.yml
├── Makefile
├── .env.example
└── README.md
```

---

## Pré-requisitos

- Docker;
- Docker Compose.

Não é necessário ter Node.js, Python ou qualquer dependência instalada localmente — tudo roda dentro dos containers.

Clone o repositório antes de continuar:

```bash
git clone <URL-DO-REPOSITORIO>
cd <NOME-DA-PASTA>
```

## Configuração das variáveis de ambiente

Na raiz do repositório, crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Ajuste os valores conforme necessário (portas, credenciais do Postgres).

<!-- TODO: liste as variáveis do .env.example, se quiser documentá-las aqui
| Variável | Descrição | Exemplo |
| -------- | --------- | ------- |
-->

> ⚠️ Não versione arquivos `.env` com credenciais reais.

## Iniciar o ambiente

Suba o frontend, o backend, o agente de IA e o PostgreSQL:

```bash
make dev
```

Para verificar o estado dos serviços:

```bash
docker compose ps
```

Mudanças no código de qualquer serviço são refletidas automaticamente (hot reload) — não é necessário reconstruir a imagem manualmente pra ver o efeito.

## Encerrar o ambiente

```bash
make down
```

Isso mantém os dados salvos (Postgres, dependências instaladas).

Para encerrar **e remover também os volumes**:

```bash
make clean
```

## Portas utilizadas

| Serviço          | Porta | URL de desenvolvimento  |
| ---------------- | ----: | ----------------------- |
| `frontend`       |  5000 | `http://localhost:5000` |
| `backend`        |  4000 | `http://localhost:4000` |
| `agente-service` |  8000 | `http://localhost:8000` |
| `radar-postgres` |  5432 | `localhost:5432`        |

## Alteração nas dependências

`node_modules` (frontend/backend) e `.venv` (agente-service) ficam em volumes separados do código-fonte — isso evita que o bind mount sobrescreva o que foi instalado dentro do container.

Por causa disso, um `npm install`/`uv add` novo não basta sozinho. O procedimento é:

**1. Reconstruir a imagem e subir o ambiente:**

```bash
make dev
```

**2. Se o container continuar com a versão antiga instalada, limpar os volumes e subir de novo:**

```bash
make clean
make dev
```

**3. No agente-service**, depois de alterar dependências, atualize o `uv.lock`:

```bash
make agente-lock
```

## Comandos do Makefile

O projeto disponibiliza um `Makefile` para centralizar os principais comandos de desenvolvimento.

| Comando                | Descrição                                                           |
| ---------------------- | ------------------------------------------------------------------- |
| `make dev`             | Sobe o ambiente e reconstrói as imagens.                            |
| `make down`            | Encerra os containers.                                              |
| `make clean`           | Encerra os containers e remove os volumes.                          |
| `make logs`            | Exibe e acompanha os logs de todos os serviços.                     |
| `make prisma-generate` | Gera o Prisma Client dentro do container do backend.                |
| `make agente-lock`     | Gera ou atualiza o `uv.lock` dentro do container do agente-service. |

## Lint

No frontend, também é possível rodar o linter localmente, fora do Docker:

```bash
cd frontend
npm run lint
```

## Banco de dados

### Prisma

- **Schema:** [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma)
- **Configuração de conexão:** [`backend/prisma7.config.ts`](backend/prisma7.config.ts)

Para gerar o Prisma Client:

```bash
make prisma-generate
```

Para rodar outros comandos do Prisma além do `generate`, execute o comando dentro do container do backend.

---

## Fluxo de branches e commits

### Branches

| Branch    | Propósito                                  |
| --------- | ------------------------------------------ |
| `main`    | Código estável                             |
| `develop` | Integração do desenvolvimento              |
| `feat/*`  | Novas funcionalidades                      |
| `fix/*`   | Correções de bug                           |
| `chore/*` | Configuração, infraestrutura, dependências |
| `docs/*`  | Documentação                               |

Toda branch de trabalho nasce a partir da `develop` e retorna a ela via Pull Request.

### Commits

Use commits semânticos no formato:

```text
<type>(<scope>): <subject>
```

Tipos de commit:

- `feat`: nova funcionalidade;
- `fix`: correção de bug;
- `docs`: documentação;
- `refactor`: refatoração;
- `test`: testes;
- `chore`: build, dependências e manutenção.

Exemplo:

```text
feat(frontend): adiciona página de listagem de notícias
```

## Contribuindo

1. Crie uma branch a partir da `develop` (`feat/*`, `fix/*`, `chore/*` ou `docs/*`)
2. Faça commits semânticos (veja [Commits](#commits))
3. Abra um Pull Request para a `develop`

