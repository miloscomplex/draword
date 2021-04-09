import React, { useEffect, useState, useContext } from 'react'
import { ActionCableContext } from '../context/ActionCable'

function RoomsList({ roomId }) {

  const [rooms, setRooms] = useState({
    rooms: []
  })

  // create the connection to the backend
  const cable = useContext(ActionCableContext)

  useEffect(() => {
    // params must include the channel, and can also include any other info you'd like as params for the subscription
    // subscribe to a specific channel
    const params = {
      channel: "RoomChannel",
    };

    // handlers lets you define callback functions to run when messages are received from the subscription
    const handlers = {
      // when a new message is broadcast, we'll receive it here
      // 3. figure out how to add a new room from that channel when a new room comes in
      received(newRoom) {
        setRooms((rooms) => ({
          rooms: [newRoom, ...rooms.newRoom],
        }))
      },
      connected() {
        console.log("connected")
      },
      disconnected() {
        console.log("disconnected")
      },
    }

    console.log('subscribing to ', rooms)
    //const subscription = cable.subscriptions.create(params, handlers)

    // 4. unsubsubscribe from the channel when my component is done with it
    return function cleanup() {
      console.log("unsubscribing from ", rooms);
      //subscription.unsubscribe()
    }
  }, [rooms])

  return (
    <div>
      I'm connected to the FeedChannel!
    </div>
  )
}

export default RoomsList
