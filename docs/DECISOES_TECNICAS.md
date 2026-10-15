# Decisões técnicas

## Aplicação e módulos

A publicação tem um único `main` em fluxo contínuo: hero, leitura executiva, panorama das fontes, contexto transversal e escopo/limites. Os cartões de fonte são gerados de `sources.json` e permanecem visíveis no panorama; escolher um abre um `<dialog>` lateral ancorado à direita, com entrada visual da direita para a esquerda. O painel pode ser fechado por botão, Escape ou backdrop; o foco retorna ao cartão que o abriu. Em telas estreitas, o painel ocupa a largura disponível. A análise individual de acontecimentos continua em um diálogo central separado, aberto sobre o painel quando necessário. A marcação semântica fica em `index.html`; eventos, fontes e editorial são JSONs sem dependência do DOM. `main.js` carrega e valida os arquivos por HTTP, aplica uma fixture opcional, monta um modelo derivado e conecta as interações. O estado local guarda modelo, indicadores, fonte selecionada e acionadores dos diálogos.

`data/repository.js` faz apenas o carregamento local e a aplicação das fixtures. `data/validate.js` valida unicidade de IDs, campos básicos e relações entre fonte, acontecimento, evidência e afirmação. `domain/report.js` contém recorte temporal, suporte documental, publicação, destaques, acompanhamento e estado de fonte. `domain/indicators.js` deriva métricas da amostra. A UI recebe o modelo; não reimplementa as regras de negócio.

O runtime usa ES Modules nativos e não possui etapa de build. A escala do protótipo não justifica framework de UI, bundler ou camada adicional de estado. O servidor Node é ferramenta de desenvolvimento que entrega arquivos estáticos com MIME types e restringe a raiz servida; hospedagem final pode ser qualquer servidor estático.

## Dados e elegibilidade

A referência editorial fica fixa em `editorial.json`, independente do relógio do visitante. Datas ISO são comparadas como datas de calendário UTC e apresentadas em pt-BR. Um evento entra na janela quando publicação ou movimentação está entre 0 e 29 dias antes da referência; uma movimentação recente pode trazer à janela um assunto antigo. Assuntos antigos aparecem separados e exigem `isActive`, `followUpReason` e suporte suficiente.

A análise pública exige relevância média ou alta e suporte oficial para os fatos publicados. Hipóteses sem evidência suficiente são omitidas sem apagar fatos sustentados do mesmo acontecimento. A função de destaque aplica relevância alta e (impacto alto ou urgência alta), além de janela recente. Cada eixo de classificação tem justificativa e evidências próprias. Indicadores distinguem assuntos por `subjectId` e contam prazos oficiais futuros por identificador. Recomendações são opcionais e limitadas a Acompanhar, Avaliar ou Considerar atuação. Nenhuma recomendação executa ações.

A POC não trata classificação editorial como metodologia aprovada. Os campos preenchidos são exemplificativos, revisáveis pela instituição e explicitamente identificados como tais na interface e documentação.

## Estados de fonte

O dataset entregue usa o estado interno `unverified`, sem rótulo na interface porque não há registro operacional para apresentar. Os estados de consulta concluída, sem novidades, falha, indisponibilidade e resultado preservado continuam distintos quando uma fixture fornece esses dados. Não há horários de execução inventados, e a interface não registra leitura do visitante. `stale` exige `lastValidSummary`; o modelo pode preservar os IDs anteriores e a UI identifica o estado como falha. As fixtures exercitam esses ramos sem simular logs ou chamadas reais.

## Interface, acessibilidade e mídia

A composição usa Arial/Helvetica local, hierarquia por peso e tamanho, azul `#004A8C` e dourado `#C4932F` como cores principais do logo, e componentes arredondados com superfícies e sombras sutis. A separação entre blocos usa fundo neutro frio nos destaques, azul claro no panorama de fontes e azul institucional com texto claro no contexto transversal; o dourado funciona como acento e as referências da síntese têm controles próprios. Cartões de acontecimento ficam brancos, com borda dourada discreta nos destaques prioritários. O vídeo original `_fundo_hero2.mp4` foi preservado como `assets/video/hero-background.mp4`; o poster vetorial funciona como fallback. O vídeo não tem autoplay no HTML e só recebe `play()` se movimento for permitido e a abertura estiver visível. A rede SVG decorativa foi removida por não representar dados nem acrescentar valor à leitura. Vídeos que não eram referenciados pela página foram excluídos para evitar mídia morta e peso de distribuição.

Detalhes usam `<dialog>` nativo com abas para Análise e Evidências e metodologia. Cada afirmação fica agrupada aos documentos, trechos, datas e links que a sustentam. Teclado, setas nas abas, Escape, contenção e retorno do foco são tratados na interface. Dados dinâmicos são renderizados com `createElement` e `textContent`; URLs externas passam por validação HTTP(S) e usam `noopener noreferrer`. `prefers-reduced-motion` elimina movimento e pausa o vídeo. Breakpoints de layout: 820px, 620px e 370px; testes cobrem 320px, 390px, 768px, 1024px, 1440px e 1920px na página contínua.

## Limitações e trade-offs

- As páginas oficiais foram verificadas em 15/10/2026 durante a implementação. JSON estático não acompanha alterações posteriores; os links oficiais são a referência para rechecagem.
- A amostra é pequena e manual. Seus totais não medem volume total de atos, publicações ou proposições.
- Estados operacionais de coleta e análise não são gerados nem registrados nesta POC.
