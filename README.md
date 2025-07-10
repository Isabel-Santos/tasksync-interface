# 📋 TaskSync - Interface React

Esta parte do repositório refere-se exclusivamente à **Interface de Frontend** desenvolvida com **React**.  
A aplicação foi construída para interagir com uma API RESTful para gestão de tarefas, incluindo:

- Funcionalidades de autenticação
- Manipulação de tarefas
- Interface moderna e responsiva com **Tailwind CSS**

---

## 1. ✅ Requisitos

Antes de iniciar, certifique-se de que tem os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) e npm (ou [Yarn](https://yarnpkg.com/))
- [Git](https://git-scm.com/) para clonagem do repositório

---

## ⚙️ 2. Configuração do Frontend (React)

### 2.1. Clonar o Repositório

```bash
git clone https://github.com/Isabel-Santos/tasksync-interface.git
cd tasksync-interface
```

### 2.2. Instalar Dependências

```bash
npm install
```

Ou, se utilizar o Yarn:

```bash
yarn install
```

### 2.3. Configurando o Ambiente

O projeto está configurado para se comunicar com a API backend através de um proxy.  
Essa configuração está definida no arquivo `package.json`:

```json
"proxy": "https://localhost:5000"
```

⚠️ Certifique-se de que sua API de backend está executando neste endereço.  
Caso contrário, altere o valor do proxy antes de iniciar a aplicação.

---

## 3. 🚀 Executando o Frontend

Para iniciar a aplicação em modo de desenvolvimento, execute:

```bash
npm start
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

> O servidor possui **hot-reloading**, ou seja, alterações no código são refletidas automaticamente no navegador.

### 📜 Scripts Disponíveis

- `npm start`: Inicia a aplicação em modo de desenvolvimento.
- `npm run build`: Compila a aplicação para produção na pasta `build`.
- `npm test`: Inicia o corredor de testes em modo interativo.
- `npm run eject`: Remove a dependência de configuração do `react-scripts`.  
  ⚠️ Esta é uma operação **irreversível**.

---

## 🚀 4. Funcionalidades Principais

- **🔐 Autenticação Completa:** Registro, login com autenticação em duas etapas (2FA), recuperação de senha, e tokens JWT com renovação automática.
- **🧩 Gestão de Tarefas:** Interface Kanban responsiva para criar, visualizar, atualizar e excluir tarefas com colunas por status.
- **⚛️ Arquitetura Moderna com React:** SPA com React Router e Tailwind CSS. Componentes reutilizáveis e manutenção simplificada.
- **🔗 Integração com API:** Comunicação robusta com o backend via **Axios**, usando interceptors para tokens e tratamento de erros.

---

## 📂 Estrutura Geral do Projeto

```
tasksync-interface/
│
├── public/                  
├── src/
│   ├── api/
│   │   └── api.js
│   ├── auth/
│   │   └── PrivateRoute.jsx
│   ├── components/
│   │   ├── DashboardHeader.jsx
│   │   ├── Layout.jsx
│   │   ├── LoginForm.jsx
│   │   ├── ProfileMenu.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SignUpForm.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskColumn.jsx
│   │   ├── TaskFormModal.jsx
│   │   └── TaskList.jsx
│   ├── hooks/
│   │   └── useTasks.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── HomePage.jsx
│   │   ├── Login.jsx
│   │   ├── ResetPassword.jsx
│   │   └── SignUp.jsx
│   ├── utils/
│   │   └── auth.js
│   ├── App.js
│   ├── index.css
│   └── index.js
│
├── .gitignore
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

---

## 📊 Status do Desenvolvimento

**Status:** Desenvolvimento Ativo 🛠️  
A interface já é funcional, com sistema de autenticação robusto e gestão de tarefas, pronta para integração com uma API backend compatível.

---

## 🔜 Próximas Etapas

- ✅ Implementação de testes unitários e de integração com Jest e Testing Library  
- 🔍 Funcionalidade de pesquisa de tarefas no Dashboard  
- 👤 Página de perfil com atualização de dados e avatar  
- ♿️ Melhorias em acessibilidade e performance

---

### Nota do Projeto
Esta é a interface de frontend do projeto TaskSync, desenvolvida em React. Ela consome uma API RESTful para todas as operações.
- ▶️ Assista a um vídeo de demonstração da aplicação completa aqui
- 🔗 O repositório da API de backend (Flask) pode ser encontrado em: [[link-para-o-repositorio-da-api](https://github.com/Isabel-Santos/tasksync-api.git)]

## 💡👩‍💻 Autora

Desenvolvido por [Isabel Santos](https://github.com/Isabel-Santos)
