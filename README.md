# Tagarela

O Tagarela é um aplicativo desenvolvido para apoiar a comunicação de crianças com Transtorno do Espectro Autista (TEA) e Apraxia de Fala na Infância (AFI). Usando recursos visuais e interativos, o aplicativo auxilia no desenvolvimento da fala, inspirado em métodos como PECS e Prompt.

Com uma interface simples e adaptada, o Tagarela permite que as crianças cliquem em imagens que representam ações ou objetos e visualizem vídeos demonstrativos para aprender a articulação correta dos sons. Ele complementa as terapias tradicionais, promovendo inclusão e melhorando a comunicação. Aqui está uma visão do que você verá neste README:

1. Sobre o Projeto
2. Funcionalidades
3. Tecnologias Utilizadas
4. Pré-Requisitos
5. Instalação
6. Uso

## 📖 Sobre o Projeto


## ⚙️ Funcionalidades

- Autenticação: Tela de login e cadastro de usuários.
- Animações com Pop-ups: Mensagens animadas com o hook usePopUp.
- Menu Dinâmico: Navegação simples e prática entre as telas do aplicativo.
- Configurações: Gerenciamento de preferências do usuário.
- Tela de Testes: Componente para testes e exibição de dados.

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
│   ├── assets/              # Arquivos estáticos (imagens, fontes, etc.)
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Head.js          # Componente de cabeçalho
│   │   ├── Loading.js       # Componente de tela de carregamento
│   │   └── Menu.js          # Componente de menu
│   ├── hooks/               # Hooks personalizados
│   │   └── usePopUp.js      # Hook para animações de pop-up
│   ├── screens/             # Telas do aplicativo
│   │   ├── Login.js         # Tela de login
│   │   ├── Register.js      # Tela de cadastro
│   ├── Settings/            # Tela de configurações
│   ├── TestCard/            # Componente de teste
├── store/                   # Armazenamento de estado global (Redux ou similar)
├── App.js                   # Arquivo principal
├── .gitignore               # Arquivos a serem ignorados pelo Git
```
## 🛠️ Uso
Para uma melhor experiência, recomenda-se usar um dispositivo móvel ou um emulador com a resolução de tela apropriada. Você pode ajustar as configurações de exibição no seu dispositivo, se necessário.