const mongoose = require('mongoose');
const Joi = require('joi');
const { userSchema } = require('./Referral');
const moment = require('moment');

const testimonialSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    maxlength: 50
  },
  date: {
    type: Date,
    default: moment.now()
  },
  user: {
    type: userSchema,
    required: true
  }
});

const Testimonial = mongoose.model('testimonial', testimonialSchema);

function validateTestimonial(testimony) {
  const Schema = {
    testimony: Joi.string()
      .required()
      .max(50)
      .trim()
  };

  return Joi.validate(testimony, Schema);
}

module.exports = { Testimonial, validateTestimonial };
