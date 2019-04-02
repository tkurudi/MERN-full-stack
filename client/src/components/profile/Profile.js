import React, { Component } from 'react'
import {connect } from 'react-redux';
import {Link } from 'react-router-dom';
import  ProfileHeader from './ProfileHeader';
import  ProfileAbout from './ProfileAbout';
import  ProfileCreds from './ProfileCreds';
import  ProfileGit from './ProfileGit';
import  Spinner from '../common/Spinner';
import {getProfileByHandle} from '../../actions/profileActions';



 class Profile extends Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }


  render() {
    return (
      <div>
        
      </div>
    )
  }
}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileByHandle})(Profile)