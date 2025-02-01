# Project setup
Install dependencies:

$ npm install
Prisma setup:
Before running the application, ensure your local database is set up. You need to install Prisma and generate the client.

# Install Prisma dependencies:

$ npm install @prisma/client
$ npx prisma init
This will create a prisma folder with a schema.prisma file.

Update the DATABASE_URL in the .env file to point to your local database or any environment you are using.
Example .env for a local SQLite setup:

DATABASE_URL="file:./dev.db"
Run Prisma migrations:
If you've made changes to the Prisma schema (e.g., new models, updates), run the following command to create and apply migrations:

# Create a migration
$ npx prisma migrate dev --name init

# Apply migrations
$ npx prisma migrate deploy
Generate Prisma client (if needed):
After applying migrations, generate the Prisma client:


$ npx prisma generate
This will generate the Prisma client based on your schema.

Compile and run the project

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod