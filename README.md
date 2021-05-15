# GRAPHQL API

A package that creates a simple GraphQL server template with [TypeScript](https://www.typescriptlang.org/), some schemas, authentication mode and token generation. The server will be hosted localy at `http://localhost:PORT/graphql`.

Based on https://github.com/w3cj/create-express-api.

# Environment and Tools

- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [TypeORM](https://typeorm.io/#/)
- [ApolloServer](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)

# Steps to Run and Debug

Create `.env` file and set the environment variables following the `.samples.env` pattern.

Install dependencies

```
$ npm install
```

Run docker to setup the database:

```
$ npm run docker
```

To debug, run:

```
$ npm run dev
```

To deploy the server and run:

```
$ npm run build
$ npm start
```

To apply Lint pattern to clean the code:

```
$ npm run lint
```
