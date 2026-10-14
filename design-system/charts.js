/* =========================================================================
   Design System "Painel CPI" — helpers de gráfico e formatação
   JS puro, sem dependências. Generaliza o código de index.html.
   Uso: <script src="charts.js"></script>  →  window.PainelCPI.{fmtBR, mi, groupedBarChart, breakdownBars}
   ========================================================================= */
(function (root) {
  'use strict';

  /** Número no padrão pt-BR com casas fixas: fmtBR(39.46) → "39,5" */
  const fmtBR = (n, d = 1) =>
    n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

  /** Valor em reais → "R$ 66,50 mi" */
  const mi = (v, d = 2) => 'R$ ' + fmtBR(v / 1e6, d) + ' mi';

  /** Valor em reais → "R$ 0,38 bi" */
  const bi = (v, d = 2) => 'R$ ' + fmtBR(v / 1e9, d) + ' bi';

  /**
   * Gráfico de barras agrupadas em SVG (seção "Capacidade de pagamento").
   * @param {SVGSVGElement} svg  <svg viewBox="0 0 780 400" role="img" aria-label="...">
   * @param {object} o
   *   categories: (string|number)[]                 — eixo X (ex.: anos)
   *   series: {data:number[], color:string}[]       — cores via var(--green), var(--blue)…
   *   yMax: number, yStep?: number (10), unit?: string ("R$ bi"), decimals?: number (1)
   *   refLine?: {value:number, label:string}        — linha tracejada vermelha (a dívida)
   */
  function groupedBarChart(svg, o) {
    const NS = 'http://www.w3.org/2000/svg';
    const vb = svg.viewBox.baseVal;
    const W = vb && vb.width ? vb.width : 780, H = vb && vb.height ? vb.height : 400;
    const m = { t: 20, r: 16, b: 46, l: 46 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const yMax = o.yMax, yStep = o.yStep || 10, dec = o.decimals == null ? 1 : o.decimals;
    const y = v => m.t + ih - (v / yMax) * ih;
    const mk = (t, a, txt) => {
      const e = document.createElementNS(NS, t);
      for (const k in a) e.setAttribute(k, a[k]);
      if (txt != null) e.textContent = txt;
      svg.appendChild(e);
      return e;
    };

    // grade horizontal + rótulos do eixo Y
    for (let v = 0; v <= yMax; v += yStep) {
      mk('line', { x1: m.l, x2: m.l + iw, y1: y(v), y2: y(v), stroke: 'var(--line)', 'stroke-width': 1 });
      mk('text', { x: m.l - 8, y: y(v) + 4, 'text-anchor': 'end', class: 'g-axis' }, v);
    }

    // barras agrupadas
    const n = o.series.length, gap = 8;
    const gw = iw / o.categories.length;
    const bw = Math.min(30, (gw - 16 - gap * (n - 1)) / n);
    o.categories.forEach((cat, i) => {
      const cx = m.l + gw * i + gw / 2, sx = cx - (bw * n + gap * (n - 1)) / 2;
      o.series.forEach((s, j) => {
        const v = s.data[i];
        if (v == null) return;
        const bx = sx + j * (bw + gap), by = y(v);
        mk('rect', { x: bx, y: by, width: bw, height: y(0) - by, rx: 4, fill: s.color, class: 'bar' });
        mk('text', { x: bx + bw / 2, y: by - 6, 'text-anchor': 'middle', class: 'g-label', style: 'fill:' + s.color }, fmtBR(v, dec));
      });
      mk('text', { x: cx, y: H - 18, 'text-anchor': 'middle', class: 'g-year' }, cat);
    });

    // eixo zero
    mk('line', { x1: m.l, x2: m.l + iw, y1: y(0), y2: y(0), stroke: 'var(--line-2)', 'stroke-width': 1.5 });

    // linha de referência (dívida)
    if (o.refLine) {
      const ry = y(o.refLine.value);
      mk('line', { x1: m.l, x2: m.l + iw, y1: ry, y2: ry, stroke: 'var(--red)', 'stroke-width': 2, 'stroke-dasharray': '6 4' });
      mk('text', { x: m.l + iw, y: ry - 6, 'text-anchor': 'end', class: 'g-debt' }, o.refLine.label);
    }

    // unidade do eixo Y
    mk('text', { x: m.l - 34, y: m.t - 6, 'text-anchor': 'start', class: 'g-axis' }, o.unit || 'R$ bi');
  }

  /**
   * Barras horizontais de composição (seção "Anatomia do débito").
   * @param {HTMLElement} el  container com class="brk"
   * @param {{n:string, v:number, c:string}[]} items  ordenados do maior para o menor
   * @param {number} total   soma de referência para o %
   * @param {(v:number)=>string} [fmtValue]  default: mi()
   */
  function breakdownBars(el, items, total, fmtValue) {
    const f = fmtValue || mi;
    const max = Math.max.apply(null, items.map(it => it.v));
    items.forEach(it => {
      const pct = (it.v / total) * 100;
      el.insertAdjacentHTML('beforeend',
        '<div class="brk-row">' +
          '<span class="n">' + it.n + '</span>' +
          '<span class="brk-track"><span class="brk-fill" style="width:' + Math.max((it.v / max) * 100, 0.6) + '%;background:' + it.c + '"></span></span>' +
          '<span class="v"><b style="color:' + it.c + '">' + (pct < 0.1 ? '&lt;0,1' : fmtBR(pct, 1)) + '%</b> · ' + f(it.v) + '</span>' +
        '</div>');
    });
  }

  const api = { fmtBR, mi, bi, groupedBarChart, breakdownBars };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.PainelCPI = api;
})(typeof window !== 'undefined' ? window : globalThis);
