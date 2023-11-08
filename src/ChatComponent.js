// Importing necessary libraries from React and other dependencies
import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client'; // SockJS client for WebSocket communication
import { over } from 'stompjs'; // STOMP protocol library over a WebSocket

// Defining the ChatComponent as a functional React component
const ChatComponent = () => {
  // State hooks to manage the state of the STOMP client, messages, and received messages
  const [stompClient, setStompClient] = useState(null); // State for the STOMP client instance
  const [message, setMessage] = useState(''); // State for the message to send
  const [receivedMessages, setReceivedMessages] = useState([]); // State for storing received messages

  // Function to handle the WebSocket connection
  const connect = () => {
    const socket = new SockJS('http://localhost:8080/ws'); // Creating a new SockJS instance pointing to the server's WebSocket endpoint
    const stompClient = over(socket); // Creating a STOMP client over the SockJS client

    // Connecting the STOMP client to the server
    stompClient.connect({}, frame => {
      console.log('Connected: ' + frame); // Logging the successful connection frame

      // Subscribing to the /chatroom/public endpoint to receive messages
      stompClient.subscribe('/chatroom/public', (messageOutput) => {
        // Handling a received message and adding it to the state
        console.log(receivedMessages); // Logging current received messages for debugging
        setReceivedMessages(prev => [...prev, JSON.parse(messageOutput.body)]); // Updating the receivedMessages state with the new message
      });
    });

    setStompClient(stompClient); // Updating the stompClient state with the connected client
  };

  // Function to send a message
  const sendMessage = () => {
    // Sending the message through the STOMP client to the /app/message endpoint
    stompClient.send("/app/message", {}, JSON.stringify({ message: message }));
    setMessage(''); // Clearing the message input after sending
  };

  // useEffect hook to manage side effects, in this case, to handle the WebSocket connection
  useEffect(() => {
    console.log("hi"); // Debugging log
    // Ensuring that the connection is established only once when the component mounts
    if(!stompClient){
        connect(); // Invoking the connect function to establish the WebSocket connection
    }
    // Cleanup function to disconnect the STOMP client when the component unmounts
    return () => {
      if (stompClient) {
        stompClient.disconnect(); // Disconnecting the STOMP client
        console.log('Disconnected'); // Logging the disconnection for debugging
      }
    }
  }, [stompClient]); // The effect depends on the stompClient state

  // Render function of the component returning the JSX to render
  return (
    <div>
      <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Updating the message state as the user types
        />
        <button type="submit">Send</button> 
      </form>
      <div>
        <h2>Received Messages:</h2> 
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg.message}</p> // Mapping each received message to a paragraph element
        ))}
      </div>
    </div>
  );
};

// Exporting ChatComponent to be used in other parts of the application
export default ChatComponent;
