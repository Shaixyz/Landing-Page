import React, { useState } from "react";
import SideBar from "./Sidebar";


const ChatLayout = () => {
  const [messages, setMessages] = useState([
    { sender: "user", content: "Hello, how are you?" },
    { sender: "bot", content: "I'm good! How can I help you today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "user", content: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen flex">
      
     <SideBar/>

     
      <div className="flex-1 flex flex-col bg-primary/40">
        
        <div className="bg-primary text-white p-4 text-xl font-bold flex justify-between items-center">
          <span>Chat</span>
          <span className="text-sm opacity-75">Online</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                } rounded-lg p-3 max-w-xs md:max-w-md`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-4 bg-white flex items-center space-x-4 border-t border-gray-300">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
