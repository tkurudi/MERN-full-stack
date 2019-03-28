import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';

 class Experience extends Component {
  render() {
      const experience = this.props.experience.map(exp => (
          <tr key={exp.id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>{exp.from} - {exp.to}</td>
          <td><button className= 'btn btn-danger'>Delete</button></td>
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
                    <tbody>
                        {experience}
                    </tbody>
                </thread>
        
        </table>
      </div>
    )
  }
}
export default connect(null)(withRouter(Experience))