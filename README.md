# Software Integrators - Todo List

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

This project is part of the Software Integrators' hiring process.

## Requirements

- Angular 19.2.5
- Node.js >= 20.9.0

May it's working with other versions, but it's not tested.

## Setup
Please install the dependencies

```bash
npm install
```

## Running the project

### With Mock API
To start a local development server with a mock API, run:

```bash
npm run start
```

### Without Mock API
Note: It's necessary point an API endpoint at .env file.

```bash
ng serve
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Mock API
A mock API is provided by [json-server](https://github.com/typicode/json-server) and is available at `http://localhost:3333/`.

### API Data Base
👉 [root]/data/db.json

### For more realistic experience, was added a delay of 2 second to all requests.
👉 [root]/app/services/api.service.ts
