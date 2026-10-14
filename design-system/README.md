# Design System — Painel CPI

Sistema visual extraído do painel `index.html` (CPI dos Grandes Devedores da Dívida Ativa · CMSP). Escrito para ser lido por um agente de código: tokens, componentes com HTML de exemplo, regras de uso e o que evitar.

**Identidade em uma frase:** painel investigativo escuro, com cara de terminal financeiro. O número vem primeiro, em fonte mono. Vermelho é só para a dívida, verde é o acento padrão e toda afirmação cita a fonte.

---

## 1. Arquivos desta pasta

| Arquivo | O que é | Quando usar |
|---|---|---|
| `README.md` | Esta especificação | Ler antes de escrever qualquer tela |
| `tokens.css` | Variáveis CSS (`:root`) e reset base | Importar **primeiro** em qualquer projeto |
| `components.css` | Todos os componentes, com as mesmas classes do `index.html` | HTML/CSS puro, ou como referência para portar para React/Vue |
| `charts.js` | `groupedBarChart`, `breakdownBars` e formatadores pt-BR (`fmtBR`, `mi`, `bi`) | Gráficos em SVG sem biblioteca |
| `tokens.json` | Os mesmos tokens no formato W3C Design Tokens | Style Dictionary, Figma Tokens, geração de temas |
| `tailwind.preset.js` | Preset Tailwind v3 que aponta para as variáveis CSS | Projetos com Tailwind |
| `example.html` | Página de referência com todos os componentes renderizados | Conferência visual. Abra no navegador |
| `logos/` | Marca e wordmarks em SVG e PNG | Ver seção 11 |

### Como usar

**HTML puro**
```html
<link rel="icon" href="logos/mark.svg" type="image/svg+xml">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
<script src="charts.js"></script>
```

**Tailwind v3**
```js
// tailwind.config.js
module.exports = { presets: [require('./design-system/tailwind.preset.js')], content: [/* … */] };
```
```css
/* globals.css */
@import './design-system/tokens.css';
@tailwind base; @tailwind components; @tailwind utilities;
```
Classes disponíveis: `bg-bg`, `bg-panel`, `bg-panel-2`, `border-line`, `border-line-strong`, `text-ink`, `text-ink-2`, `text-muted`, `text-green`, `border-green-dim`, `text-red`, `text-amber`, `text-blue`, `font-mono`, `text-eyebrow`, `text-kpi`, `text-hero`, `tracking-eyebrow`, `rounded-md` (14px), `rounded-lg` (16px), `max-w-wrap`. Breakpoint: `max-[720px]:`.

**React / outro framework:** importe `tokens.css` globalmente e porte as classes de `components.css`, mantendo os nomes. Os tokens são a fonte da verdade, então não crie valores fora deles.

---

## 2. Princípios

1. **Número primeiro.** Cada bloco abre com o número oficial em mono e só depois explica. O valor é o protagonista visual.
2. **Número → significado → comparação.** Todo bloco responde, nesta ordem: qual é o número, o que ele quer dizer e como se compara a uma referência (ex.: "0,8% de um ano de receita").
3. **Cor tem significado e não decora.** Vermelho = a dívida/o problema. Verde = padrão, positivo, capacidade. Âmbar = ressalva. Azul = segunda série de dados.
4. **Toda afirmação tem fonte.** Chips de fonte (`.src`) ao fim da seção e lista numerada no rodapé.
5. **Ressalva explícita.** Limitações, correções e "conferir antes de citar" aparecem em âmbar, no texto.
6. **Densidade de painel.** Hierarquia por tipografia e cor, poucas sombras (nenhuma), bordas de 1px translúcidas.
7. **Tema único: escuro.** O sistema não tem modo claro. `color-scheme: dark` está fixo.

---

## 3. Cores

