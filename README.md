# ✂️ KtSnip - Encurtador de URLs

Um encurtador de URLs rápido, moderno e eficiente, desenvolvido com foco em arquitetura limpa, performance e padrão MVC.

## 🚀 Funcionalidades

- Encurtamento de URLs: Transforme links longos e complexos em URLs curtas e amigáveis.
- Slugs Personalizados: Escolha o seu próprio nome para o link (ex: meu-github). Se não for fornecido, um código aleatório é gerado automaticamente.
- Redirecionamento Rápido: Redirecionamento HTTP nativo para a URL original de destino ao acessar o link curto.
- Rastreamento de Cliques: O sistema contabiliza automaticamente a quantidade de acessos/cliques que cada link curto recebe no banco de dados.
- Interface Web Integrada: Interface visual simples e direta servida no próprio backend utilizando o padrão MVC (Handlebars).
- Validação de Dados: Prevenção contra a criação de slugs duplicados (ConflictException) e validação rigorosa de URLs de entrada.

## 🛠️ Tecnologias Utilizadas

- Node.js & NestJS: Framework Node.js progressivo para construção de aplicações backend organizadas e escaláveis.
- Prisma ORM (v7.8.0): ORM moderno para comunicação com o banco de dados.
- SQLite: Banco de dados relacional (SQL) embutido, perfeito para rodar localmente sem servidores externos.
- TypeScript: Tipagem estática forte para um código mais seguro.
- Handlebars (hbs): Motor de templates para renderização da interface web (Views).
- class-validator & class-transformer: Bibliotecas utilizadas para validação do corpo das requisições via Pipes.

## 💻 Como Instalar e Rodar o Projeto

Siga os passos abaixo para rodar o KtSnip na sua máquina local:

### 1. Clonar o Repositório
git clone https://github.com/kevyntargino/KtSnip.git
cd KtSnip

### 2. Instalar as Dependências
Execute os comandos abaixo para instalar os pacotes essenciais do projeto:
npm install
npm install class-validator
npm install class-transformer
npm install prisma --save-dev
npm install @prisma/client

### 3. Configurar as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione a URL de conexão para o seu banco de dados SQLite local:
DATABASE_URL="file:./dev.db"

### 4. Configurar o Banco de Dados (Prisma)
Gere a estrutura da tabela no SQLite e crie a tipagem dinâmica do Prisma Client executando os comandos:
npx prisma generate
npx prisma migrate dev --name init_url_table

### 5. Iniciar o Servidor
Com a infraestrutura de dados pronta, inicie a aplicação em modo de desenvolvimento (watch mode):
npm run start:dev

### 6. Acessar a Aplicação
Abra o seu navegador e acesse a interface web em:
http://localhost:3000/

Você também pode testar as requisições na API via Postman ou Insomnia enviando um POST para http://localhost:3000/shorten com o seguinte corpo JSON:
{
  "originalUrl": "https://sua-url-gigante.com",
  "slug": "meu-slug-personalizado"
}

---

## 👨‍💻 Autor

Desenvolvido com ☕ e código por Kevyn Targino.
