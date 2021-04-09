import { createConsumer } from "@rails/actioncable";

// connect to Action Cable on our server
const Cable = createConsumer("ws://localhost:3000/cable");

export default Cable
