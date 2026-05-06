# Design — Calculo Nitrogênio

## Conceito Visual

Aplicativo industrial/técnico voltado a profissionais de tubulação. Visual limpo, sóbrio e profissional, com identidade visual que remete ao nitrogênio (gás industrial — tons de azul escuro e cinza metálico).

## Paleta de Cores

| Token       | Light              | Dark               |
|-------------|--------------------|--------------------|
| primary     | #1A5276 (azul aço) | #2E86C1             |
| background  | #F4F6F7             | #0D1117             |
| surface     | #FFFFFF             | #161B22             |
| foreground  | #1C2833             | #E8EDF2             |
| muted       | #7F8C8D             | #8B949E             |
| border      | #D5D8DC             | #30363D             |
| success     | #1E8449             | #3FB950             |
| warning     | #D68910             | #E3B341             |
| error       | #C0392B             | #F85149             |

## Telas

### 1. Tela Principal (Home) — única tela do app

**Conteúdo:**
- Cabeçalho com título "Cálculo de Nitrogênio" e ícone de molécula/gás
- Card de entrada de dados:
  - Campo: Diâmetro da tubulação (mm) — teclado numérico
  - Campo: Extensão da tubulação (m) — teclado numérico
  - Botão "Calcular"
- Card de resultado:
  - Exibe o volume calculado de nitrogênio (m³) em destaque
  - Exibe detalhes do cálculo (extensão arredondada, multiplicador usado)
- Nota informativa: "A cada 20 bar na garrafa corresponde a 1 m³ de volume"

## Fluxo Principal

1. Usuário insere o diâmetro em mm
2. Usuário insere a extensão em metros
3. Toca em "Calcular"
4. Resultado aparece abaixo com o volume de nitrogênio necessário
5. Nota informativa sempre visível abaixo do resultado

## Lógica de Cálculo

1. Arredondar extensão para múltiplo de 100 superior (ex: 101 → 200, 100 → 100)
2. Aplicar multiplicador conforme diâmetro:
   - Até 100 mm → × 1.3
   - 101–200 mm → × 3
   - 201–250 mm → × 5
   - 251–315 mm → × 8
   - > 315 mm → × 12
3. Volume = extensão_arredondada × multiplicador

## Layout (portrait 9:16)

```
┌─────────────────────────────┐
│  [ícone]  Cálculo Nitrogênio│  ← Header
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐    │
│  │  Diâmetro (mm)      │    │  ← Input card
│  │  [___________]      │    │
│  │  Extensão (m)       │    │
│  │  [___________]      │    │
│  │  [  CALCULAR  ]     │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  Volume Necessário  │    │  ← Result card
│  │    XXX,X m³         │    │
│  │  Extensão: X m → X m│    │
│  │  Multiplicador: X   │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │ ℹ A cada 20 bar...  │    │  ← Info card
│  └─────────────────────┘    │
└─────────────────────────────┘
```
