import React from 'react';
import NewRoomForm from './NewRoomForm'
import Room from './Room'
import cable from '../../services/Cable'

import { connect } from 'react-redux'
import { loadRooms, editSelectedRoom, createUser, editUser, removeUser } from '../../redux/actions'

class RoomsList extends React.Component {

  componentDidMount = () => {
    this.props.loadRooms()
    this.roomsChannel()
    //console.log('this.props.currentUser= ', this.props.currentUser);
  }

  componentDidUpdate() {
    //console.log('RoomList didUpdate')
  }

  componentWillUnmount = () => {
    //console.log('RoomsList unmounted');
    cable.disconnect()
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
  }

  mapRooms = rooms => {
    return rooms.map(room => {
      return (
        <Room key={room.id} id={room.id} title={room.title} isPhraseSelected={room.selected_phrase_id} handleClick={this.handleClick} />
      )
    })
  }

  roomsChannel = () => {
    const subscribe = cable.subscriptions.create({
    channel: `RoomsChannel`,
    },
      {connected: () => {
        console.log('RoomsChannel connected!')
      },
      disconnected: () => {
        console.log('RoomsChannel disconnected!');
      },
      received: data => {
        this.handleReceivedRoom(data)
        console.log('RoomsChannel data received')
      }
    })
  }

  handleReceivedRoom = response => {
    this.props.loadRooms()
  }

  handleClick = (event, roomId, hasDrawer) => {
    console.log('I was clicked', roomId, event);
    // set is drawing to true here
    // TODO: Not sure if these are necessary ?? 
    //this.props.editSelectedRoom({room_id: roomId, has_drawer: hasDrawer})
    this.props.editUser({user_id: this.props.currentUser.id, room_id: roomId, is_drawing: true })

  }

  render = () => {
    return (
      <div className="roomsList">
        <h1>Rooms</h1>
        <p>Select a room or create a new one</p>
        <ul>{ this.mapRooms(this.props.rooms) }</ul>

        <NewRoomForm />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms.roomsList,
    currentUser: state.users.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRooms: () => { dispatch(loadRooms()) },
    editSelectedRoom: (roomObj) => { dispatch(editSelectedRoom(roomObj)) },
    createUser: userObj => { dispatch(createUser(userObj)) },
    editUser: userObj => { dispatch(editUser(userObj)) },
    removeUser: userObj => { dispatch(removeUser(userObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList)

// helpers
