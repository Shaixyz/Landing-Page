import React from "react";

const ChatListItem = ({ avatar, name, body, time }) => {
  return (
    <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition">
    
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      </div>

  
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-black dark:text-white">{name}</h4>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600 truncate dark:text-gray-400">{body}</p>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const chatList = [
    {
      avatar: "https://picsum.photos/101/101",
      name: "John Doe",
      body: "Hey, how are you?",
      time: "10:30 AM",
    },
    {
      avatar: "https://picsum.photos/102/102",
      name: "Jane Smith",
      body: "Did you check my message?",
      time: "Yesterday",
    },
    {
      avatar: "https://picsum.photos/103/103",
      name: "Michael",
      body: "Let's catch up later!",
      time: "2 days ago",
    },
  ];

  return (
    <div className="w-80 bg-white dark:bg-gray-800 h-full border-r border-gray-300 dark:border-gray-600">
      <div className="p-4 border-b border-gray-300 dark:border-gray-600">
        <h2 className="text-xl font-bold text-black dark:text-white">Notifications</h2>
      </div>

     
      <div className="flex flex-col space-y-1">
        {chatList.map((chat, index) => (
          <ChatListItem
            key={index}
            avatar={chat.avatar}
            name={chat.name}
            body={chat.body}
            time={chat.time}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