### Superfícies e linhas
| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#080b09` | Fundo da página |
| `--panel` | `#0d1310` | Cards, tiles de KPI, hero |
| `--panel-2` | `#0a0f0c` | Áreas rebaixadas (trilho das barras de composição) |
| `--line` | `rgba(120,200,150,.14)` | Toda borda, divisória e linha de grade |
| `--line-2` | `rgba(120,200,150,.22)` | Borda reforçada: `thead`, linha de total, eixo zero |
| `--row-hover` | `rgba(120,200,150,.04)` | Hover de linha de tabela |

### Acentos semânticos
| Token | Valor | Significado | Exemplos |
|---|---|---|---|
| `--green` | `#37d97f` | **Padrão** / positivo / capacidade | Eyebrow, número de seção, valor de KPI padrão, links, série 1, "Não há incapacidade de pagamento" |
| `--green-dim` | `#1f6b45` | Borda de elementos verdes | `.pill`, `.src` |
| `--red` | `#f2584b` | **A dívida / alarme** | Número-chave do hero, borda do hero, linha de referência do gráfico, maior valor numa tabela |
| `--red-dim` | `#5a1f1c` | Borda de pill vermelha | `.pill.red` |
| `--amber` | `#f2c14e` | **Atenção / ressalva / correção** | "62% são juros", maior débito individual, aviso no rodapé, "Obs.: a data X é incorreta" |
| `--blue` | `#4cb5f5` | Série de dados secundária | EBITDA, honorários |

### Texto
| Token | Valor | Contraste sobre `--panel` | Uso |
|---|---|---|---|
| `--ink` | `#e9f2ec` | 16,4:1 | Títulos, valores, `<strong>` dentro de texto secundário |
| `--ink-2` | `#93a49b` | 7,2:1 | Parágrafos, lead, descrições, cabeçalho de tabela |
| `--muted` | `#5d6b63` | **3,4:1** | Só texto de apoio: rótulo de KPI, caption, eixo, "n/d", rodapé. **Nunca** para informação essencial |

### Regras de cor
- **Vermelho é reservado.** Use só para o valor devido ou um alerta real. Nunca em botões, ícones decorativos ou como cor de série comum.
- **Na dúvida, verde.** Valores de KPI sem conotação são verdes.
- **Ordem das séries em gráfico:** `--green` → `--blue` → `--amber` → `--ink-2` → `--muted`. O vermelho fica para a linha ou série "dívida".
- Texto com destaque dentro de um parágrafo `--ink-2`: `<strong>` vira `--ink`. Para cor semântica, use `.t-red`, `.t-green` ou `.t-amber` (ou `.hl` / `.ok` dentro do hero).
- Transparências derivam do verde `rgb(120,200,150)`, para linhas e hovers, ou do vermelho `rgb(242,88,75)`, para o brilho do hero.

---

## 4. Tipografia

Sem webfonts: só pilhas do sistema.

| Token | Pilha | Usar para |
|---|---|---|
| `--sans` | `system-ui, -apple-system, "Segoe UI", sans-serif` | Títulos (h1, h2, h3), parágrafos, lead, nomes em tabela |
| `--mono` | `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` | **Todo número**, eyebrows, rótulos, tags, pills, chips, cabeçalho de tabela, texto de gráfico, códigos (CNJ, CNPJ, base "D31284") |

**Regra de ouro:** se é número, código ou rótulo em CAIXA ALTA, é mono. Se é frase, é sans.

### Escala
| Papel | Família | Tamanho | Peso | Extras |
|---|---|---|---|---|
| Número-chave (hero) | mono | `clamp(2.4rem, 8vw, 3.6rem)` | 700 | `line-height:1`, unidade em `<small>` a .4em/600 |
| h1 | sans | `clamp(1.4rem, 3.6vw, 2.1rem)` | 700 (padrão) | `letter-spacing:-.02em`, `line-height:1.15` |
| Valor de KPI | mono | `1.5rem` | 700 | `line-height:1.05` |
| Título de seção (h3) | sans | `1.25rem` | 700 | `letter-spacing:-.01em` |
| h2 do hero | sans | `1.15rem` | 700 | |
| Lead | sans | `.98rem` | 400 | `--ink-2`, `max-width:74ch` |
| Corpo / descrição | sans | `.92rem` | 400 | `--ink-2`, `max-width:76ch` |
| Tabela | sans + mono nos números | `.85rem` | 400 | |
| Caption | sans | `.78rem` | 400 | itálico, `--muted` |
| Eyebrow / nº de seção / chip | mono | `.72rem` | 400 | CAIXA ALTA, `letter-spacing:.12–.14em` |
| Cabeçalho de tabela / tag | mono | `.68rem` | 400 | CAIXA ALTA, `letter-spacing:.06–.12em` |
| Rótulo de KPI | mono | `.66rem` | 400 | CAIXA ALTA, `letter-spacing:.1em`, `--muted` |

