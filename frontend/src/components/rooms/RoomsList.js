import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../../constants';
import NewRoomForm from './NewRoomForm'
import ChatsArea from './ChatsArea'
import CableRooms from '../CableRooms';
import actioncable from 'actioncable'

class RoomsList extends React.Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
      activeRoom: null
    }
    const CableApp = {}
  }

  componentDidMount = () => {
    this.handleFetch()
    this.cable = actioncable.createConsumer('ws://localhost:3000/cable');
    this.canvasChannel()
  };

  canvasChannel = () => {
    this.cable.subscriptions.create({
    channel: `RoomsChannel`,
    },
      {connected: () => {
        console.log("connected!")
      },
        disconnected: () => {},
        received: data => {
          this.handleReceivedRoom(data)
          console.log('data received')
        }
    })
  }

  handleFetch = () => {
    fetch(`${API_ROOT}/rooms`)
      .then(res => res.json())
      .then(rooms => this.setState({ rooms }));
  }

  handleClick = id => {
    this.setState({ activeRoom: id });
  }

  handleReceivedRoom = response => {
    const { room } = response;
    this.setState({
      rooms: [...this.state.rooms, room]
    });
  };

  render = () => {
    const { rooms, activeRoom } = this.state;
    return (
      <div className="roomsList">
        <h1>Rooms</h1>
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

const mapRooms = (rooms, handleClick) => {
  return rooms.map(room => {
    return (
      <li key={room.id} onClick={() => handleClick(room.id)}>
        {room.title}
      </li>
    );
  });
};
