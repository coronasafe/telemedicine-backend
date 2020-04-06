exports.up = (knex) => knex.schema.createTable('doctors', (table) => {
  table.increments();
  table.string('password').notNullable();
  table.string('name');
  table.string('email').unique();
  table.string('district');
  table.string('phone_number');
  table.boolean('doctor');
  table.timestamps(false, true);
});

exports.down = (knex) => knex.schema.dropTable('doctors');