`body`: `line-height:1.5`, `-webkit-font-smoothing:antialiased`.

---

## 5. Espaço, forma e layout

- **Container:** `.wrap` com `max-width:1000px`, centralizado, `padding:32px 18px 72px`.
- **Ritmo vertical:** seções separadas por `34px`. Cards empilhados com `14px` entre eles. Gap de colunas `14px`. Rodapé a `44px` do conteúdo.
- **Padding:** card `20px`, hero `22px`, tile de KPI `16px`.
- **Raios:** hero `16px` · card e grade de KPIs `14px` · pill de status `5px` · barras `4px` · swatch `3px` · tags e chips `999px`.
- **Bordas:** sempre `1px solid var(--line)`. Única exceção: o hero, com `1.5px solid var(--red)`.
- **Sombras:** nenhuma. A profundidade vem do contraste `--bg` → `--panel`.
- **Breakpoint único:** `720px`. Abaixo dele, `.cols` vira 1 coluna e `.brk-row` quebra o valor para a linha de baixo.
- **Overflow:** tabelas e gráficos ficam dentro de `.tbl-scroll` / `.chart-scroll` (rolagem horizontal no card). A página nunca deve ter rolagem horizontal.

---

## 6. Componentes

Todas as classes estão em `components.css`. O `example.html` mostra cada uma renderizada.

### 6.1 Cabeçalho de página
```html
<header>
  <p class="eyebrow">CPI dos Grandes Devedores da Dívida Ativa · CMSP · 19ª Legislatura</p>
  <h1>Claro S.A. (Grupo Embratel)<br>Débitos junto ao Município de São Paulo</h1>
  <p class="lead">Subsídio técnico para negociação… Base <span class="t-mono">SEFAZ/PMSP D31284</span>.</p>
</header>
```
- Eyebrow: contexto institucional separado por ` · `.
- h1: entidade na 1ª linha e assunto na 2ª (`<br>`).

### 6.2 Hero "número-chave"
Um por página, no topo. É o número que a pessoa precisa levar para a reunião.
```html
<div class="hero">
  <span class="tag">O número-chave da oitiva</span>
  <p class="big">R$ 377,1 <small>milhões</small></p>
  <h2>Dívida com São Paulo — valor total consolidado</h2>
  <p>… <span class="hl">99% é ISS.</span> … <span class="ok">Não há incapacidade de pagamento.</span></p>
</div>
```
- `.hl` = destaque vermelho (o problema). `.ok` = conclusão verde (o argumento).

### 6.3 Grade de KPIs
Tiles separados por divisórias de 1px (truque: `gap:1px` sobre fundo `--line`). Use de 4 a 6 tiles.
```html
<div class="kpis">
  <div class="kpi">
    <p class="k-label">Valor total (base)</p>
    <p class="k-val red">R$ 377,1 mi</p>
    <p class="k-sub">Prefeitura lista ~R$ 372,9 mi</p>
  </div>
  <!-- variantes de .k-val: (padrão verde) · .red · .amber · .blue -->
</div>
```
- `k-label`: o que é. `k-val`: o número, curto (≤ 12 caracteres). `k-sub`: a contextualização ou a base.

