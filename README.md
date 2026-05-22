# 🧪 Cadastro e Consulta de Produtos

Aplicação Front-end desenvolvida como prova prática para gerenciamento de produtos de um e-commerce.

O projeto permite realizar operações de cadastro, edição, exclusão e consulta de produtos utilizando uma API REST simulada com json-server.

---

## 🚀 Tecnologias Utilizadas

- React
- TypeScript
- SCSS
- Vite
- JSON Server
- Vitest

---

## ✨ Funcionalidades

### Produtos
- Listagem de produtos
- Cadastro de novos produtos
- Edição de produtos existentes
- Exclusão de produtos
- Alteração de status (Ativo/Inativo)

### Filtros
- Filtrar por categoria
- Filtrar por faixa de preço
- Filtrar por status

### Experiência
- Feedback de carregamento
- Tratamento básico de erros
- Interface responsiva
- Componentização de interface

---

## 🧠 Decisões Técnicas

### Organização por domínio (Feature-based)

Os arquivos relacionados ao gerenciamento de produtos foram agrupados dentro do módulo `products`, concentrando:

- componentes específicos
- serviços
- tipos
- filtros
- testes

Componentes reutilizáveis foram separados em `components`.

---

## 📁 Estrutura do Projeto

```txt
src/
├── components/
│   ├── Button.scss
│   ├── Button.tsx
│   ├── Card.scss
│   └── Card.tsx
│
├── products/
│   ├── filterProducts.ts
│   ├── filterProducts.test.ts
│   ├── ProductCard.tsx
│   ├── ProductFilters.tsx
│   ├── ProductForm.tsx
│   ├── ProductList.scss
│   ├── ProductList.tsx
│   ├── products.ts
│   ├── service.ts
│   └── service.test.ts
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx

public/
db.json
```

---

## ⚙️ Como executar localmente

### 1. Clonar o repositório

```bash
git clone <https://github.com/LuanKisaki/ma9-2dias-test>
```

---

### 2. Instalar dependências

```bash
npm install
```

---

### 3. Iniciar API mock

```bash
npm run json-server
```

API disponível em:

```txt
http://localhost:3004
```

---

### 4. Iniciar aplicação

```bash
npm run dev
```


## 🧪 Executar testes

```bash
npm run test
```

---

## 📌 Observações

- Projeto desenvolvido utilizando API simulada com json-server.
- Foco em legibilidade, componentização e simplicidade da solução.
- Estrutura organizada priorizando separação por domínio e reutilização de componentes.

---

## 🔮 Possíveis Evoluções

- Paginação
- Persistência real com backend
- Gerenciamento global de estado
- Melhorias visuais
- Testes e2e
