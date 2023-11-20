# Poll API

The code in this repository corresponds to an API responsible for managing a basic poll system.

## Stack

The code is written in Typescript using NodeJS as the JavaScript Runtime environment. The following packages are used in this project:

- [ExpressJS](https://expressjs.com/): Famous web framework used to build the API.
- [mysql2](https://github.com/sidorares/node-mysql2): MySQL driver used to connect to the MySQL database.
- [zod](https://zod.dev/): Schema validation tool to validate user input.
- [jest](https://jestjs.io): Testing framework used to test the application and guarantee it's working as expected.

Many other packages and tools were used to compose this project but the ones mentioned above are the most relevant ones.

## Architecture

The architecture of this project is simple: an API that uses MySQL as the database.

![Architecture](/docs/architecture.png)

## Getting Started

This project uses [pnpm](https://pnpm.io/) as the package manager, so this must be installed in your machine in order to start contributing to this project.

Several helpful script are present in the `package.json` file, such as: create the infrastructure needed (MySQL database), run tests, run locally the code, build the code...

A step-by-step guide on how to run this project is the following:

1. Clone this repository

2. [Install](https://pnpm.io/installation) `pnpm` package manager

3. Install all the packages

```
pnpm install
```

4. Set `.env` file

You can check all the environment variables in the `src/config/environments.ts` file. Here is an example of a valid `.env` file:

```shell
PORT=3000
NODE_ENV=development
DB_USERNAME=user
DB_PASSWORD=password123
DB_NAME=api
DB_HOST=localhost
DB_PORT=3306
DATABASE_URL=mysql://user:password123@localhost:3306/api
LOGGER_FILENAME=poll.log
```

5. Setup database infrastructure

In order to setup the infrastructure the following steps are executed: MySQL Docker container is created, migrations are execute, database is seeded, observability stack is created. In order to simplify all these steps a script was created for you, so you can simply run:

```
pnpm infra:up
```

We are using [dbmate](https://github.com/amacneil/dbmate), an agnostic tool used for database migration. For MySQL databases it expect the [DATABASE_URL](https://github.com/amacneil/dbmate#mysql) environment variable to be set with the string URL used to connect to the database, that is why we are creating this environment variable in the `.env` file given above.

6. Run the code

You can run the code in a watch mode, which means the API will auto-refresh with new changes everytime you modify and save any files, this helps you increase your productivity. You can run the API with the following script:

```
pnpm start:dev
```

7. Run tests

Always create tests for new features. The tests are not mocking the database, so it will run tests against the MySQL docker database created! For it to work perfectly it expects the database to be seeded!

```
pnpm test
```

8. Clean up

You can destroy all the created infrastructure with the following command:

```
pnpm infra:down
```

## Database Modeling

![Database Modeling](/docs/database.png)

## User Requirements

This project fullfills the following requirements:

### Poll Creation

- User should be able to create a poll and get a link to share with people
- User can choose if the poll allows more than one choice in the same vote (multi choice poll)

### Poll Voting System

- User should be able to vote in a given poll
- User should be able to see the vote results of a given poll after voting

## Observability

It's beeing implemented a whole observability stack to monitor the application correctly.

- **Logs**: are being collected by [FluentBit](https://fluentbit.io/) and forwarded to Loki.

In order to fully test this locally you will need to build the local application using Docker. To make it easier a script was created and added in `package.json`, so you can simply run `pnpm container`

## Next Steps

The following requirements should be implemented in next versions:

- Add observability to the application: metrics, traces
- Add cache layer (e.g. Redis) to minimize latency time
- Validate the need of using a pool of connections to manage the connection to the database
