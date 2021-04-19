import React from 'react';
import NewRoomForm from './NewRoomForm'
import Room from './Room'
import cable from '../../services/Cable'

import { connect } from 'react-redux'
import { loadRooms, editRoom } from '../../redux/actions'

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
    this.props.setRoom({room_id: roomId, has_drawer: hasDrawer})
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
    rooms: state.rooms.roomsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRooms: () => { dispatch(loadRooms()) },
    setRoom: (roomObj) => { dispatch(editRoom(roomObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList)

// helpers
