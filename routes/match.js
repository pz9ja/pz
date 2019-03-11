const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Users } = require('../models/user');
const { ph } = require('../models/ProvideHelp')


router('/match', async(req, res) => {

    // check if user is in ph table
    const Pher = await ph.findOne({ _id: req.body.id });
    if (!Pher) return res.status(404).send("The Phing user is not found");


})