### 6.4 Seção
```html
<section>
  <p class="s-num">01 · Capacidade de pagamento</p>
  <h3 class="s-title">Os resultados da Claro Brasil — por ano</h3>
  <p class="s-desc">Uma ou duas frases dizendo o que o leitor deve concluir.</p>
  <div class="card">…</div>
  <a class="src">Central de Resultados — RI Claro</a>
</section>
```
- Numeração com dois dígitos e ` · ` (`01 · `, `02 · `…).
- `s-desc` traz a **conclusão**, não a descrição do gráfico.

### 6.5 Card e card de nota
```html
<div class="card">…</div>

<div class="card note">
  <p class="k-label">Exigibilidade</p>
  <p>20 débitos com <strong>suspensão judicial</strong> (R$ 77,0 mi); <strong class="t-green">0 em parcelamento</strong>.</p>
</div>
```
Use `.cols` para pôr dois cards lado a lado (vira 1 coluna abaixo de 720px).

### 6.6 Tabela
```html
<div class="tbl-scroll">
  <table>
    <caption>O que a tabela mostra + ressalva, se houver.</caption>
    <thead><tr><th>Tributo</th><th>Qtde</th><th>Valor</th><th>%</th></tr></thead>
    <tbody>
      <tr><td>ISS</td><td class="mono">135</td><td class="mono g">R$ 373,38 mi</td><td class="mono">99%</td></tr>
      <tr><td>Lucro</td><td class="mono na">n/d</td><td class="mono r">R$ 188.654.898</td><td class="mono">—</td></tr>
      <tr class="total"><td>Total</td><td class="mono">162</td><td class="mono">R$ 377,12 mi</td><td class="mono">100%</td></tr>
    </tbody>
  </table>
</div>
```
- 1ª coluna alinhada à esquerda e as demais à direita.
- Toda célula numérica leva `.mono`. Cor: `.g` (verde), `.r` (vermelho, o maior ou o problema), `.na` (indisponível).
- Linha de total: `tr.total`.
- Sempre com `<caption>`.

### 6.7 Pill de status
```html
<span class="pill">EXECUÇÃO</span>
<span class="pill amber">SUSPENSO</span>
<span class="pill red">VENCIDO</span>
```
Texto em CAIXA ALTA, 1 palavra.

### 6.8 Chip de fonte
```html
<a class="src" href="…">Planilha SEFAZ/PMSP — base D31284</a>
```
Vai ao fim da seção, um chip por fonte. O ícone `▤` é inserido via CSS.

### 6.9 Legenda
```html
<div class="legend">
  <span><i class="sw" style="background:var(--green)"></i>Receita líquida</span>
  <span><i class="sw" style="background:var(--blue)"></i>EBITDA</span>
  <span><i class="sw line"></i>Dívida com SP (R$ 0,38 bi)</span>
</div>
```

### 6.10 Barras de composição (breakdown)
Mostram de que é feito um total. Linha: rótulo | trilho com barra | `% · valor`.
```html
<div class="card"><div class="brk" id="brk"></div></div>
<script>
PainelCPI.breakdownBars(document.getElementById('brk'), [
  { n:'Juros',           v:234000063.86, c:'var(--amber)' },
  { n:'Valor principal', v:66502663.72,  c:'var(--green)' },
  { n:'Multa',           v:41448342.54,  c:'var(--red)' }
], 377121609.31);
</script>
```
- Ordene do maior para o menor. A barra é proporcional ao **maior item** (que ocupa 100% do trilho). O % mostrado é sobre o **total**.
- Largura mínima de 0,6%, para que itens minúsculos continuem visíveis. Percentuais abaixo de 0,1% aparecem como `<0,1%`.

### 6.11 Rodapé
```html
<footer>
  <h4>Fontes</h4>
  <ol><li>Planilha SEFAZ/PMSP — base D31284 (extração 2026): …</li></ol>
  <p class="warn">Uso interno — dados sob sigilo fiscal. …</p>
  <p>CPI dos Grandes Devedores da Dívida Ativa — CMSP · Documento de trabalho gerado em DD/MM/AAAA.</p>
</footer>
```

---

## 7. Gráficos

