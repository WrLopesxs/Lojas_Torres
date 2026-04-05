# Lojas Torres Platform

Projeto full stack para modernização digital da Lojas Torres, com:

- site institucional premium
- catálogo técnico filtrável
- gerador automático de orçamentos
- integração com WhatsApp pronta para expansão
- API preparada para evoluir de base JSON para estoque real

## Estrutura

```text
apps/
  api/   -> API Express + TypeScript
  web/   -> Front-end React + Vite
```

## Como rodar

```bash
npm install
npm --prefix apps/api install
npm --prefix apps/web install
npm run dev
```

## Observação

O número de WhatsApp foi deixado configurável e com placeholder seguro nos arquivos de configuração. Substitua pelo número oficial da empresa antes de publicar.
