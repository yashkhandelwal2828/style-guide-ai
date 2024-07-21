import React, { useContext } from "react";
import { Button } from "./button";
import AppContext from "@/context/AppContext";
import { v4 as uuidv4 } from "uuid";

interface SidebarProps {
  isOpen: boolean;
}
const Sidebar = ({ isOpen }: SidebarProps) => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "AppContext is null, ensure it's provided in a parent component"
    );
  }

  const { chatArr, currentChat, setCurrentChat, setChatArr, setCurrentChatId, toggleSidebar } =
    context;

  const handleNewChatClick = () => {
    const id = uuidv4();
    setCurrentChatId(id);
    const currentChatObj = {
      id,
      chats: [],
      response: "",
    };
    setCurrentChat(currentChatObj);
    const chatArrClone = JSON.parse(JSON.stringify(chatArr));
    chatArrClone.push(currentChat);
    setChatArr(chatArrClone);
    toggleSidebar()
  };
  console.log('asdasdsadsada', chatArr)
  return (
    <div
      className={`sidebar ${
        isOpen ? "open" : ""
      } !bg-black pt-20 overflow-y-scroll`}
    >
      {/* Your sidebar content goes here */}
      <Button
        variant="outline"
        className="w-[80%] flex items-center justify-center m-auto"
        onClick={handleNewChatClick}
      >
        New Chat
      </Button>
    </div>
  );
};

export default Sidebar;
