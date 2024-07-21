import React, { useContext, useEffect, useRef } from "react";
import LoadingResult from "./ui/loadingResult";
import AppContext from "@/context/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThemeAvatar from "./icons/themeAvatar";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ChatItem = {
  product_name: string;
  product_url: string;
  id: number;
};

function Results({
  chats,
  currentChatId,
  response
}: {
  chats: ChatItem[][];
  currentChatId: string;
  response: string;
}) {
  const context = useContext(AppContext);
  const endOfResults = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  if (!context) {
    throw new Error(
      "AppContext is null, ensure it's provided in a parent component"
    );
  }
  console.log("currentChatasdsaId", currentChatId);
  useEffect(() => {
    endOfResults.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    const newUrl = `/chat/${currentChatId}`;
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl
    );
  }, [currentChatId, router]);

  const { loading } = context;

  return (
    <div className="m-5 flex flex-col justify-end items-end">
      <div className="flex items-start gap-2 mt-10 flex-wrap float-left w-[75%] flex-col">
        {chats.map((chat, index) => {
          if (Array.isArray(chat) && chat?.length) {
            return (
              <div key={index} className="flex flex-col">
                <p className="text-white mt-5 flex items-center gap-3">
                  <ThemeAvatar /> {response}
                </p>
                <ul className="flex items-start gap-6 mt-10 flex-wrap chat-item flex-col">
                  {chat?.map((item) => {
                    const { product_url, id, product_name } = item;
                    return (
                      <Card key={id} className="ml-8">
                        {/* <CardHeader> */}
                        {/* <CardTitle>{product_name}</CardTitle> */}
                        {/* <CardDescription></CardDescription> */}
                        {/* </CardHeader> */}
                        <CardContent className="px-4 py-2">
                        <a className="text-base flex items-center justify-center gap-2 underline !text-[#0462ba]" href={product_url} target="_blank">{product_name}</a>
                        </CardContent>
                        {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
                      </Card>
                      // <li key={id} className="text-base text-white flex flex-col gap-2 underline ml-8">
                      //   <a href={product_url}>{product_name}</a>
                      // </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
        })}
        {loading ? (
          <p className="flex items-center text-white mt-5">
            <span className="mr-5 flex flex-col gap-4">
              <span className="flex items-center gap-4">
                Finding the perfect pairings based on your query. Thank you for
                your patience!
                <LoadingResult />
              </span>
              <Skeleton className="h-4 w-[450px]" />
              <Skeleton className="h-4 w-[350px]" />
              <Skeleton className="h-4 w-[300px]" />
            </span>
          </p>
        ) : null}
        <div ref={endOfResults} />
      </div>
    </div>
  );
}

export default Results;
