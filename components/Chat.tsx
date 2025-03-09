"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}


export default function Chat() {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! How can I assist you today? I can make workouts for you and answer your questions!" },
  ]);
  const [input, setInput] = useState<string>("");

  const send = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, id: session?.user?.id }),
      });
      
      if (!res.ok) throw new Error("Network response was not ok");
      
      const data = await res.json();
      
      if (data.message) {
        setMessages([...newMessages, { role: "assistant", content: data.message }]);
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Error generating response." }]);
      console.error(error);
    }
  };

  return (
    <div>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-10 right-10 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:opacity-90 focus:outline-none transition-all duration-300"
        >
          Open Chat
        </button>
      )}

      {open && (
        <div className="fixed bottom-0 right-0 w-full max-w-sm rounded-t-3xl shadow-2xl overflow-hidden transform transition-transform duration-300">
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <h2 className="text-lg font-bold">Chat</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-xl hover:opacity-80 focus:outline-none transition duration-300"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-r from-gray-950 to-blue-950  max-h-[70vh] space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-gray-800 to-blue-800 text-white self-end"
                    : "bg-gradient-to-r from-gray-900 to-blue-900 text-white self-start"
                }`}
              >
                <strong
                  className={`block font-semibold ${
                    msg.role === "user" ? "text-blue-600" : "text-gray-200"
                  }`}
                >
                  {msg.role === "user" ? "You" : "Assistant"}:
                </strong>
                <p className="mt-1">{msg.content}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center p-4 bg-gradient-to-r from-gray-950 to-blue-950 ">
            <input
              type="text"
              className="flex-1 p-3 border rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
            />
            <button
              onClick={send}
              className="ml-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:opacity-90 transition-all duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
