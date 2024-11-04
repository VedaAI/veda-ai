"use client";

import { useState, useEffect, useRef } from 'react';
import styleChatt from "../css/chat2.module.css";

const Chat2 = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [responseIndex, setResponseIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Create a ref to the chat box for scrolling
  const chatBoxRef = useRef(null);

  // Load responses from a JSON file
  // useEffect(() => {
  //   fetch('/assets/json/responses.json')
  //     .then((res) => res.json())
  //     .then((data) => setResponses(data));
  // }, []);



  // Scroll to the bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle user message submission
  // const handleSendMessage = async () => {
  //   if (input.trim()) {
  //     // Add user message
  //     setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);
  //     const userMessage = input;
  //     setInput(''); // Clear input field
  //     setInput('');

  //     // Load response after user's message
  //     // if (responseIndex < responses.length) {
  //     //   setTimeout(() => {
  //     //     // Add the bot's response after a delay
  //     //     setMessages((prevMessages) => [
  //     //       ...prevMessages,
  //     //       { type: 'response', text: responses[responseIndex] }
  //     //     ]);
  //     //     setResponseIndex((prevIndex) => prevIndex + 1); // Increment the response index
  //     //   }, 1000); // Simulate response delay
  //     // }


  //     try {
  //       // Send the user message to the API and get the response
  //       const response = await fetch('http://127.0.0.1:5000/chat', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ user_query: userMessage ,agent_ans : ""}),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         const botResponse = data.response; // Assuming your API returns { "response": "..." }

  //         // Add the bot's response to the chat
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           { type: 'response', text: botResponse }
  //         ]);
  //       } else {
  //         console.error("Failed to fetch bot response.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching bot response:", error);
  //     }
  //   }
  // };

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add the user's message to the chat
      setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);
      const userMessage = input;
      setInput(''); // Clear input field
       // Set loading to true to show loading message
       setIsLoading(true);
  
      try {
        // Log that the API call is being made
        console.log("Sending message to API:", userMessage);
  
        // Send both parameters to the API
        const response = await fetch('http://127.0.0.1:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_query: userMessage, agent_ans: "" }), // Ensure both params are sent
        });
  
        // Check if the response is successful
        if (response.ok) {
          const data = await response.json();
          console.log("Received response from API:", data);
  
          // Extract the bot response from the API response
          const botResponse = data.message  ; // Assuming API returns { "response": "..." }
  
          // Add the bot's response to the chat
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'response', text: botResponse }
          ]);
        } else {
          console.error("Failed to fetch bot response. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching bot response:", error);
      } finally {
        // Set loading to false to hide loading message
        setIsLoading(false);
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

        {/* Show loading message if isLoading is true */}
        {isLoading && (
          <div className={styleChatt.loadingMessage}>
            Generating response, please wait...
          </div>
        )}
        

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
