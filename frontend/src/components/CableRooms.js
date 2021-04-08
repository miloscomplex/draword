import React, { Fragment } from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'

const CableRooms = ({ rooms, handleReceivedChat }) => {
  return (
    <Fragment>
      {rooms.map(room => {
        return (
          <ActionCableConsumer
            key={room.id}
            channel={{ channel: 'RoomsChannel', room: room.id }}
            onReceived={handleReceivedChat}
          />
        )
      })}
    </Fragment>
  )
}

export default CableRooms
