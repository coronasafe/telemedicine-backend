exports.up = (knex) => knex.schema.createTable('user_profile', (table) => {
  table.integer('id').notNullable();
  table.integer('local_body');
  table.string('district');
  table.integer('state');
  table.string('phone_number');
  table.boolean('primary');
  table.timestamps(false, true);
  table.dateTime('deleted_at');
  table.index(['id'], 'parentId');
});

exports.down = (knex) => knex.schema.dropTable('user_profile');
