# SIS++ Webapp

## Overview

An overhaul of the course selection and enrollment system in RIT's Student Information System. Built using Java Spring Boot and React.js

For more details, refer to our [docs](docs/README.md)

## Setup and running

### Backend

#### Requirements

- Java 21
- Maven
- Current Postgres Instance

Open `application.properties` and modify the connection string

Run the following command: 

```
mvn spring-boot:run
```

### Frontend

#### Requirements

- Node.js (version 20 or newer)

Run the following commands:

```
npm install
npm run dev
```
