import React, { Component } from 'react'
import { withAuth } from './AuthProvider';

const style = {
  display: 'inline-block',
  marginLeft: '10px',
  position: 'relative',
  bottom: '0px',
  color: '#333333',  
}
class Greeting extends Component {
  render() {
    return (
      <div className="greeting" style={style}>
        Hi, <strong>{this.props.user.userName ? this.props.user.userName : this.props.user.email}</strong>!
      </div>
    )
  }
}
export default withAuth()(Greeting);