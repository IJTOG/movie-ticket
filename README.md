## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Run database migration

```bash
$ npm run typeorm migration:run
```

## Running the app

# run start db, seeding, development

```bash
# to run all script below at once, run this script.
$ zsh run.zsh

# start database
$ docker-compose up -d

# seed data
$ npm run db:seed

# development watch mode
$ npm run dev

# or production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## To run generate migration

$ npm run typeorm migration:generate .\src\db\migrations\{NAME}
