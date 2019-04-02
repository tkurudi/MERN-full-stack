import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';


class ProfileItem extends Component {
  render() {

    const {profile} = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
            <div className="col-2">
                <img src={profile.user.avatar} alt="" className="rounded-circle"/>
            </div>
            <div className="col lg-6 md-4 col-8">
                <h3>{profile.user.name}</h3>
                    <p>
                        {profile.status} {isEmpty(profile.company)} ? null  (<span className="">at {profile.company}</span>)
                    </p>
                     <p>
                         {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                     </p>
                     <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                     View Profile
                     </Link>
            </div>
                <div className="col-md d-none d-md-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                        {profile.skills.slice(0, 4).map((skill, index) => (
                            <li key={index} className="like-group-item">
                                <i className="fa fa-check pr-1"/>
                                 {skill}
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
      </div>
    )
  }
}


export default ProfileItem