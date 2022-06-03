
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 32769,
      user : 'root',
      password : 'root',
      database : 'mydb'
    }
  });


    knex.schema.createTableIfNotExists('history', (table) => {
        table.increments('id').primary();
        table.bigint('gross').notNullable();
        table.integer('dependent').notNullable();
        table.integer('area').notNullable();
        table.bigint('net').notNullable();
    })
    .then(async () => {
      const count = await knex.select().table("history");
      if (count.length == 0) {
        knex("history")
          .insert([
            {
                gross: 14000000,
                dependent: 0,
                area: 1,
                net: 12453500
            },
            {
                gross: 16000000,
                dependent: 0,
                area: 2,
                net: 14154000
            },
            {
                gross: 140000000,
                dependent: 0,
                area: 1,
                net: 102285250
            },
            {
                gross: 200000000,
                dependent: 3,
                area: 2,
                net: 145970250
            },
            {
                gross: 60000000,
                dependent: 1,
                area: 1,
                net: 49526750
            },
            {
                gross: 180000000,
                dependent: 0,
                area: 1,
                net: 128285250
            },
            {
                gross: 130000000,
                dependent: 0,
                area: 1,
                net: 95785250
            },
          ])
          .then(() => {
              console.log("Seed data Successful !");
          });
      }
    });
