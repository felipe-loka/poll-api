# poll API

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

This project uses [pnpm](https://pnpm.io/) as the package manager, so this must be installed in your machine to start contributing to this project.

Several helpful scripts are present in the `package.json` file, such as: creating the infrastructure needed (MySQL database), running tests, running the code, build the code...

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
OTEL_COLLECTOR_URL=http://otel-collector:4318
```

Besides these environment variables (related to the application) some others need to be set (OpenTelemetry):

```shell
OTEL_SERVICE_NAME=poll-api
```

5. Setup database infrastructure
To set up the infrastructure the following steps are executed: MySQL Docker container is created, migrations are executed, the database is seeded, and the observability stack is created. To simplify all these steps a script was created for you, so you can simply run:

```
pnpm infra:up
```

We are using [dbmate](https://github.com/amacneil/dbmate), an agnostic tool used for database migration. For MySQL databases it expects the [DATABASE_URL](https://github.com/amacneil/dbmate#mysql)(https://github.com/amacneil/dbmate#mysql) environment variable to be set with the string URL used to connect to the database, that is why we are creating this environment variable in the `.env` file given above.

6. Run the code

You can run the code in a watch mode, which means the API will auto-refresh with new changes every time you modify and save any files, this helps you increase your productivity. You can run the API with the following script:

```
pnpm start:dev
```

If you want to use the observability stack (log, traces, metrics) you can't simply run locally, you will need to run the container version in the same network as all the other components (MySQL, Loki, Grafana, Tempo, Prometheus). So instead of running `pnpm start:dev` you can run the following:

```
pnpm container:up
```

Notice that it won't auto-refresh, so if you want to test your change you will need to:

```
pnpm container:down
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
pnpm container:down
```

## Database Modeling

![Database Modeling](/docs/database.png)

## User Requirements

This project fullfills the following requirements:

### Poll Creation

- Users should be able to create a poll and get a link to share with people
- Users can choose if the poll allows more than one choice in the same vote (multi choice poll)

### Poll Voting System
- Users should be able to vote in a given poll
- Users should be able to see the vote results of a given poll after voting

## Observability

It's being implemented a whole observability stack to monitor the application correctly.

- **Logs**: are being collected by [FluentBit](https://fluentbit.io/) and forwarded to [Loki](https://grafana.com/docs/loki/latest/).
- **Traces**: Traces are automatically generated (instrumentation) using OpenTelemetry and are collected by [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) and forwarded to [Tempo](https://grafana.com/oss/tempo/) using [OTLP protocol](https://opentelemetry.io/docs/specs/otel/protocol/) via HTTP requests

To fully test this locally you will need to build the local application using Docker. To make it easier a script was created and added in `package.json`, so you can simply run `pnpm container`

## Next Steps

The following requirements should be implemented in the next versions:

- Add observability to the application: metrics
- Add cache layer (e.g. Redis) to minimize latency time
- Validate the need to use a poll of connections to manage the connection to the database
