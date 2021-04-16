import React from 'react';
import NewRoomForm from './NewRoomForm'
import Room from './Room'
import cable from '../../services/Cable'

import { connect } from 'react-redux'
import { loadRooms } from '../../redux/actions'

class RoomsList extends React.Component {

  componentDidMount = () => {
    this.props.loadRooms()
    this.roomsChannel()
  }

  componentWillUnmount = () => {
    cable.disconnect()
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
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

  render = () => {
    return (
      <div className="roomsList">
        <h1>Rooms</h1>
        <p>Select a room or create a new one</p>
        <ul>{ mapRooms(this.props.rooms) }</ul>

        <NewRoomForm />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms.roomsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRooms: room => dispatch({ type: 'ADD_ROOMS', payload: room}),
    loadRooms: () => { dispatch(loadRooms()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList)

// helpers

const mapRooms = rooms => {
  return rooms.map(room => {
    const selected = room.selected_phrase_id ? true : false
    return (
      <Room key={room.id} id={room.id} title={room.title} isPhraseSelected={selected} />
    )
  })
}
