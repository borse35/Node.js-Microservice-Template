# Sample Nodejs Server

```
Notes:
1. Remove mongo package is not needed i.e. mongoose
2. Remove postgres package is not needed i.e. sequelize, pg, pg-hstore
3. Remove redis package is not needed i.e. ioredis
4. Remove all files that have this comment in them "Example file, delete later"
```

## Postgres
Read about Migrations [here](https://sequelize.org/master/manual/migrations.html). 

Examples:

```
sequelize db:migrate                        Run pending migrations
sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
sequelize db:migrate:status                 List the status of all migrations
sequelize db:migrate:undo                   Reverts a migration
sequelize db:migrate:undo:all               Revert all migrations ran
sequelize db:seed                           Run specified seeder
sequelize db:seed:undo                      Deletes data from the database
sequelize db:seed:all                       Run every seeder
sequelize db:seed:undo:all                  Deletes data from the database
sequelize db:create                         Create database specified by configuration
sequelize db:drop                           Drop database specified by configuration
sequelize init                              Initializes project
sequelize init:config                       Initializes configuration
sequelize init:migrations                   Initializes migrations
sequelize init:models                       Initializes models
sequelize init:seeders                      Initializes seeders
sequelize migration:generate                Generates a new migration file      [aliases: migration:create]
sequelize model:generate                    Generates a model and its migration [aliases: model:create]
sequelize seed:generate                     Generates a new seed file           [aliases: seed:create]


// e.g. create model and migration together
sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```

