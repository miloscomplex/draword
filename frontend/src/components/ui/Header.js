import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import { connect } from 'react-redux'
import { removeUser, createUser } from '../../redux/actions'

class Header extends React.Component {

  componentDidMount = () => {
    this.props.createUser({id: this.props.currentUser.id, is_drawing: false})
  }

  componentWillUnmount = () => {
    return (
      window.addEventListener('beforeunload', (e) => {
      this.props.removeUser({ user_id: this.props.currentUser.id })
    }))
  }

  render() {

    return (
      <div id='header'>
        <h1><Link to='/'>draword</Link></h1>
        <Navigation />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeUser: userObj => { dispatch(removeUser(userObj)) },
    createUser: userObj => { dispatch(createUser(userObj)) }
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Header)
