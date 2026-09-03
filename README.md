# Radar IA

Portal de notícias sobre Inteligência Artificial.

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Estilização:** Tailwind CSS (mobile-first)
- **ORM:** Prisma
- **Banco de dados:** PostgreSQL 16
- **Ambiente de desenvolvimento:** Docker + Docker Compose

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose instalados
- Não é necessário ter Node.js instalado localmente — tudo roda dentro dos containers

## Como rodar o projeto

1. Clone o repositório:
```bash
   git clone https://github.com/Senac-Labs-Code/radar-ia.git
   cd radar-ia
```

2. Copie o arquivo de variáveis de ambiente de exemplo:
```bash
   cp .env.example .env.development
```
   Edite o `.env.development` com os valores que preferir (usuário, senha e nome do banco).

3. Suba os containers (primeira vez, ou após mudar dependências):
```bash
   npm run docker:build
```

4. Nas próximas vezes, para subir o ambiente:
```bash
   npm run docker:up
```

5. Acesse [http://localhost:3000](http://localhost:3000)

6. Para derrubar os containers:
```bash
   npm run docker:down
```

## Scripts disponíveis

| Script                  | O que faz                                                        |
|--------------------------|-------------------------------------------------------------------|
| `npm run docker:build` | Sobe os containers reconstruindo a imagem (usar após mudar dependências ou o Dockerfile) |
| `npm run docker:up`    | Sobe os containers no dia a dia (com logs em tempo real)         |
| `npm run docker:down`  | Derruba os containers (mantém os dados do banco)                 |
| `npm run dev`           | Roda o Next.js localmente, fora do Docker (não recomendado — ver nota abaixo) |
| `npm run lint`          | Roda o linter (ESLint)                                            |
| `npm run build`         | Gera o build de produção do Next.js                              |

> ⚠️ **Nota:** o comando `npm run dev` só deve ser usado dentro do container. Rodá-lo diretamente no host pode causar erros (ex: incompatibilidade do Turbopack com bindings nativos). Prefira sempre `npm run docker:up`.

## Variáveis de ambiente

Veja `.env.example` para a lista completa. As principais são:

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` — credenciais do banco (usadas pelo container Postgres)
- `DATABASE_URL` — string de conexão usada pelo Prisma (deve refletir os mesmos valores acima)

O arquivo real (`.env.development`) **não** é versionado no Git.

## Banco de dados (Prisma)

- Schema: `prisma/schema.prisma`
- Configuração de conexão: `prisma7.config.ts`
- Para rodar comandos do Prisma, execute dentro do container:
```bash
  docker exec -it radar-ia-dev npx prisma <comando>
```

## Fluxo de branches

O projeto segue um modelo simplificado de Git Flow:

```
main      → código estável
develop   → integração do desenvolvimento
feat/*    → novas funcionalidades
fix/*     → correções de bug
chore/*   → configuração, infraestrutura, dependências
docs/*    → documentação
```

Toda branch de trabalho nasce a partir da `develop` e retorna a ela via Pull Request.