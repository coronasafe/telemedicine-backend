exports.up = (knex) =>
	knex.schema.createTable('call_scheduler', (table) => {
		table.increments().primary();
		table.string('user_id').notNullable();
		table.string('user_number');
		table
			.enu('status', [
				'not_attended',
				'attending_by_volunteer',
				'forwarded_to_doctor',
				'closed_by_volunteer',
				'attending_by_doctor',
				'closed_by_doctor',
			])
			.defaultTo('not_attended');
		table.string('volunteer_id');
		table.string('volunteer_name');
		table.string('doctor_id');
		table.boolean('completed').defaultTo(false);
		table.timestamps(false, true);
	});

exports.down = (knex) => knex.schema.dropTable('call_scheduler');
