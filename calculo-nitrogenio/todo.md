# Project TODO — Calculo Nitrogênio

- [x] Criar e configurar logo/ícone do app
- [x] Atualizar paleta de cores (azul industrial)
- [x] Implementar tela principal com campos de entrada (diâmetro e extensão)
- [x] Implementar lógica de cálculo (arredondamento + multiplicadores)
- [x] Exibir resultado do cálculo com detalhes
- [x] Exibir nota informativa sobre bar/m³
- [x] Atualizar app.config.ts com nome e logo
- [x] Salvar checkpoint final

## Correções (Prompt Atualizado)

- [x] Corrigir lógica de cálculo: arredondar → dividir por 100 (unidades) → multiplicar por fator
- [x] Atualizar testes unitários com nova lógica
- [x] Validar resultado da correção (28 testes passando)
- [x] Salvar checkpoint final corrigido

## Correções (Prompt Atualizado - Intervalos de Diâmetro)

- [x] Corrigir intervalos de diâmetro: até 100 (1.3), 101-150 (3), 151-200 (5), 201-250 (8), >251 (12)
- [x] Atualizar testes com novos intervalos
- [x] Validar resultado da correção (34 testes passando)
- [x] Salvar checkpoint final


## PWA e Deploy Web

- [x] Configurar manifest.json para PWA
- [x] Criar service worker para offline
- [x] Gerar ícones em múltiplos tamanhos (192x192, 512x512)
- [x] Gerar link web público
- [x] Testar acesso via navegador


## Deploy Permanente (Vercel)

- [x] Preparar build web estático (dist/ pronto)
- [x] Criar guia detalhado de deploy
- [x] Gerar ZIP com dist pronto para upload
- [ ] Fazer deploy em Vercel (manual pelo usuário)
- [ ] Gerar link permanente
