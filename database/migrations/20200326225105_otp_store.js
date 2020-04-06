exports.up = (knex) =>
	knex.schema.createTable('temp_otp', (table) => {
		table.increments();
		table.string('number').notNullable();
		table.string('otp').notNullable();
		table.timestamps(false, true);
	});

exports.down = (knex) => knex.schema.dropTable('temp_otp');
