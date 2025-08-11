# Sistema de Gerenciamento de Visitantes J.A.R.V.I.S.

## 1. Visão Geral do Produto
### Problema
A inteligência artificial J.A.R.V.I.S. da Stark Industries enfrenta dificuldades significativas no gerenciamento de tags de acesso e entrada de visitantes na Stark Tower, impactando a eficiência operacional e a segurança do edifício.
### Solução Proposta
Desenvolvimento de um sistema integrado de gerenciamento de visitantes que automatize processos, melhore a segurança e facilite as operações da J.A.R.V.I.S.

## 2. Funcionalidades Principais
### Requisitos Funcionais:
- [x] Cadastro de visitantes com dados obrigatórios (Nome, CPF, Sala destino, Data de nascimento, E-mail)
- [x] Validação automática de CPF
- [x] Limite máximo de 3 visitantes ativos por sala
- [x] Fila de espera 
- [x] Dashboard em tempo real de visitantes na torre
- [x] Localização por sala/andar
- [x] Status de entrada/saída
- [x] Tempo de permanência
- [x] Registro completo de entradas e saídas
- [x] Log de todas as ações do sistema
- [x] Autenticação

## 3. Funcionalidades Adicionais Propostas
### 3.1 App Mobile para Funcionários
#### Funcionalidade: Aplicativo para pré-cadastro e autorização de visitantes
- :memo: Cadastro antecipado de visitantes esperados
- :memo: Notificações de chegada
- :memo: Aprovação/rejeição de acesso


<hr/>

## 🎨 Layout
<img width="2798" height="1602" alt="Image" src="https://github.com/user-attachments/assets/847892ed-c8ec-4506-b13c-38b53ec44bb3" />
<img width="3828" height="1872" alt="Image" src="https://github.com/user-attachments/assets/dbf09cb8-3303-40d7-be1e-882f371e6444" />

<hr/>

# Deploy da Aplicação :dash:

>  <a href="https://jarvis-visitor-system.vercel.app/" target='_blank'>Link do deploy da aplicação<a/>

<hr/>

## 🚀 Tecnologias

- **React 19.1** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Superset JavaScript com tipagem estática
- **Next 15.4** - Framework para interface de usuário
- **TailwindCSS 3.3** - Framework CSS utility-first
- **react-hook-form/zod - Biblioteca de validacao de formulario
- **TanStack React Query 5.8** - Gerenciamento de estado servidor e cache
- **Radix UI** - Componentes primitivos acessíveis
- **Shadcn/ui** - Sistema de componentes
- **Lucide React** - Biblioteca de ícones

## 📂 Padrões de Projeto

- **Component-based Architecture** - Arquitetura baseada em componentes React
- **File-based Routing** - Roteamento baseado em arquivos com Nextjs
- **Server State Management** - Gerenciamento de estado servidor com React Query
- **Variant-based Components** - Componentes com variantes usando CVA
- **Composition Pattern** - Padrão de composição com Radix Slot
- **Path Aliasing** - Alias de caminhos (`@/` aponta para `src/`)

- ## ⚙️ Configuração do Projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) de preferência na versão 18 ou superior. 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação em `http://localhost:3000`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção

### Backend

O projeto consome uma API que deve estar rodando na porta 3333. Certifique-se de que o backend esteja configurado e executando antes de iniciar o frontend.

### Instruções

1. Clone o repositório []()

#### Passo a passo para rodar o servidor

```bash
# Instale as dependências:
$ npm install

# Na raiz do projeto crie o arquivo .env e depois copie e cole os dados que estão no arquivo .env.example

# Criar as tabelas: Execute no seu terminal
$ npx prisma migrate dev

# Visualizar o Banco de Dados: Execute no seu terminal
$ npx prisma studio

# Execute o servidor de desenvolvimento
$ npm run dev

$ em seguida [localhost:333](http://localhost:333)

# Baixe e instale o postman para simular os endpoints
# Importe a collection do postman e agora é só testar

OBS: Na raiz do projeto tem a collection para importar
```

Feito com horas em frente ao :computer: por [Mouzinho Feliz Raimundo](https://www.linkedin.com/in/mouzinho-raimundo/)
