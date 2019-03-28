const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validatorProfileInput = require('../../validation/profile');
const validatorExperienceInput = require('../../validation/experience');
const validatorEducationInput = require('../../validation/education');

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
//@route         post api/profile/all
// @desc         get ALL profiles
//@access        public

router.get('/all', (req, res) => {
    const errors = {}
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'there are no profile'
                return res.status(404).json(errors)
            }
            res.json(profiles);
        })

        .catch(err => res.status(404).json({
            msg: 'there are no profiles'
        }))
})




//@route         post api/handle/handle
// @desc         get profile by handle
//@access        public


router.get('/handle/:handle', (req, res) => {
    const errors = {}
    Profile.findOne({ handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'there is no profile for this user'
            res.status(404).json(errors)
        }
        res.json(profile);
})
    .catch(err => res.status(404).json(err))

});


//@route         post api/profile/user/:user_id
// @desc         get profile by user id
//@access        public


router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'there is no profile for this user'
            res.status(404).json(errors)
        }
        res.json(profile);
})
    .catch(err => res.status(404).json({msg: 'there is no profile for this id'}))

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
                   .then(profile => res.json(profile));
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


//@route         post api/profile/experience
// @desc         add experience to a profile
//@access        public

router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatorExperienceInput(req.body);

    //check errors
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id})
.then(profile => {
    const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
    }

    // add to exp array,

    profile.experience.unshift(newExp);

    profile.save()
    .then(profile => res.json(profile))
})



});

//@route         post api/profile/education 
// @desc         add education to a profile
//@access        private


router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatorEducationInput(req.body);

    //check errors
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id})
    .then(profile => {
    const newEduc = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
    }

    // add to exp array,

    profile.education.unshift(newEduc);

    profile.save()
    .then(profile => res.json(profile))
})

});

//@route         DELETE api/profile/experience/:exp_id 
// @desc         delete exp from profile
//@access        private


router.delete('/experience/:exp_id',
 passport.authenticate('jwt', { session: false }), (req, res) => {
   
    Profile.findOne({ user: req.user.id})
.then(profile => {
   // get remove index
   const removeIndex = profile.experience
   .map(item => item.id)
   .indexOF(req.params.exp_id);

   // spice out of PropTypes.array,
   profile.experience.splice(removeIndex, 1);

   //save

   profile.save().then(profile => res.json(profile))
})
.catch(err => res.status(404).json({msg: 'error'}))


});
//@route         DELETE api/profile/experience/:exp_id 
// @desc         delete exp from profile
//@access        private


router.delete('/education/:educ_id',
 passport.authenticate('jwt', { session: false }), (req, res) => {
   
    Profile.findOne({ user: req.user.id})
.then(profile => {
   // get remove index
   const removeIndex = profile.education
   .map(item => item.id)
   .indexOF(req.params.educ_id);

   // spice out of PropTypes.array,
   profile.education.splice(removeIndex, 1);

   //save

   profile.save().then(profile => res.json(profile))
})
.catch(err => res.status(404).json({msg: 'error'}))


});

router.delete('/',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
   Profile.findOneAndDelete({ user: req.user.id})
   .then(() => {
       User.findOneAndDelete({_id: req.user.id})
       .then(() => res.json({ success: true}))
   } )


});
router.delete('/',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
   Profile.findOneAndDelete({ user: req.user.id})
   .then(() => {
       User.findOneAndDelete({_id: req.user.id})
       .then(() => res.json({ success: true}))
   } )


});

module.exports = router;