# Attack Capital - Backend

Blog Backend

## Deployment Instructions

- Node version - 14.19.0

- MongoDB version - 4.4

- MONGODB_URL - `mongodb://kabata:0PGg4eYARrCla0UHhN0@mongo.openxcell.dev:27017/?authSource=admin`


After proper installation run the below commands in the same order as given below:

```bash
   npm install
```
```bash
   npm start
```

## Run Locally

If, you do not have VSCode, MongoDB or Mongo-Compass  installed follow these steps and after the requirements are met follow the above mentioned steps.

- Download and setup [VSCode](https://code.visualstudio.com/download).

- Download and Install [NodeJs](https://nodejs.org/en/download/) version (14.19.0).

- Download and Install MongoDB version (4.4) from [here.](https://www.mongodb.com/try/download/community)

- Download and Install MongoDB Compass version from [here.](https://www.mongodb.com/try/download/compass)



Download and extract the project in your project directory or,

Clone the project in your preferred folder from git CLI using

```bash
    cd your_project_folder
```
```bash
    git clone project_url
```

Install dependencies

```bash
   npm install
```
## Environment Variables

Now create a new database.

When cloned/downloaded the project, you will need to create a `.env` and change the following environment variables to run this project.

For this simply, copy and paste and rename `.env.development` to `.env` in your project folder.

> Note - Do not replace `.env.development`

Now, in your `.env` locate and change the

`DATABASE_NAME = kabata`
`MONGODB_URL = mongodb://127.0.0.1:27017/?authSource=admin`

> Note - Write name of your DB which you created in `mongo-compass`

After saving your changes, in your command prompt run the following commands to start the project on your local server,

```bash
   npm start
```

## Tech Stack

**Framework** - NodeJs, ExpressJs

**DATABASE** - MONGODB
