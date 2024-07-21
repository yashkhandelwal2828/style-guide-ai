"use client";
import 'regenerator-runtime/runtime'
import Content from "@/components/content";
import Header from "@/components/header";
import Results from "@/components/results";
import Head from "next/head";
import { useState } from "react";
import AppContext, { Chat } from "@/context/AppContext";
import { InputWithButton } from "@/components/input";
import Sidebar from "@/components/ui/sidebar";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [chatArr, setChatArr] = useState<Chat[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [currentChatId, setCurrentChatId] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        chatArr,
        setChatArr,
        toggleSidebar,
        sidebarOpen,
        setSidebarOpen,
        currentChat,
        setCurrentChat,
        currentChatId,
        setCurrentChatId,
      }}
    >
      <Head>
        <title>StyleGuide</title>
      </Head>
      <div className="h-screen">
        <Sidebar isOpen={sidebarOpen} />
        <Header />
        <Content />
        <div className="fixed bottom-8 w-full flex items-center justify-center">
          <InputWithButton />
        </div>
      </div>
    </AppContext.Provider>
  );
}
