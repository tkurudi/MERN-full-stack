import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExp } from '../../actions/profileActions';


 class Experience extends Component {

    onDeleteClick(id) {
        this.props.deleteExp(id)
    }
  render() {
      const experience = this.props.experience.map(exp => (
          <tr key={exp.id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
             {exp.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
             
          </td>
          <td><button onClick={this.onDeleteClick.bind(this, exp._id)}
           className= 'btn btn-danger'>
           Delete
           </button>
           </td>
            </tr>
      ))
    return (
      <div>
          <h1 className='mb-4'>Experience Credentials  </h1>
            <table className='table'>
                <thread>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th></th>
                    </tr>
                        {experience}
                </thread>
        
        </table>
      </div>
    )
  }
}
export default connect(null, {deleteExp})(Experience)