const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Testimonial, validateTestimonial } = require('../models/Testimonial');
const authenticateUser = require('../middleware/authenticateUser');

// route to post testimony after successful gh
router.post('/', authenticateUser, async (req, res) => {
  // validate the testimonial
  const { error } = validateTestimonial(req.body);
  if (error) return res.status(400).send();
  // get the user from the request body

  if (req.user && req.user.isVerified) {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId }).select(
      '_id username firstName lastName'
    );

    //  create a testionial document for that user
    const testimonial = new Testimonial({
      body: req.body.testimony,
      user
    });
    // save the testimonial
    await testimonial.save();
    // send a response to the user
    res.send({ success: 'Testimonial saved' });
  }
});

// Get all testimonials by date in descending order
router.get('/', async (req, res) => {
  const testimonials = await Testimonial.find().sort('-date');
  res.send({ testimonials });
});

module.exports = router;
