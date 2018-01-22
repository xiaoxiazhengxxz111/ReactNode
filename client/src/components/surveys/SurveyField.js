import React from 'react'

// custom field
export default ({input, label}) => {
  // console.log(props)

  return(
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  )
}