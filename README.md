# GRAPHQL API

A package that creates a simple GraphQL server template with [TypeScript](https://www.typescriptlang.org/), some schemas, authentication mode and token generation. The server will be hosted localy at `http://localhost:PORT/graphql`. Based on https://github.com/w3cj/create-express-api

# Environment and Tools

- [NodeJs](https://nodejs.org/en/) v14.16.0
- [TypeScript](https://www.typescriptlang.org/) v4.2.4
- [Git](https://git-scm.com/) v2.30.1.windows.1
- [npm](https://www.npmjs.com/) v7.6.0
- [Docker](https://www.docker.com/) v20.10.6
- [TypeORM](https://typeorm.io/#/) v0.2.32

# Steps to Run and Debug

- Run docker to create the databse image:

```
npm run docker
```

- To run the server in development mode for debug:

```
npm run dev
```

- To deploy the server and run:

```
npm run build
npm start
```

- To apply Lint pattern to clean the code:

```
npm run lint
```
