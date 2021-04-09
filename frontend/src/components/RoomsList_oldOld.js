import React from 'react'
import { API_ROOT } from '../constants';
import ActionCable from 'actioncable';
import Cable from './Cable_new'

class RoomsList extends React.Component {

  constructor() {
    super()
    this.state = {
      rooms: [],
    }
    this.cable = ActionCable.createConsumer('ws://localhost:3000/cable')
  }

  componentDidMount() {
    this.fetchRooms()
    this.createSubscription()
  }

  fetchRooms = () => {
    fetch(`${API_ROOT}/rooms`)
      .then(res => res.json())
      .then(rooms => this.setState({ rooms: rooms.title }))
      console.log(this.state)
  }

  createSubscription = () => {
    this.cable.subscriptions.create(
      { channel: 'RoomsChannel' },
      { received: room => this.handleReceivedRoom(room) }
    )
  }

  mapRooms = () => {
    return this.state.rooms.map((room, i) =>
      <li key={i}>{room.title}</li>)
  }

  handleReceivedRoom = room => {
    this.setState({ rooms: [...this.state.rooms, room] })
  }

  handleRoomSubmit = event => {
    event.preventDefault()
    const roomObj = {
      room: {
        title: event.target.room.value
      }
    }
    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomObj)
    }
    fetch('http://localhost:3000/rooms', fetchObj)
    event.target.reset()
  }

  // <ActionCable
  //   channel={{ channel: 'RoomsChannel' }}
  //   onReceived={this.handleReceivedMessages}
  // />

  render() {
    return (
      <div className='Rooms'>
        { this.state.rooms.map(room => {
          return (
            <ActionCable
              key={room.id}
              channel={{ channel: 'RoomsChannel' }}
              onReceived={this.handleReceivedRoom}
            />
          )
        })}
        <h2>Rooms</h2>
        <ul> {this.mapRooms()} </ul>
        <form>
          <input name='room' type='text' />
          <input type='submit' value='Send message' />
        </form>
      </div>
    )
  }

}

export default RoomsList
