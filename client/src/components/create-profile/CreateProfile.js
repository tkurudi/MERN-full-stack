import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import {createProfile} from '../../actions/profileActions';
import {withRouter} from 'react-router-dom';


class CreateProfile extends Component {
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
  componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
          this.setState({errors: nextProps.errors})
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
                    <h1 className="display-4 text-center">Create Your Profile</h1>
                        <p className="lead text-center">
                        Lets get some information to make your profile stand out 
                        </p>
                         <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="Handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="a unique handle for your profile URL. Your full name, company name. nickname"
                                />
                                  <SelectListGroup
                                placeholder="* Status"
                                name="Status"
                                value={this.state.status}
                                onChange={this.onChange}
                                options={options}
                                error={errors.status}
                                info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                placeholder="Company"
                                name="Company"
                                value={this.state.Company}
                                onChange={this.onChange}
                                error={errors.Company}
                                info="Could be your own Company or one you work for"
                                />
                                <TextFieldGroup
                                placeholder="Location"
                                name="Location"
                                value={this.state.Location}
                                onChange={this.onChange}
                                error={errors.Location}
                                info="Where are you from"
                                />
                                <TextFieldGroup
                                placeholder="Skills"
                                name="Skills"
                                value={this.state.Skills}
                                onChange={this.onChange}
                                error={errors.Skills}
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
auth: state.auth,
errors: state.errors
})

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile))