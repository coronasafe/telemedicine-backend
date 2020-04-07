exports.up = (knex) =>
	knex.schema.createTable('answers', (table) => {
		table.integer('id').notNullable();
		table.string('parent_id').notNullable();
		table.json('answers');
		table.integer('score');
		table.enu('priority', ['LOW', 'MEDIUM', 'HIGH']);
		table.index(['id'], 'safeId');
		table.timestamps(false, true);
	});

exports.down = (knex) => knex.schema.dropTable('answers');
