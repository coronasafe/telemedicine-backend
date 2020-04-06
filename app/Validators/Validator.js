import Joi from '@hapi/joi';

export default {
	user: {
		verify: Joi.object().keys({
			number: Joi.string().required(),
			otp: Joi.number().integer().required(),
		}),
		update: Joi.object().keys({
			local_body_object: Joi.object().keys({
				name: Joi.string().required(),
				body_type: Joi.number().integer(),
				localbody_code: Joi.string().required(),
				district: Joi.number().integer(),
			}),
			age_relative: Joi.number(),
			no_of_people: Joi.number().integer(),
			district_object: Joi.object().keys({
				name: Joi.string().required(),
				state: Joi.number().required(),
			}),
			state_object: Joi.object().keys({
				name: Joi.string().required(),
			}),
			medical_history: Joi.object(),
			number_of_aged_dependents: Joi.number(),
			number_of_chronic_diseased_dependents: Joi.number(),
			name: Joi.string().required(),
			age: Joi.number().integer(),
			gender: Joi.number().integer(),
			contact_with_confirmed_carrier: Joi.boolean(),
			contact_with_suspected_carrier: Joi.boolean(),
			estimated_contact_date: Joi.string().allow('').optional(),
			past_travel: Joi.boolean(),
			has_SARI: Joi.boolean(),
			countries_travelled: Joi.string().allow('').optional(),
			phone_number: Joi.string().required(),
			contact_with_carrier: Joi.boolean(),
			is_active: Joi.boolean(),
			local_body: Joi.number().integer(),
			district: Joi.number().integer(),
			state: Joi.number().integer(),
			primary: Joi.boolean(),
		}),
		call: Joi.object().keys({
			id: Joi.number().required(),
			parentId: Joi.string(),
		}),
	},

	questions: {
		create: Joi.object().keys({
			questionId: Joi.number().integer().required(),
			question: Joi.string().required(),
			type: Joi.string().required(),
			answers: Joi.object(),
			language: Joi.string().required(),
		}),
	},

	answers: {
		submit: Joi.object().keys({
			id: Joi.number().required(),
			answers: Joi.object().required(),
			score: Joi.number(),
		}),
	},

	doctors: {
		insert: Joi.object().keys({
			name: Joi.string().required(),
			phone: Joi.string().required(),
		}),
		update: Joi.object().keys({
			status: Joi.string().valid(
				'attending_by_volunteer',
				'forwarded_to_doctor',
				'closed_by_volunteer',
				'attending_by_doctor',
				'closed_by_doctor',
			),
			request_id: Joi.string(),
			userId: Joi.string(),
			userNumber: Joi.string(),
		}),
		signup: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			phone_number: Joi.string().required(),
			password: Joi.string().required(),
			district: Joi.string().required(),
			doctor: Joi.boolean().required(),
		}),
		login: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}),
		consult: Joi.object().keys({
			symptoms: Joi.array(),
			suggestion_text: Joi.string().valid(
				'HOME ISOLATION',
				'ADMISSION',
				'REFERRAL',
			),
			category: Joi.string().valid(
				'Category-A',
				'Category-B',
				'Category-C',
				'UNCLASSIFIED',
			),
			other_symptoms: Joi.string(),
			symptoms_onset_date: Joi.string(),
			examination_details: Joi.string(),
			existing_medication: Joi.string(),
			prescribed_medication: Joi.string(),
			suggestion: Joi.string().valid('HI', 'A', 'R'),
			patient: Joi.number(),
			facility: Joi.number(),
			admitted: Joi.boolean(),
			admitted_to: Joi.string().valid(
				'Not admitted',
				'Isolation Room',
				'ICU',
				'ICU with Ventilator',
			),
		}),
	},
};
