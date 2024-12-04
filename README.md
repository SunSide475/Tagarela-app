# Tagarela

O Tagarela é um aplicativo desenvolvido para apoiar a comunicação de crianças com Transtorno do Espectro Autista (TEA) e Apraxia de Fala na Infância (AFI). Usando recursos visuais e interativos, o aplicativo auxilia no desenvolvimento da fala, inspirado em métodos como PECS e Prompt.

Com uma interface simples e adaptada, o Tagarela permite que as crianças cliquem em imagens que representam ações ou objetos e visualizem vídeos demonstrativos para aprender a articulação correta dos sons. Ele complementa as terapias tradicionais, promovendo inclusão e melhorando a comunicação. Aqui está uma visão do que você verá neste README:

1. Sobre o Projeto
2. Funcionalidades
3. Tecnologias Utilizadas
4. Pré-Requisitos
5. Instalação
6. Uso

## ⚙️ Funcionalidades

- Autenticação: Tela de login e cadastro de usuários.
- Animações com Pop-ups: Mensagens animadas com o hook usePopUp.
- Menu Dinâmico: Navegação simples e prática entre as telas do aplicativo.
- Configurações: Gerenciamento de preferências do usuário.
- Dados do Usuário: Edição de dados do usuário
- Tela de fila: Tela para auxílio na comunicação da criança com os pais.
- Cadastro de cards: Tela para cadastro de cards personalizados.


## 💡 Tecnologias Utilizadas

- **React Native** ⚛️: Biblioteca JavaScript para construção de interfaces de usuário nativas em dispositivos móveis.
- **Expo** 🚀: Ferramenta de build rápida que acelera o desenvolvimento de aplicativos React Native.
- **Zustand** 🐻: Biblioteca para gerenciamento de estado minimalista.
- **Axios** 🌐: Cliente HTTP para facilitar a comunicação com APIs.
- **React Navigation** 🗺️: Biblioteca para gerenciar rotas em aplicações React
- **Prettier** ✨: Ferramenta de formatação de código para manter a consistência.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js:** Node.js deve estar instalado no seu sistema.
- **React Native CLI:** Você pode seguir a documentação oficial do React Native para configurar o ambiente de desenvolvimento.
- **Emulador Android ou iOS:** Um emulador ou dispositivo físico para rodar o aplicativo.

## 🚀 Instalação

1. Clonar o repositório
   ```bash
   git clone https://github.com/SunSide475/Tagarela-app.git
2. Navegue até o diretório do projeto
   ```bash
   cd Tagarela-app
3. Instalar as dependências Entre no diretório do projeto e execute o comando abaixo:
   ```bash
   npm install
5. Executar o aplicativo
- Android
  ```bash
  npx react-native run-android
- iOS (em sistemas MacOS)
  ```bash
  npx react-native run-ios
## 📁 Estrutura de Pastas
```bash
├── src/
│   ├── assets/                  # Arquivos estáticos (imagens, fontes, etc.)
│   ├── components/              # Componentes reutilizáveis
│   │   ├── Card/
│   │   │   └── Card.js          # Componente de card
│   │   ├── CustomModal/
│   │   │   └── CustomModal.js   # Componente de Modal Customizado
│   │   ├── Head/
│   │   │   └── Head.js          # Componente de cabeçalho
│   │   ├── Loading/
│   │   │   └── Loading.js       # Componente de tela de carregamento
│   │   ├── Menu/
│   │   │   └── Menu.js          # Componente de menu
│   │   └── PopUp/
│   │       └── PopUp.js         # Componente de Pop-up
│   ├── hooks/                   # Hooks personalizados
│   │   ├── useLoadFont/
│   │   │   └── useLoadFont.js   # Hook para carregamento de fontes
│   │   ├── usePopUp/
│   │   │   └── usePopUp.js      # Hook para animações de pop-up
│   │   └── useUserId/
│   │       └── useUserId.js     # Hook para resgatar o id de usuario
│   ├── screens/                 # Telas do aplicativo
│   │   ├── RegisterCard/
│   │   │   └── RegisterCard.js  # Tela de cadastro de cards personalizados
│   │   ├── Game/
│   │   │   └── Game.js          # Tela de jogo do quiz
│   │   ├── Home/
│   │   │   └── Home.js          # Tela home
│   │   ├── LineCards/
│   │   │   └── LineCards.js     # Tela de Fila para comunicação
│   │   ├── Login/
│   │   │   └── Login.js         # Tela de login
│   │   ├── QuizMenu/
│   │   │   └── QuizMenu.js      # Tela para seleção do nível do quiz
│   │   ├── Register/
│   │   │   └── Register.js      # Tela de cadastro
│   ├── Settings/
│   │   └── Settings.js          # Tela de configurações
│   ├── TestCard/
│   │   └── TestCard.js          # Componente de teste
├── store/                       # Armazenamento de estado global (Zustand)
│   ├── useAuthStore.js          # Gerencia o estado de autenticação do usuário
│   ├── useCardsStore.js         # Gerencia o estado dos cards
│   ├── useGameStore.js          # Gerencia o estado dos jogos do quiz
│   └── useIPStore.js            # Gerencia o estado do IP para requisições de API
├── utils/                       # Funções utilitárias
│   └── separateSyllables.js     # Função que se´para as silabas de uma palavra
├── .gitignore                   # Arquivos a serem ignorados pelo Git
├── App.js                       # Arquivo principal
```
## 🛠️ Uso
Para uma melhor experiência, recomenda-se usar um dispositivo móvel ou um emulador com a resolução de tela apropriada. Você pode ajustar as configurações de exibição no seu dispositivo, se necessário.

### Como configurar o IP para acessar a API local no dispositivo físico e emulador Android

Ao rodar o projeto em diferentes ambientes, é necessário configurar corretamente o endereço IP para que o aplicativo consiga acessar a API que está rodando localmente. A seguir, explicamos como fazer isso dependendo do ambiente em que você está rodando o projeto:

#### 1. Dispositivo físico (com Expo Go)
- Se o aplicativo estiver rodando em um dispositivo físico utilizando o **Expo Go**, você precisa configurar o IP da sua máquina local para que o dispositivo consiga acessar a API.
- Para isso, abra o arquivo `useIPStore.js` que está na pasta `store` do seu projeto.
- No estado `ip` dentro desse arquivo, insira o **IP da sua máquina** (você pode encontrar o IP local da sua máquina usando comandos como `ipconfig` no Windows ou `ifconfig` no Linux/macOS).

#### 2. Emulador Android (Android Studio)
- Se o aplicativo estiver rodando em um **emulador Android** (Android Studio), o endereço IP da máquina local não funcionará diretamente. Isso ocorre porque o emulador Android não consegue acessar a API usando o IP local da máquina.
- No caso do **emulador Android**, o endereço IP que você deve usar é o **10.0.2.2**. Este é o IP de loopback (ou "localhost") específico para o emulador Android, que permite que ele acesse a API rodando na máquina host.

#### Resumo
- **Em dispositivo físico com Expo Go**: Coloque o **IP da sua máquina** no estado `ip` de `useIPStore.js`.
- **Em emulador Android (Android Studio)**: Use **10.0.2.2** como o IP no estado `ip` de `useIPStore.js`.

Essa configuração é necessária para garantir que o aplicativo consiga acessar a API local, seja em um dispositivo físico ou emulador.
