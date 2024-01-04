# Rick & Morty App

## Introdução

Este projeto é um Single Page Application (SPA) desenvolvido em Angular, que consome a API Rick & Morty para exibir informações sobre personagens, episódios e locais da série.

## Configuração do Ambiente

Certifique-se de ter o [Node.js](https://nodejs.org/en/download) e [Angular CLI](https://angular.io/cli) instalados. Clone o repositório e instale as dependências:

```bash
git clone https://github.com/briteira/rick-morty-app.git
cd rick-morty-app
npm install
```

## Executar o projeto
```bash
ng serve
```

## Build
```bash
ng build
```

## Executar testes
```bash
ng test
```

## Login
Para acessar o sistema, podem ser utilizados os seguintes dados de acesso:
- Usuário: usuario1@example.com | Senha: 123456
- Usuário: usuario2@example.com | Senha: 123456
- Usuário: usuario3@example.com | Senha: 123456

## Tecnologias Utilizadas
- Angular 16
- bootstrap 5.2.3
- NgBootstrap 11.0.2 
- MaterialIcons 1.13.12 - Ícones utilizados em todo o sistema (menu lateral, barra superior, barra de busca etc.)
- ngx-toastr 18.0.0  - Utilizado para notificar usuário na página de login quando houver inconsistências no formulário
- ngx-translate/core 15.0.0 - Utilizado para alternar entre os idiomas da aplicação
- ngx-translate/http-loader 8.0.0 - Utilizado para alternar entre os idiomas da aplicação

## Páginas
- Personagens (Lista e detalhes)
- Episódios (Lista e detalhes)
- Locais (Lista e detalhes)
- Perfil (Detalhes)

As listas contém uma barra de busca através do nome (filtro padrão entre as listas) e ao lado um botão para acessar filtros adicionais, como por exemplo o status ou gênero do personagem.

Todas as listas carregam mais dados com scroll infinito.

É possível alternar o idioma entre portugûes e inglês para todas as páginas, clicando no ícone de idioma no header.

O layout é responsivo, portanto irá se adequar em todos os tamanhos de tela.

As rotas estão protegidas, portanto só é possível acessá-las após realizar o login.


## Contato

Gustavo Albino de Brito

gustavoint_12@hotmail.com