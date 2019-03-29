import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles} from '../../actions/profileActions';


class Profiles extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }
  render() {
      const { profiles, loading } = this.props.profile;
      let profileItems;

      if(profiles === null || loading) {
          profileItems = <Spinner />;

      } else {
          if(profiles.length > 0) {
              profileItems =  <h1>Profiles here..</h1>
          } else {
              profileItems = <h4> No Profiles Found</h4>
          }
      }
    return (
      <div className="profiles">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="display-4 text-center">
                        <p className="lead text-center">
                            Browse and connect with developers
                        </p>
                        {profileItems}
                    </div>
                </div>
            </div>
         </div> 
      </div>
    )
  }
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);