Gráficos em **SVG feito à mão**, sem biblioteca. `charts.js` traz o gráfico de barras agrupadas do painel:

```html
<div class="card">
  <div class="legend">…</div>
  <div class="chart-scroll">
    <svg id="chart" viewBox="0 0 780 400" role="img" aria-label="Descrição completa do gráfico"></svg>
  </div>
</div>
<script>
PainelCPI.groupedBarChart(document.getElementById('chart'), {
  categories: [2020, 2021, 2022, 2023, 2024],
  series: [
    { data: [39.46, 39.72, 42.66, 45.76, 48.90], color: 'var(--green)' },
    { data: [16.05, 16.53, 17.99, 19.67, 21.70], color: 'var(--blue)' }
  ],
  yMax: 55, yStep: 10, unit: 'R$ bi',
  refLine: { value: 0.3771, label: 'DÍVIDA SP · R$ 0,38 bi' }
});
</script>
```

Especificação, caso precise reimplementar (Recharts, Chart.js etc.):
- **viewBox** 780×400, margens `t20 r16 b46 l46`, `min-width:560px` (rola no mobile).
- **Grade:** linhas horizontais `--line` 1px a cada `yStep`, sem grade vertical. Eixo zero em `--line-2` 1,5px.
- **Barras:** largura até 30px, 8px entre barras do grupo, `rx=4`. Hover: `opacity:.8`.
- **Rótulo de valor** acima de cada barra: mono 11px/600, na cor da série, formatado em pt-BR.
- **Eixo Y:** mono 10,5px `--muted`, com unidade (`R$ bi`) no topo à esquerda. **Eixo X:** mono 12px/600 `--ink-2`.
- **Linha de referência (dívida):** `--red`, 2px, `stroke-dasharray: 6 4`, com rótulo em CAIXA ALTA mono 10,5px/700 alinhado à direita e halo `--panel` para ficar legível sobre as barras.
- Sempre com legenda (`.legend`) acima e `role="img"` + `aria-label` descritivo no `<svg>`.
- **Mensagem padrão do painel:** comparar a dívida com a capacidade (receita/EBITDA) para mostrar a proporção.

---

## 8. Formatação de dados (pt-BR)

| Caso | Formato | Exemplo |
|---|---|---|
| Milhões em destaque | `R$ X,X mi` / `R$ X,X milhões` | `R$ 377,1 mi` |
| Bilhões | `R$ X,X bi` | `R$ 48,9 bi` |
| Valor exato | separador de milhar `.` | `R$ 188.654.898` |
| Percentual | vírgula decimal | `99,3%`, `0,95%`, `<0,1%` |
| Indisponível | `n/d` em `--muted` | |
| Sem valor aplicável | `—` | |
| Intervalo | traço meia-risca `–` | `1988–2025`, `2020–2024` |
| Separador de metadados | ponto médio com espaços ` · ` | `ISS · 99%`, `R$ 373,4 mi · 135 débitos` |
| Data | `DD/MM/AAAA` | `14/07/2026` |
| Processo CNJ | mono, sem quebra | `1577892-39.2017.8.26.0090` |
| Aspas | aspas curvas | “dever R$ X” |

Em JS: `n.toLocaleString('pt-BR', {minimumFractionDigits:d, maximumFractionDigits:d})`, ou `PainelCPI.fmtBR(n, d)`, `PainelCPI.mi(v)` e `PainelCPI.bi(v)`.

---

## 9. Voz e conteúdo

- **Registro:** técnico e institucional, direto. Frases curtas. Pode afirmar ("Não há incapacidade de pagamento.").
- **Público:** parlamentares e assessores numa oitiva ou negociação. O texto tem que servir de argumento.
- **Títulos de seção** dizem a conclusão ou a pergunta ("Do que são feitos os R$ 377,1 milhões"), não o nome do gráfico.
- **Comparações** dão escala: "equivale a 0,8% de um ano de receita".
- **Ressalvas** ficam no corpo do texto, em âmbar, nunca escondidas: "CNJ reconstituído — conferir no e-SAJ/TJSP antes de citar em juízo".
- **Fontes** aparecem duas vezes: chip na seção e lista no rodapé.

