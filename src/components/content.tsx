import { useContext, useEffect } from "react";
import AppContext from "@/context/AppContext";
import Results from "./results";
import { v4 as uuidv4 } from "uuid";

function Content() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "AppContext is null, ensure it's provided in a parent component"
    );
  }

  const {
    chatArr,
    currentChat,
    setCurrentChat,
    setChatArr,
    setCurrentChatId,
    loading,
    currentChatId,
  } = context;

  useEffect(() => {
    if (!currentChat) {
      const id = uuidv4();
      setCurrentChatId(id);
      const currentChatObj = {
        id,
        chats: [],
        response: "",
      };
      setCurrentChat(currentChatObj);
      const chatArrClone = JSON.parse(JSON.stringify(chatArr));
      chatArrClone.push(currentChatObj); 
      setChatArr(chatArrClone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  return ((currentChat && currentChat?.response) || loading) ? (
    <div className="h-[85%] pt-16 overflow-hidden overflow-y-scroll text-left">
      <Results currentChatId={currentChatId} chats={currentChat?.chats ?? []} response={currentChat?.response ?? ""} />
    </div>
  ) : (
    <div className="m-auto flex flex-col items-center justify-center h-[85%] pt-16 overflow-scroll">
      <span className="w-fit text-center text-4xl font-semibold text-white">
        Discover Your Perfect Style
      </span>
      <span className="w-fit text-center text-white opacity-85 my-4 mb-10 text-xl">
        AI-driven product recommendations to keep your lifestyle on point.
      </span>
    </div>
  );
}

export default Content;
