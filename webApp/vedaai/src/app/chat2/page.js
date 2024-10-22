"use client";

import { useState, useEffect, useRef } from 'react';
import styleChatt from "../css/chat2.module.css";

const Chat2 = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [responseIndex, setResponseIndex] = useState(0);

  // Create a ref to the chat box for scrolling
  const chatBoxRef = useRef(null);

  // Load responses from a JSON file
  useEffect(() => {
    fetch('/assets/json/responses.json')
      .then((res) => res.json())
      .then((data) => setResponses(data));
  }, []);

  // Scroll to the bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle user message submission
  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user message
      setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);
      setInput('');

      // Load response after user's message
      if (responseIndex < responses.length) {
        setTimeout(() => {
          // Add the bot's response after a delay
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'response', text: responses[responseIndex] }
          ]);
          setResponseIndex((prevIndex) => prevIndex + 1); // Increment the response index
        }, 1000); // Simulate response delay
      }
    }
  };

  return (
    <div className={styleChatt.chatContainer}>
      <div className={styleChatt.chatBox} ref={chatBoxRef}>
        {messages.map((message, index) => (
          
         <div
         key={index}
         className={message.type === 'user' ? styleChatt.rightMessage : styleChatt.leftMessage}
       >
        <div>

         {message.text}
         </div>
       </div>
       
        ))}
      </div>
      <div className={styleChatt.inputBox}>
        <input
          className={styleChatt.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className={styleChatt.button} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat2;
