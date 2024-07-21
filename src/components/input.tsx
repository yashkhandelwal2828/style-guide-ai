import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppContext, { Chat } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export function InputWithButton() {
  const context = useContext(AppContext);
  const [inputText, setInputText] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleVoiceCommand = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      if (transcript) {
        resetTranscript();
      }
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  if (!context) {
    throw new Error(
      "AppContext is null, ensure it's provided in a parent component"
    );
  }

  const {
    loading,
    setLoading,
    currentChat,
    setCurrentChat,
    chatArr,
    setChatArr,
  } = context;

  const images = [
    {
      id: 1,
      product_name: "Lollipop Purple Banarasi Chanderi Saree",
      product_url:
        "https://www.karagiri.com/products/lollipop-purple-banarasi-chanderi-saree-69008?variant=3924695908371",
    },
    {
      id: 2,
      product_name: "Pansy Yellow Organza Saree",
      product_url:
        "https://www.karagiri.com/products/pansy-yellow-organza-saree-95454?variant=41659863138497",
    },

    {
      id: 3,
      product_name: "Light Yellow Lehenga Choli",
      product_url:
        "https://www.karagiri.com/products/light-yellow-lehenga-choli-65874?variant=41687044620481",
    },

    {
      id: 4,
      product_name: "Flamingo Pink Dola Silk Saree",
      product_url:
        "https://www.karagiri.com/products/flamingo-pink-dola-silk-saree-35669?variant=41879043801281",
    },

    {
      id: 5,
      product_name:
        "Olive Green With Blue Border Embroidered Chanderi Silk Saree",
      product_url:
        "https://karagiri.myshopify.com/products/olive-green-with-blue-border-embroidered-chanderi-silk-saree-46241?variant=37533389127873",
    },
  ];

  const fetchChats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: currentChat?.id ?? "",
            query: inputText,
            // your data here
          }),
        }
      );

      const data = await response.json();

      if (data && data?.response) {
        const recommendationsArray = data?.recommendations
          ? Object.entries(data?.recommendations).map(
              ([product_name, product_url], index) => ({
                id: index + 1, // incremental id
                product_name, // product name
                product_url, // product url
              })
            )
          : [];

        const responseChatArr = [
          ...(currentChat?.chats ?? []),
          recommendationsArray,
        ];
        setCurrentChat({
          id: currentChat?.id ?? "",
          chats: responseChatArr,
          response: data?.response,
        });
        const chatArrClone = JSON.parse(JSON.stringify(chatArr));
        const currentChatObj = chatArrClone.find(
          (item: Chat) => item.id === currentChat?.id
        );
        if (currentChatObj) {
          currentChatObj.chats = responseChatArr;
          currentChatObj.response = data?.response;
        }
        setChatArr(chatArrClone);
      }
    } catch (err) {
      setCurrentChat({
        id: currentChat?.id ?? "",
        chats: [],
        response: "Error in fetching response currently!",
      });
      const chatArrClone = JSON.parse(JSON.stringify(chatArr));
      const currentChatObj = chatArrClone.find(
        (item: Chat) => item.id === currentChat?.id
      );
      if (currentChatObj) {
        currentChatObj.chats = [];
        currentChatObj.response = "Error in fetching response currently!";
      }
      setChatArr(chatArrClone);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setInputText("");
    SpeechRecognition.stopListening();
    resetTranscript();

    fetchChats();
    // setTimeout(() => {
    //   setLoading(false);
    //   setCurrentChat({
    //     id: currentChat?.id ?? "",
    //     chats: [...(currentChat?.chats ?? []), images],
    //     response: "Here are response you want!",
    //   });
    //   const chatArrClone = JSON.parse(JSON.stringify(chatArr));
    //   const currentChatObj = chatArrClone.find(
    //     (item: Chat) => item.id === currentChat?.id
    //   );
    //   if (currentChatObj) {
    //     currentChatObj.chats = [...(currentChat?.chats ?? []), images];
    //   }
    //   setChatArr(chatArrClone);
    // }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl items-center space-x-2"
    >
      <Input
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          resetTranscript();
        }}
        color="black"
        type="text"
        placeholder={
          currentChat?.chats?.length
            ? "Ask Follow Up..."
            : "What are you looking for today?"
        }
        className="shadow-lg text-base "
      />
      <Button
        disabled={loading || !inputText}
        type="submit"
        variant="secondary"
      >
        {currentChat?.chats?.length ? "Send" : "Find Recommendations"}
      </Button>
      {browserSupportsSpeechRecognition ? (
        <Button variant="outline" onClick={handleVoiceCommand} type="button">
          {listening ? "Stop Listening" : "Start Listening"}
        </Button>
      ) : null}
    </form>
  );
}
