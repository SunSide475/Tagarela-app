# Tagarela-app

Um aplicativo móvel desenvolvido em React Native para oferecer uma experiência de comunicação fluída. O Tagarela App é composto por funcionalidades que permitem interações rápidas e eficientes entre os usuários, promovendo uma plataforma de mensagens dinâmica e intuitiva.

## Funcionalidades

**Autenticação:** Tela de login e cadastro de usuários.
**Animações com Pop-ups:** Mensagens animadas com o hook usePopUp.
**Menu Dinâmico:** Navegação simples e prática entre as telas do aplicativo.
**Configurações:** Gerenciamento de preferências do usuário.
**Tela de Testes:** Componente para testes e exibição de dados.

## Tecnologias Utilizadas

**React Native:** Framework para desenvolvimento de aplicativos móveis.
**Hooks:** Para o controle de estado e animações.
**React Navigation:** Para a navegação entre as diferentes telas do app.

## Pré-requisitos
Antes de começar, certifique-se de ter instalado:

**Node.js:** Node.js deve estar instalado no seu sistema.
**React Native CLI:** Você pode seguir a documentação oficial do React Native para configurar o ambiente de desenvolvimento.
**Emulador Android ou iOS:** Um emulador ou dispositivo físico para rodar o aplicativo.

## Passo a Passo para Rodar o Projeto

### 1. Clonar o repositório

bash
Copiar código
git clone https://github.com/SunSide475/Tagarela-app.git

### 2. Instalar as dependências Entre no diretório do projeto e execute o comando abaixo:

bash
Copiar código
cd tagarela-app

### 3. Criar uma branch de desenvolvimento

bash
Copiar código
git switch -c dev
git pull origin dev

### 4. Instalar dependências
bash
Copiar código
npm install

### 5. Rodar o aplicativo

Android
bash
Copiar código
npx react-native run-android

iOS (em sistemas MacOS)
bash
Copiar código
npx react-native run-ios

## Estrutura de Pastas
bash
Copiar código
.
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
Uso
Login e Cadastro de Usuários

POST /login: Envia as credenciais do usuário para autenticação.
POST /register: Cria uma nova conta de usuário.
Exibição de Pop-ups Animados

Utiliza o hook usePopUp.js para exibir mensagens animadas por um determinado período de tempo.
Configurações de Usuário

GET /settings: Exibe as preferências do usuário.
PUT /settings: Atualiza as configurações do usuário.

## Contribuindo
bash
Copiar código
git checkout -b feature/nome-feature

Commit suas alterações:
bash
Copiar código
git commit -am 'Adiciona nova feature'

Faça o push para a branch:
bash
Copiar código
git push origin feature/nome-feature
Crie um Pull Request.

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.