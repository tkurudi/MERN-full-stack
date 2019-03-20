import React, { Component } from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types'

const inputGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    icon,
    type,
    onChange,

}) => {
    return (
        <div className="input-group mb-3">
           <div className="input-group-prepend">
            <span className="input-group-text">
            <i className={icon}/>
            </span>
           </div> 
        <textarea 
         className={classnames("form-control form-control-lg", {
              'is-invalid' : error})}
               placeholder={placeholder}
                name={name}
                 value={value}
                 onChange={onChange}
                 />
                 {error &&
                   (<div className="invalid-feedback">{error}</div>)}
      </div>
    )
  }


export default inputGroup