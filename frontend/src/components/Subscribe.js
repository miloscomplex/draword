import React, { useEffect } from "react";
import Cable from "./Cable";

function Subscribe({ message_id }) {
  useEffect(() => {
    // params must include the channel, and can also include any other info you'd like as params for the subscription
    const params = {
      channel: "MessageChannel",
      id: message_id,
    };

    // handlers lets you define callback functions to run when messages are received from the subscription
    const handlers = {
      // when a new message is broadcast, we'll receive it here
      received: (data) => console.log("received", data),
      connected: () => console.log("connected"),
      disconnected: () => console.log("disconnected"),
    };

    // subscribe to the cable
    const subscription = Cable.subscriptions.create(params, handlers);

    // unsubscribe
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [message_id]);

  return <div>I'm connected to the FeedChannel!</div>;
}

export default Subscribe
