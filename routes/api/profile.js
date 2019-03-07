const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validatorProfileInput = require('../../validation/profile');


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


router.get('/',
 passport.authenticate('jwt', {session: false}), 
    (req, res) => {
            const errors = {}
            
     Profile.findOne({ user: req.user.id })
     .populate('user', ['name', 'avatar'])
         .then(profile => {
            if (!profile) {
                errors.noprofile = 'there is no profile'
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))
});



//@route         post api/profile/profile
// @desc         create/edit user profile
//@access        Private

router.post('/',
 passport.authenticate('jwt', {session: false}), 
    (req, res) => {
        const { errors, isValid } = validatorProfileInput(req.body);
        // check that validation
        if(!isValid){
            // return any errors with 400 errors
            return res.status(400).json(errors)
        }

   // get fields
   const profileFields = {};
   profileFields.user = req.user.id;
   if(req.body.handle) profileFields.handle = req.body.handle;
   if(req.body.company) profileFields.company = req.body.company;
   if(req.body.website) profileFields.website = req.body.website;
   if(req.body.location) profileFields.location = req.body.lobio;
   if(req.body.bio) profileFields.bio = req.body.bio;
   if(req.body.status) profileFields.status = req.body.status;
   if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
   //skills split into array
   if(typeof req.body.skills !== 'undefined'){
       profileFields.skills = req.body.skills.split(',');
   } 
   //social
   profileFields.social = {};

   if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
   if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
   if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
   if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
   if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

   
   Profile.findOne({
           user: req.user.id
       })
       .then(profile => {
           if (profile) {
               Profile.findOneAndUpdate({
                       user: req.user.id
                   }, {
                       $set: profileFields
                   }, {
                       new: true
                   })
                   .then(profile => releaseEvents.json(profile));
               //update
               profile
           } else {
               //create

               // check to see if the handle exists
               Profile.findOne({ handle: profileFields.handle })
               .then(profile => {
                   if(profile) {
                       errors.handle = 'that handle already exists';
                       res.status(400).json(errors);
                   }
                   // save / create profile
                   new Profile(profileFields).save()
                   .then(profile => {
                       res.json(profile)
                   })
               });
           }
       });

   });




module.exports = router;