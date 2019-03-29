import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import {createProfile, getCurrentProfile} from '../../actions/profileActions';
import {withRouter, Link} from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';
import CreateProfile from '../create-profile/CreateProfile';


class EditProfile extends Component {
  state = {
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}

  }

  componentDidMount() {
      this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
          this.setState({errors: nextProps.errors})
      } 
       if(nextProps.profile.profile) {
        const profile = nextProps.profile.profile;

        //Bring skills array back to a string
        const skillsCSV = profile.skills.join(',');

        // if profile field doesnt exist, make epmty string
        profile.company = !isEmpty(profile.company) ? profile.company : '';
        profile.website = !isEmpty(profile.website) ? profile.website : '';
        profile.location = !isEmpty(profile.location) ? profile.location : '';
        profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
        profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
        profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
        profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
        profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
        profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';


        // set component feilds state
        this.setState({
            handle: profile.handle,
            company:  profile.company,
            website:  profile.website,
            location:  profile.location,
            status:  profile.status,
            skills:  skillsCSV,
            githubusername:  profile.githubusername,
            bio:  profile.bio,
            twitter:  profile.twitter,
            facebook:  profile.facebook,
            linkedin:  profile.linkedin,
            youtube:  profile.youtube,
            instagram:  profile.instagram
           
        })
       }
  }

  onChange = (e) => {
    

    this.setState({ [e.target.name]: e.target.value})
        
   
  }

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        linkedin: this.state.linkedin,
        youtube: this.state.youtube,
        instagram: this.state.instagram,
    }
    this.props.createProfile(profileData, this.props.history)
}
    render() {
        const {errors, displaySocialInputs } = this.state;

        let socialInputs;

        if(displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onchange}
                    error={errors.twitter}
                    />
                    <InputGroup
                    placeholder="facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onchange}
                    error={errors.facebook}
                    />
                    <InputGroup
                    placeholder="instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onchange}
                    error={errors.instagram}
                    />
                    <InputGroup
                    placeholder="youtube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onchange}
                    error={errors.youtube}
                    />
                     <InputGroup
                    placeholder="linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onchange}
                    error={errors.linkedin}
                    />
                </div>
            )
        }

        
        //select options for status
        const options = [
            {label: '*Select Professional Status', value: 0},
            {label: 'Developer', value: 'Developer'},
            {label: 'Junior Developer', value: 'Junior Developer'},
            {label: 'Senior Developer', value: 'Senior Developer'},
            {label: 'Manager', value: 'Manager'},
            {label: 'Student or Learning', value: 'Student or Learning'},
            {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
            {label: 'Intern', value: 'Developer'},
            {label: 'Other', value: 'Other'}
        ]
    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8-auto">
                <Link to="/dashboard" className="btn btn-light">
                        Go Back
                    </Link>
                    <h1 className="display-4 text-center">Edit Your Profile</h1>
                         <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="a unique handle for your profile URL. Your full name, company name. nickname"
                                />
                                  <SelectListGroup
                                placeholder="* Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                options={options}
                                error={errors.status}
                                info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Could be your own Company or one you work for"
                                />
                                <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="Where are you from"
                                />
                                <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use a comma separated values (eg. HTML,CSS,JAVA)"
                                />
                                <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="If you want your latest reps and a github link, please include your github username"
                                />
                                <TextAreaGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us a little about your self"
                                />
                                <div className="mb-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                    this.setState(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }));
                                    }}
                                    className="btn btn-light">
                                    Add Social Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>

                            </form>
                </div>
            </div>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
profile: state.profile,
errors: state.errors
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(
    withRouter(EditProfile))