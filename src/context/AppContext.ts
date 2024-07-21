import { createContext, Dispatch, SetStateAction } from "react";

export interface Chat {
  id: string;
  chats: any[]; // replace 'any' with the type of your chats
  response: string;
}

type AppContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  chatArr: Chat[];
  setChatArr: React.Dispatch<React.SetStateAction<Chat[]>>;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  toggleSidebar: () => void;
  currentChat: Chat | null;
  setCurrentChat: Dispatch<SetStateAction<Chat | null>>;
  currentChatId: string;
  setCurrentChatId: Dispatch<SetStateAction<string>>;
};

// Create a context with default value
const AppContext = createContext<AppContextType | null>(null);

export default AppContext;
