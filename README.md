# API-Vendas-RestNodeTypescript

Api de cadastro e venda de produtos para estudo de Back-end em NodeJS com Typescrit.

Atenção: Tutorial sobre construção. Caso tenha problema em alguma etapa, favor [entrar em contato](https://github.com/mestrearty/API-Vendas-RestNodeTypescript/issues/new).

## Executando a aplicação de forma local

Certifique-se que tenha o [node](https://nodejs.org/pt-br/download/current) instalado
Após clonar a aplicação para o seu repositório, instale as dependências:
```bash
$ yarn
```

Crie um banco de dados Postgres em um docker e execute
```bash
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Se por um acaso a aplicação não conseguir autenticar com o banco de dados, force a alteração de senha. No docker digite: 
```bash
$ su - postgres
$ psql
$ \password postgres
```
Insira duas vezes a senha default da aplicação: **123456**

Com um banco de dados Postgres rodando utilize as migrações do TypeORM para criar a database "apivendas" e suas tabelas:

```bash
$ yarn typeorm migration:run
```

Crie um docker para executar o Redis para que a API trabalhe com Cache
```bash
$ docker run --name redis -p 6379:6379 -d -t redis:alpine
$ docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest
```

Na pasta raiz inicie a aplicação:
```bash
$ yarn dev
```

## Testar a API com Postman
Para poder testar a API você poderá utilizar o Postman, uma ferramenta para simulação de requisições.

Pensando em te deixar feliz, fiz uma coleção já no esquema para você utilizar, basta [clicar aqui](https://www.postman.com/mestrearty/workspace/api-vendas-rest-node-typescript-mockuptest/) ou acessar: https://www.postman.com/mestrearty/workspace/api-vendas-rest-node-typescript-mockuptest/

Será necessário que baixe a versão de Desktop. Postman não permite que acesse o *localhost* direto do navegador.

### Variáveis
A coleção já vem pré-configurada com variáveis globais e scripts para facilitar a execução e teste.
Para verificar ou alterar algum parâmetro vá em ["Enviroments > Globals"](https://www.postman.com/mestrearty/workspace/api-vendas-rest-node-typescript-mockuptest/globals) 

Você encontrará a variável **urlBase**, que já está preconfigurada com o localhost:porta. Caso altere o valor padrão da API, certifique-se de alterar no **urlBase** também.

Nenhum outro parâmetro é necessário auteração. Todos são pegos automaticamente durante a execução das rotas no postman por meio de scripts na aba "Tests" de cada janela de requisição do postman. Mas sinta-se livre para alterar valores e testar como a API contorna erros e omissão de campos.

Além disso, todos os campos já foram preenchidos para teste rápido, mas fique a vontade para brincar e armazenar como preferir.

### Coleções
Uma vez baixado o Postman e puxado aberto a coleção no aplicativo desktok você encontrará a seguinte estrutura de pastas:

```
> Clientes
> Pedidos de Produtos
> Perfil
> Produto
> Senha
> Usuário
```

Para começar crie um usuário em [Usuário>Criar](https://www.postman.com/mestrearty/workspace/api-vendas-rest-node-typescript-mockuptest/request/10275130-fb4bb3b1-8b68-4d02-92cc-c30915491bbc).

Depois do usuário criado faça o login em [Usuário>Iniciar Sessão](https://www.postman.com/mestrearty/workspace/api-vendas-rest-node-typescript-mockuptest/request/10275130-fb4bb3b1-8b68-4d02-92cc-c30915491bbc)

E pronto, Postman já está configurado para que você possa realizar as demais requisições, com um usuário cadastrado e token JWT com validade de 2 horas registrada na variável global da ferramenta.

Lembre-se de sempre utilizar primeiro as rotas "Post" com nomes "Criar" de cada pasta para criar o que retornar 🤡. Ou não, vai que você quer ver o que acontece...

🍌 Antes que me esqueça, crie 2 produtos para que seja possível [fazer um pedido](https://www.postman.com/mestrearty/workspace/api-vendas-rest-node-typescript-mockuptest/request/10275130-2c0aca39-6ad2-4d71-8df5-24ae588633bc), ou altere o body removendo:

```json
{
    "id": "{{oldProductId}}",
    "quantity": 3
}
```


### Verificando cache
Para verificar se o cache está sendo armazenado, pelo terminal acesso o container:
```bash
$ docker exec -it redis sh
$ redis-cli
$ get api-vendas-PRODUCT_LIST
```
Após utilizar um método *get* para retornar uma lista de produtos, você receber de resposta a lista dos produtos armazenados na chache.

Obrigado pela sua atenção e interesse!🦙
