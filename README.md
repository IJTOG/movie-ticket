## Description

This is a example project, movie ticket service.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# to run all script below at once, run this script for macos.
$ zsh run.zsh

# start database
$ docker-compose up -d

# Run database migration
$ npm run typeorm migration:run

# seed data to database
$ npm run db:seed

# development watch mode
$ npm run dev
# or production mode
$ npm run start:prod
```

## API documentation

go to http://localhost:3000/swagger

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run generate migration

$ npm run typeorm migration:generate .\src\db\migrations\{NAME}
