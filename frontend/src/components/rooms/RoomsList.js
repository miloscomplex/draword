import React from 'react';
import { API_ROOT, API_WS_ROOT } from '../../constants';
import NewRoomForm from './NewRoomForm'
//import actioncable from 'actioncable'
import Room from './Room'
import cable from '../../services/Cable'

class RoomsList extends React.Component {

  state = {
    rooms: [],
    activeRoom: null
  }

  componentDidMount = () => {
    this.handleFetch()
    this.roomsChannel()
  };

  handleFetch = () => {
    fetch(`${API_ROOT}/rooms`)
      .then(res => res.json())
      .then(rooms => this.setState({ rooms }));
  }

  roomsChannel = () => {
    cable.subscriptions.create({
    channel: `RoomsChannel`,
    },
      {connected: () => {
        console.log('connected!')
      },
        disconnected: () => {
          console.log('disconnected!');
        },
        received: data => {
          this.handleReceivedRoom(data)
          console.log('data received')
        }
    })
  }

  handleReceivedRoom = response => {
    const { room } = response;
    this.setState({
      rooms: [...this.state.rooms, room]
    })
  }

  render = () => {
    return (
      <div className="roomsList">
        <h1>Rooms</h1>
        <p>Select a room or create a new one</p>
        <ul>{mapRooms(this.state.rooms)}</ul>

        <NewRoomForm />
      </div>
    );
  };
}

export default RoomsList;

// helpers

const mapRooms = rooms => {
  return rooms.map(room => {
    return (
      <Room key={room.id} title={room.title} />
    )
  })
}
