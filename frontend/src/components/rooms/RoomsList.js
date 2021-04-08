import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../../constants';
import NewRoomForm from './NewRoomForm'
import ChatsArea from './ChatsArea'
import CableRooms from '../CableRooms';

class RoomList extends React.Component {
  state = {
    rooms: [],
    activeRoom: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/rooms`)
      .then(res => res.json())
      .then(rooms => this.setState({ rooms }));
  };

  handleClick = id => {
    this.setState({ activeRoom: id });
  };

  handleReceivedRoom = response => {
    const { room } = response;
    this.setState({
      rooms: [...this.state.rooms, room]
    });
  };

  handleReceivedMessage = response => {
    const { chat } = response;
    const rooms = [...this.state.rooms];
    const room = rooms.find(
      room => room.id ===
      room.chats.room_id
    );
    room.chats = [...room.chats, chat];
    this.setState({ rooms });
  };

  render = () => {
    const { rooms, activeRoom } = this.state;
    return (
      <div className="roomsList">
        <ActionCable
          channel={{ channel: 'RoomsChannel' }}
          onReceived={this.handleReceivedRoom}
        />
        {this.state.rooms.length ? (
          <CableRooms
            rooms={rooms}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Rooms</h2>
        <ul>{mapRooms(rooms, this.handleClick)}</ul>
        <NewRoomForm />
        {activeRoom ? (
          <ChatsArea
            room={findActiveRoom(
              rooms,
              activeRoom
            )}
          />
        ) : null}
      </div>
    );
  };
}

export default RoomList;

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
