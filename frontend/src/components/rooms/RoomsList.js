import React from 'react';
import NewRoomForm from './NewRoomForm'
import Room from './Room'
import cable from '../../services/Cable'

import { connect } from 'react-redux'
import { loadRooms } from '../../redux/actions'

class RoomsList extends React.Component {

  componentDidMount = () => {
    this.props.loadRooms()
    // --- ACTION CABLE --- //
    this.roomsChannel()
    // clear state of selectedRoom
    this.props.removeSelectedRoom()
  }

  componentWillUnmount = () => {
    //console.log('RoomsList unmounted');
    // --- ACTION CABLE --- //
    cable.disconnect()
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
  }


  roomsChannel = () => {
    cable.subscriptions.create({
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

  mapRooms = rooms => {
    return rooms.map(room => {
      return (
        <Room key={room.id} id={room.id} title={room.title} />
      )
    })
  }

  loading = () => <span className='loading-message'> </span>

  render = () => {
    const { rooms, busy } = this.props
    return (
      <div className="roomsList">
        <h1>Rooms</h1>
        <p>Select a room or create a new one</p>
        <ul>
          { busy ? this.loading() : this.mapRooms(this.props.rooms) }
        </ul>

        <NewRoomForm />

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms.roomsList,
    busy: state.busySignal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRooms: () => { dispatch(loadRooms()) },
    removeSelectedRoom: () => dispatch({type: 'REMOVE_SELECTED_ROOM',}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList)
