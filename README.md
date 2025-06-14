# Rick and Morty Episodes App

Aplicação web feita com React + TypeScript consumindo a API GraphQL de Rick and Morty. A proposta é permitir que usuários explorem episódios da série com recursos como favoritar, marcar como visto, aplicar filtros e ver detalhes dos personagens.

---

## ✅ Funcionalidades implementadas

### 🔍 Episódios
- Listagem de episódios com animação usando Framer Motion
- Paginação automática com `fetchMore` até o fim dos dados
- Filtro por nome do episódio (busca em tempo real)
- Exibição com layout responsivo em grid
- Imagem representando um dos personagens do episódio
- Título limitado a 2 linhas (`line-clamp-2`)

### ❤️ Favoritos
- Botão para favoritar e desfavoritar episódios
- Página com lista de episódios favoritados
- Contador de favoritos na navbar
- Animações nos cards dos favoritos

### 👁️ Vistos
- Botão para marcar/desmarcar como "Visto"
- Página dedicada com episódios vistos
- Contador de vistos na navbar

### 📺 Detalhes do Episódio
- Página individual com informações do episódio
- Lista de personagens participantes com imagem e nome
- Status do personagem com bolinha colorida:
  - 🟢 Alive
  - 🔴 Dead
  - ⚪ Unknown

### 💄 Interface & Estilo
- Tailwind CSS para estilização
- Navbar com efeito *glassmorphism* (`backdrop-blur`, `bg-white/30`)
- Paleta de cores suave (tons claros, bordas suaves)
- Ícones com `react-icons`
- Cursor pointer nos botões de ação
- Mobile responsivo com ocultação do texto da logo em telas pequenas

---

## 📦 Tecnologias utilizadas

- React + TypeScript
- Vite
- Apollo Client (GraphQL)
- Tailwind CSS
- Framer Motion
- React Router DOM
- React Icons

---

## 📁 Organização do projeto

```bash
src/
├── components/ # Componentes reutilizáveis
├── context/ # Estado global (favoritos e vistos)
├── graphql/ # Queries GraphQL
├── pages/ # Páginas principais (home, favorites, seen, detail)
├── types/ # Tipagens TypeScript
├── App.tsx # Rotas principais
└── main.tsx # Setup principal do app
```

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/RobsonMT/azs-web-rickandmorty.git
cd azs-web-rickandmorty
```

### 2. Instale as dependências
```bash 
npm install
# ou
yarn install
```

### 3. Inicie o servidor de desenvolvimento
```bash 
npm run dev
# ou
yarn dev

```

---

## 👨‍💻 Autor

Desenvolvido por [Robson F. Martins](https://github.com/RobsonMT)

---

