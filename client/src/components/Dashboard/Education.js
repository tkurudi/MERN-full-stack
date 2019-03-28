import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEdu } from '../../actions/profileActions';


 class Education extends Component {

    onDeleteClick(id) {
        this.props.deleteEdu(id)
    }
  render() {
      const Education = this.props.education.map(Edu => (
          <tr key={Edu.school}>
          <td>{Edu.degree}</td>
          <td>{Edu.fieldofstudy}</td>
          <td>
            <Moment format="YYYY/MM/DD">{Edu.from}</Moment> -
             {Edu.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{Edu.to}</Moment>}
             
          </td>
          <td><button onClick={this.onDeleteClick.bind(this, Edu._id)}
           className= 'btn btn-danger'>
           Delete
           </button>
           </td>
            </tr>
      ))
    return (
      <div>
          <h1 className='mb-4'>Education Credentials  </h1>
            <table className='table'>
                <thread>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Field Of Study</th>
                        <th></th>
                    </tr>
                        {Education}
                </thread>
        
        </table>
      </div>
    )
  }
}
export default connect(null, {deleteEdu})(Education)