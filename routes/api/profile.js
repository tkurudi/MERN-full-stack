const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// load profile model
const Profile = require('../../models/Profile');
// load user model
const User = require('../../models/User');

//@route         GET api/profile/test
// @desc         tests post route
//@access        Public

router.get('/test' , (req, res) => res.json({msg: "profile works"}));

//@route         GET api/profile/profile
// @desc         get current users profile
//@access        Private

router.get('/', passport.authenticate('jwt', {session: false}), (res, req) => {
            const errors = {}
            console.log(user)
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'there is no profile'
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))
});

module.exports = router;