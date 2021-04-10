import React from 'react';
import { API_ROOT, API_WS_ROOT } from '../../constants';
import NewRoomForm from './NewRoomForm'
import actioncable from 'actioncable'

class RoomsList extends React.Component {

  state = {
    rooms: [],
    activeRoom: null
  }

  componentDidMount = () => {
    this.handleFetch()
    //this.cable = actioncable.createConsumer(API_WS_ROOT);
    this.roomsChannel()
  };

  handleFetch = () => {
    fetch(`${API_ROOT}/rooms`)
      .then(res => res.json())
      .then(rooms => this.setState({ rooms }));
  }

  roomsChannel = () => {
    CableApp.cable.subscriptions.create({
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
    const { rooms, activeRoom } = this.state;
    return (
      <div className="roomsList">
        <h1>Rooms</h1>
        <p>Select a room or create a new one</p>
        <ul>{mapRooms(rooms, this.handleClick)}</ul>

        <NewRoomForm />
      </div>
    );
  };
}

export default RoomsList;

// helpers

const findActiveRoom = (rooms, activeRoom) => {
  return rooms.find(
    room => room.id === activeRoom
  );
};

const mapRooms = rooms => {
  return rooms.map(room => {
    return (
      <li key={room.id} >
        {room.title}
      </li>
    )
  })
}