---

## 10. Acessibilidade

- `<html lang="pt-BR">`.
- Gráficos SVG com `role="img"` e `aria-label` que descreva o dado, não só o título.
- Tabelas com `<caption>` e `<thead>`.
- Cor nunca é o único sinal: o texto diz "99% é ISS". O vermelho só reforça.
- `--muted` (3,4:1) não passa AA para texto pequeno. Use apenas em rótulos de apoio, nunca no único lugar onde a informação aparece.
- Sem rolagem horizontal da página em 320px ou mais. Conteúdo largo rola dentro do card.

---

## 11. Marca e logos (`logos/`)

| Arquivo | Uso |
|---|---|
| `mark.svg` | Marca quadrada (64×64), favicon SVG. Funciona sobre fundo claro ou escuro, porque tem fundo próprio |
| `mark-512.png` | Marca em alta (redes, manifest) |
| `apple-touch-icon-180.png` | `<link rel="apple-touch-icon">` |
| `favicon-32.png` | Favicon PNG de fallback |
| `wordmark-dark.svg` / `wordmark-dark@2x.png` | Marca + "CPI · DÍVIDA ATIVA / CMSP · 19ª LEGISLATURA", para fundo **escuro** |
| `wordmark-light.svg` / `wordmark-light@2x.png` | Mesma composição, para fundo **claro** |

**O que a marca representa:** três barras verdes (capacidade financeira) e uma linha vermelha tracejada baixa (a dívida). É o mesmo argumento do gráfico principal do painel.

**Importante:**
- O repositório original **não tinha nenhum logo**. Estes arquivos foram **criados a partir deste design system** como marca de projeto. **Não são o brasão nem o logo oficial da Câmara Municipal de São Paulo.** Peças oficiais da CMSP devem usar os arquivos do Manual de Identidade Visual da Câmara, e esses arquivos podem ser adicionados nesta pasta.
- O texto dos wordmarks usa a fonte mono do sistema. Para impressão ou uso fora do navegador, prefira os PNGs ou converta o texto em curvas.
- Área de respiro mínima: 8px ao redor da marca. Tamanho mínimo da marca: 16px.

---

## 12. Faça / Não faça

| ✅ Faça | ❌ Não faça |
|---|---|
| Use só valores de `tokens.css` | Inventar cores, raios ou espaçamentos novos |
| Números sempre em `--mono` | Número em fonte sans |
| Vermelho só para a dívida ou um alerta | Vermelho em botão, ícone ou série comum |
| Um único hero por página | Vários "números-chave" competindo |
| Bordas `1px var(--line)` e nenhuma sombra | `box-shadow`, gradientes fortes, glassmorphism |
| Fonte citada em cada seção | Afirmar número sem origem |
| Tabelas e gráficos dentro de `.tbl-scroll` / `.chart-scroll` | Deixar a página rolar na horizontal |
| Formatação pt-BR (`R$ 1.234,5`) | `R$1,234.5`, `$`, `1.2M` |
| Caixa alta só em rótulos mono pequenos | Títulos ou parágrafos em caixa alta |
| Ressalvas em âmbar e visíveis | Esconder limitações do dado |

---

## 13. Checklist para o agente

Antes de entregar uma tela:
- [ ] `tokens.css` importado antes de qualquer outro CSS; `body` com `background:var(--bg)`.
- [ ] Estrutura: header (eyebrow + h1 + lead) → hero → KPIs → seções numeradas → rodapé com fontes.
- [ ] Todo número em mono e formatado em pt-BR.
- [ ] Vermelho usado só no que é dívida ou alerta.
- [ ] Cada seção com `s-num`, `s-title`, `s-desc` (conclusão) e chip de fonte.
- [ ] Tabelas com `caption`. Gráficos com `role="img"` e `aria-label`.
- [ ] Testado em 390px: nada estoura a largura da página.
- [ ] Favicon: `logos/mark.svg`.
