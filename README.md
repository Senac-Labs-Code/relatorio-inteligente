# Relatório Vivo — Fecomércio

Publicação institucional estática para leitura de acontecimentos oficiais relacionados ao varejo farmacêutico. O runtime usa HTML5, CSS e JavaScript Vanilla ES2022 com ES Modules nativos; fontes, acontecimentos e conteúdo editorial estão em JSON local. Não há framework, bundler, backend, API de negócio nem coleta oficial automática.

## Execução

Requisitos: Node.js 22.13+ e npm. O servidor Node é apenas ferramenta de desenvolvimento; o visitante recebe arquivos estáticos.

```sh
npm install
npx playwright install chromium
npm run dev
```

Acesse <http://127.0.0.1:4173>. A porta aceita `PORT`, por exemplo `PORT=8080 npm run dev`. Os módulos e `fetch()` exigem HTTP; não abra por `file://`.

```sh
npm run check
```

O comando executa ESLint, Prettier, testes unitários com `node:test` e E2E com Playwright. Para uma hospedagem estática, publique a raiz do projeto em Nginx, Apache ou serviço equivalente, preservando os caminhos `assets/` e `src/`.

## Estrutura

```text
assets/                 Marca, poster estático e vídeo do hero
src/data/               sources.json, events.json, editorial.json e cenários
src/js/main.js          Bootstrap, carregamento, estado e listeners
src/js/data/            Fetch local e validação dos dados
src/js/domain/          Elegibilidade, recorte, acompanhamento e indicadores
src/js/ui/              Renderização editorial, diálogo e movimento opcional
src/styles/             Tokens, base, layout, componentes e movimento
scripts/serve.mjs       Servidor HTTP de desenvolvimento
tests/unit/              Regras puras e validação
tests/e2e/               Navegação, diálogo, falhas, mídia e responsividade
docs/                    Decisões técnicas, casos oficiais e matriz de requisitos
docs/capturas/           Capturas geradas com Playwright em mobile e desktop
```

## Conteúdo e limites

A referência da demonstração é 15/10/2026, com janela de 30 dias. O conjunto contém dois acontecimentos recentes da ANVISA (transição do SNCR e campanha de erros de medicação), uma referência histórica da CMED e duas proposições históricas da Câmara. O evento SNCR consolida duas orientações oficiais sobre um mesmo assunto e não é contado duas vezes. O indicador de prazo considera a integração ao SNCR para receitas brancas emitidas eletronicamente a partir de 30/10/2026; receitas em papel continuam possíveis.

Os fatos e links oficiais estão documentados em `docs/FONTES_E_CASOS.md` e vinculados nos JSONs. Interpretações, recomendações e classificações são exemplos editoriais; a metodologia e a taxonomia dependem de validação institucional. Os números descrevem apenas os registros carregados e não o universo de publicações oficiais. As datas da interface são datas de publicação/movimentação dos documentos; nenhum registro de coleta ou análise é alegado. A interface identifica uma vez que é uma demonstração com dados de referência.

A página é uma leitura contínua: visão executiva, panorama das fontes e, ao final, contexto transversal antes do escopo e limites. Os cartões do panorama permanecem no relatório. Ao selecionar uma fonte, um painel acessível entra pela direita sobre a página; fechar o painel retorna o foco ao cartão que o abriu. Em telas menores, o painel ocupa a largura disponível. As análises individuais continuam em modal central com abas **Análise** e **Evidências e metodologia**.

## Cenários locais

Sem painel administrativo, cenários podem ser acionados pela query string:

- `/?cenario=padrao` — amostra de referência (também é o padrão sem parâmetro).
- `/?cenario=sem-novidades` — consulta sem novidades demonstradas; não cria registros.
- `/?cenario=anvisa-indisponivel` — falha parcial e último resultado demonstrativo preservado.
- `/?cenario=sem-evidencias` — conserva fatos documentados e oculta a hipótese sem suporte suficiente.

Os cenários alteram os dados carregados antes da derivação; a UI não edita os registros diretamente.

## Capturas

- [Página contínua em mobile, 390 px](docs/capturas/mobile-390.png)
- [Página contínua em desktop, 1440 px](docs/capturas/desktop-1440.png)
- [Cartões e análise da fonte em mobile, 390 px](docs/capturas/fontes-mobile-390.png)
- [Cartões e análise da fonte em desktop, 1440 px](docs/capturas/fontes-desktop-1440.png)
- [Análise em modal mobile, 390 px](docs/capturas/modal-mobile-390.png)
- [Análise em modal desktop, 1440 px](docs/capturas/modal-desktop-1440.png)
