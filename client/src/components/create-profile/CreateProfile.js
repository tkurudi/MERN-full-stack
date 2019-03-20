import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextFieldGroup from '../common/textFieldGroup';
import inputGroup from '../common/inputGroup';
import selectListGroup from '../common/selectListGroup';
import textAreaGroup from '../common/textAreaGroup';


class CreateProfile extends Component {
  state = {
      displaySocialInputs: false,
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
    render() {
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

export default connect(mapStateToProps)(CreateProfile)