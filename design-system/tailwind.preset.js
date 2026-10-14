/**
 * Design System "Painel CPI" — preset Tailwind (v3: `presets: [require('./tailwind.preset.js')]`).
 * As cores apontam para as variáveis de tokens.css; importe tokens.css no CSS global.
 * Em Tailwind v4, prefira importar tokens.css e mapear com @theme.
 * Breakpoint do sistema: use a variante arbitrária `max-[720px]:`.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: { DEFAULT: 'var(--panel)', 2: 'var(--panel-2)' },
        line: { DEFAULT: 'var(--line)', strong: 'var(--line-2)' },
        green: { DEFAULT: 'var(--green)', dim: 'var(--green-dim)' },
        blue: { DEFAULT: 'var(--blue)' },
        amber: { DEFAULT: 'var(--amber)' },
        red: { DEFAULT: 'var(--red)', dim: 'var(--red-dim)' },
        ink: { DEFAULT: 'var(--ink)', 2: 'var(--ink-2)' },
        muted: 'var(--muted)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['ui-monospace', '"SF Mono"', 'SFMono-Regular', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      fontSize: {
        micro: '.66rem',
        label: '.68rem',
        eyebrow: '.72rem',
        caption: '.78rem',
        small: '.85rem',
        body: '.92rem',
        lead: '.98rem',
        h3: '1.25rem',
        kpi: '1.5rem',
        h1: 'clamp(1.4rem,3.6vw,2.1rem)',
        hero: 'clamp(2.4rem,8vw,3.6rem)',
      },
      letterSpacing: { eyebrow: '.14em', label: '.1em', tight: '-.02em' },
      borderRadius: { xs: '3px', sm: '4px', 'pill-sq': '5px', md: '14px', lg: '16px', full: '999px' },
      spacing: { 's1': '6px', 's2': '10px', 's3': '14px', 's4': '20px', 's5': '24px', 's6': '34px', 's7': '44px' },
      maxWidth: { wrap: '1000px' },
    },
  },
};
