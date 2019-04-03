import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextAreaGroup from '../common/TextAreaGroup';
import { addPost } from '../../actions/postActions';


class PostForm extends Component {
    state = {
        text: '',
        errors: {}

    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log('submit')
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
  render() {

    const {errors} = this.state;
    return (
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Somthing...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaGroup
                    placeholder='Create A Post'
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                    error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(PostForm)