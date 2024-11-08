# API Breno Tadeu
está API é básicamente um trabalho acadêmico, feito por mim mesmo, aonde é possível efetuar uma busca de endereços em uma database na nuvem
## .env
básicamente, eu utilizei o .gitignore para proibir o arquivo de vir para o repósitorio
#### Variáveis Ambientes
eu utilizei apenas duas variáveis ambientes, para poder ter segurança na minha aplicação
##
foram:
``PORT=*****``
``DATABASE_URL=*****``
##
a PORT é aonde está definido a minha porta, e a database_url é aonde está o link do banco de dados que já está na nuvem
## Banco de Dados
o banco de dados é bem simples
````
    CREATE TABLE endereco(
    id serial primary key,
    cep char(8),
    rua varchar(100),
    cidade varchar(100),
    estado varchar(2),
    enderecoCompleto varchar(600) GENERATED ALWAYS AS
        (rua || ', ' || bairro || ', ' || cidade || '-' || estado || ', ' || cep)
    );
````
## Iniciando a API
inicando com o 
 ``npm install`` para instalar todas as dependências que utilizei na api, e o ``npm run start`` ou ``node app.js`` para iniciar o servidor
## POST
o POST no projeto, é para poder inserir novos endereços na database, só utilizar a rota ``https://apiinfo.onrender.com/api/inserirCep``
````
{
    "cep": "",
    "rua": "",
    "bairro": "",
    "cidade": "",
    "estado": ""
}
````
para efetuar o post é só adicionar os dados no qual desejado, e pronto
## GET
o GET, eu utilizei em 3 endpoints o primeiro é o a busca de endereço por cep para isso use a URL``https://apiinfo.onrender.com/api/buscarCep/03000000``
````
{
  "id": 6,
  "enderecocompleto": "Rua dos Três Irmãos, Vila Prudente, São Paulo - SP,03000000"
}
````
o resultado vai ser esse
###
a outra rota GET que eu utilizei foi a de buscar por id, que no qual a é URL``https://apiinfo.onrender.com/api/buscarPorid/7``
````
{
  "id": 7,
  "cep": "04000000",
  "rua": "Avenida Ibirapuera",
  "bairro": "Moema",
  "cidade": "São Paulo",
  "estado": "SP",
  "enderecocompleto": "Avenida Ibirapuera, Moema, São Paulo - SP,04000000"
}
````
com esse ele trás todos os campos, não apenas o o enderecoCompleto
###
a outra rota GET que fiz foi uma de filtro, aonde aparece apenas os endereços da cidade que for digitada utilizando o query parameter, é só digitar a URL``https://apiinfo.onrender.com/api/filtrarPorCidade?cidade=Salvador``
````
[
  {
    "id": 19,
    "enderecocompleto": "Rua dos Sonhos, Jardim Botânico, Salvador - BA,25000000"
  },
  {
    "id": 20,
    "enderecocompleto": "Avenida São Paulo, Jardim Paulista, Salvador - BA,26000000"
  },
  {
    "id": 21,
    "enderecocompleto": "Rua do Sol, Vila Prudente, Salvador - BA,27000000"
  },
  {
    "id": 22,
    "enderecocompleto": "Avenida Liberdade, Mooca, Salvador - BA,28000000"
  },
  {
    "id": 23,
    "enderecocompleto": "Rua das Acácias, Vila Mariana, Salvador - BA,29000000"
  }
]

````
assim o filtro sendo realizado
## UPDATE
o UPDATE, apenas realiza a troca de informações quase precise, basta escolher o id na URL``http://apiinfo.onrender.com/api/updateEndereco/4``
com o campo que você quer, e o dado que você quer alterar
````
{
    "campo" : "Cidade",
    "valor" : "Aruja"
}

````
assim realizando o update

## DELETE
DELETE, apenas para apagar um endereço na base de dados com a URL``http://apiinfo.onrender.com/api/deleteEndereco/2``
