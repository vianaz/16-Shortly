<div align="center">
  <a>
    <img src="https://github.com/vianaz/16-Shortly/blob/main/imgs/twemoji_shorts.png" alt="Logo" width="100">
  </a>
    
[![wakatime](https://wakatime.com/badge/user/81a93aa8-8a08-415d-9a4d-3d47638f0e82/project/a2d5130f-fcd8-4b37-af99-f8f1768afff1.svg)](https://wakatime.com/badge/user/81a93aa8-8a08-415d-9a4d-3d47638f0e82/project/a2d5130f-fcd8-4b37-af99-f8f1768afff1)
  
  <h3 align="center">
     URL shortening API
  </h3>
    <br />
  
  <div align="center">

   ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
   ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
   ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
   ![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
   

  </div>
  
</div>
   
## Routes

  - [X] **POST** `/signup`
  - [X] **POST** `/signin`
  - [X] **POST** `/urls/shorten`
  - [X] **GET** `/urls/:id`
  - [X] **GET** `/urls/open/:shortUrl`
  - [X] **DELETE** `/urls/:id`
  - [X] **GET** `/users/:id`
  - [X] **GET** `/ranking`

## Requisitos

- Database
  - [X]  **Abuse do SQL!** Faça o mínimo possível de processamento no navegador.
  - [X]  Utilize o banco de dados Postgres.
  - [X]  Modele o banco de dados de acordo com a necessidade.
  - [X]  Use CONSTRAINS quando aplicável para garantir a lógica de negócio da aplicação.
  - [X]  Use um campo chamado `createdAt` para armazenar a data de criação das entidades.
- *Back-end*
  - [X]  Implemente o *back-end* da aplicação em **Node + Express** seguindo a arquitetura de *routes*, *controllers* e *middlewares*.
  - [X]  Dados sensíveis (como senhas) devem estar criptografadas.
  - [X]  Proteja sua aplicação contra ataques do tipo *SQL Injection*.
  - [X]  Faça *deploy* do *back-end* no Heroku (+ Heroku Postgres).

## ☑️ Bônus

  - [X]  Procure por *Repository Pattern* e aplique-o para gerenciar os acessos ao banco de dados.
  - [X]  Generalize a validação de *schemas* em um único *middleware*.
  - [ ]  Desenvolva o front-end da aplicação 
  - [ ]  Faça o deploy da aplicação na Vercel
