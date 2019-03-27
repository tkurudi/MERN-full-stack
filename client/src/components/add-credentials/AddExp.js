import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import  TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import {connect} from 'react-redux';

 class AddExp extends Component {
     state = {
       company: '',
       title: '',
       location: '',
       from: '',
       to: '',
       current: false,
       description: '',
       errors: {},
       disabled: false  
     }

     onchange = (e) => {
        this.setState({ [e.targwt.name]: e.target.value})
     }

     onCheck = () => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
     }

     onSubmit = (e) => {
        e.preventDefault()

        console.log(e)
     }
  render() {
      const { errors } = this.state;
    return (
      <div className="add-exp">
        <div className="container">
            <div className="row">
                <div className="col-md-8-m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                        Go Back
                    </Link>
                    <h1 className="display-4 text-center">Add Experience</h1>
                    <p className="lead text-center"> add any job or position that you have had in the past or currently have
                    </p>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                placeholder="* Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                            />
                            <TextFieldGroup
                                placeholder="* Job Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                                error={errors.title}
                            
                            />
                                <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                            
                            />
                             <h6>Form date</h6>
                             <TextFieldGroup
                                placeholder="From"
                                name="date"
                                type="date"
                                value={this.state.from}
                                onChange={this.onChange}
                                error={errors.from}
                            
                            />
                            <h5>To date</h5>
                            <TextFieldGroup
                                placeholder="To"
                                name="date"
                                type="date"
                                value={this.state.to}
                                onChange={this.onChange}
                                error={errors.to}
                                disabled={this.state.disabled ? 'disabled' : ''}
                            
                            />

                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id="current"
                                />
                                <label htmlFor="current" className="form-check-label">
                                Current job
                                </label>
                            </div>
                            <TextAreaGroup
                                placeholder="Job Description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                error={errors.description}
                                info="Tell us about your position"
                            />
                            <input type="submit"
                             value="Submit"
                              className="btn btn-info btn-block mt-4"/>
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
});

export default connect(mapStateToProps)(withRouter(AddExp)); 