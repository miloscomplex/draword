import React, { Fragment } from 'react'
import { ActionCable } from 'react-actioncable-provider'

const Cable = ({ rooms, handleReceivedRoom }) => {
  return (
    <Fragment>
      {rooms.map(room => {
        return (
          <ActionCable
            key={room.id}
            channel={{ channel: 'RoomsChannel', room: room.id }}
            onReceived={handleReceivedRoom}
          />
        )
      })}
    </Fragment>
  )
}

export default Cable
