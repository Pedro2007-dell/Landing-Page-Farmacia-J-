# 💊 Farmácia Já

Plataforma digital de saúde pública para acesso rápido e moderno a medicamentos disponibilizados pelo SUS (Sistema Único de Saúde) e pelo programa Farmácia Popular.

## 🌐 Acesse o Projeto

🔗 **Site no ar:** [landing-page-farmacia-j.vercel.app](https://landing-page-farmacia-j.vercel.app/medicamentos)

## 📚 Sobre o Projeto

Este projeto foi desenvolvido como atividade acadêmica para a disciplina de **Análise e Desenvolvimento de Sistemas (ADS)**, no **3º Período**, com foco nas disciplinas de **APIs e Frameworks**.

O objetivo é aplicar, na prática, conceitos de desenvolvimento web moderno, consumo de APIs REST, integração com banco de dados e autenticação de usuários, construindo uma aplicação completa de ponta a ponta — do front-end ao banco de dados.

**Instituição:** UniFAMINAS — Muriaé
**Curso:** Tecnólogo em Análise e Desenvolvimento de Sistemas
**Período:** 3º Período

## 👨‍💻 Desenvolvedores

| Nome | Instagram |
|---|---|
| Matheus Lourenço | [@matheuslourencoo_](https://www.instagram.com/matheuslourencoo_/) |
| Pedro Henrique | [@dx_predin](https://www.instagram.com/dx_predin/) |
| Paulo Victor | [@paulo_vmo](https://www.instagram.com/paulo_vmo/) |

## 🚀 Funcionalidades

- Cadastro e login de usuários (autenticação via CPF e senha)
- Busca e listagem de medicamentos disponíveis
- Localização de farmácias parceiras/conveniadas
- Receituário pessoal: adicionar, remover e gerenciar posologia de medicamentos
- Perfil de usuário com edição de dados
- Navegação por categorias de medicamentos
- Design responsivo, acessível e moderno

## 🛠️ Tecnologias Utilizadas

### Front-end
- **React 19** — biblioteca para construção da interface
- **Vite** — build tool e servidor de desenvolvimento
- **React Router DOM** — gerenciamento de rotas da aplicação
- **Axios** — cliente HTTP para consumo da API REST
- **CSS puro** — estilização modular por componente

### Back-end / Dados
- **API REST própria** — hospedada no Render, responsável pelos dados de medicamentos e farmácias
- **Supabase** — banco de dados PostgreSQL utilizado para autenticação e armazenamento de usuários

### Infraestrutura / Deploy
- **Vercel** — hospedagem e deploy contínuo do front-end
- **GitHub** — versionamento e controle de código

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior)
- Conta no [Supabase](https://supabase.com) configurada

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/Landing-Page-Farmacia-J-.git
```

2. Acesse a pasta do projeto:
```bash
cd Landing-Page-Farmacia-J-
```

3. Instale as dependências:
```bash
npm install
```

4. Crie um arquivo `.env` na raiz do projeto com as suas credenciais do Supabase:
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse pelo navegador:
```
http://localhost:5173
```

## 📂 Estrutura do Projeto

```
src/
├── components/      # Componentes React organizados por funcionalidade
│   ├── header/
│   ├── hero/
│   ├── Footer/
│   ├── Login/
│   ├── register/
│   ├── medicamentos/
│   ├── farmacias/
│   ├── perfil/
│   └── categorias/
├── hooks/           # Hooks customizados (useUsuario, useReceituario)
├── supabaseClient.js
├── App.jsx
└── main.jsx
```

## 🎯 Objetivos de Aprendizagem

- Consumo de APIs REST com Axios
- Integração com banco de dados (Supabase/PostgreSQL)
- Gerenciamento de estado em React (useState, useEffect, hooks customizados)
- Roteamento client-side com React Router
- Boas práticas de organização de código e componentização
- Deploy de aplicações front-end (Vercel)

