# Arquitetura da Plataforma Lojas Torres

## Visão geral

O projeto foi estruturado como uma plataforma full stack com separação clara entre experiência do usuário e camada de serviços.

- `apps/web`: front-end institucional e comercial em React + TypeScript + Vite
- `apps/api`: API REST em Node.js + Express + TypeScript

Essa divisão permite evoluir o produto com segurança, mantendo independência entre interface, dados e regras de negócio.

## Objetivos da arquitetura

- sustentar um catálogo técnico pesquisável
- acelerar o fluxo de pré-orçamento
- reduzir dependência de atendimento manual
- permitir integração futura com ERP, estoque, CRM ou planilhas
- manter código limpo, escalável e fácil de evoluir

## Front-end

O front-end foi organizado em módulos com responsabilidade bem definida:

- `components`: peças reutilizáveis de interface, como cabeçalho, rodapé, modal de produto e painel de orçamento
- `pages`: páginas da jornada principal, como Home, Produtos, Fusíveis, Automação, Sobre e Contato
- `context`: estado compartilhado do orçamento
- `services`: consumo da API
- `config`: dados institucionais da empresa
- `styles`: identidade visual global

### Papel do front-end

- apresentar a marca com posicionamento premium
- permitir busca e filtro técnico
- exibir fichas técnicas detalhadas
- conduzir o usuário até o pré-orçamento
- acionar o envio para WhatsApp com mensagem pronta

## Back-end

A API centraliza os dados de produto e a regra de geração de orçamento.

### Endpoints atuais

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/featured`
- `GET /api/meta/filters`
- `POST /api/quote`

### Papel da API

- servir catálogo técnico
- entregar filtros dinâmicos
- fornecer produtos em destaque
- calcular subtotal e composição do orçamento
- montar a mensagem pronta para WhatsApp

## Dados de produto

Os produtos foram modelados com foco comercial e técnico ao mesmo tempo.

Cada item contém:

- identificação e SKU
- categoria e segmento
- tipo, amperagem e tensão
- preço estimado
- descrição comercial
- aplicações
- ficha técnica
- prazo
- sinalização de destaque

## Fluxo de orçamento

1. O usuário navega pelo catálogo.
2. Adiciona produtos ao painel lateral.
3. Ajusta quantidades.
4. O front envia os itens para `POST /api/quote`.
5. A API calcula subtotal e gera a mensagem.
6. O usuário envia o pedido pelo WhatsApp com estrutura já pronta.

## Evolução planejada

Esta base foi pensada para suportar futuras camadas sem refatoração estrutural pesada:

- integração com estoque real
- integração com ERP
- regras comerciais avançadas
- chatbot
- histórico de pedidos
- área do cliente
- painel administrativo
