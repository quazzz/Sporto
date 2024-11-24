"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
export default function Chat() {
    const {data: session} = useSession()
    const [open,setOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! How can I assist you today?' },
    ]);
    const [input, setInput] = useState('');

    const send = async () => {
        if (!input.trim()) return;
        
        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages, id: session?.user.id })
            });

            const data = await res.json();
            if (data && data.content) {
                setMessages([...newMessages, { role: 'assistant', content: data.content }]);
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            setMessages([...newMessages, { role: 'assistant', content: 'Error generating response.' }]);
            console.error(error)
        }
    };

    return (
        <div>
        {!open && (
            <button 
                onClick={() => setOpen(true)} 
                className="open-chat-btn fixed bottom-10 right-10 px-6 py-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-950 focus:outline-none transition duration-300">
                Open Chat
            </button>
        )}
    
        {open && (
            <div className="chat-container fixed bottom-0 right-0 w-full max-w-sm bg-white rounded-t-lg shadow-xl overflow-hidden">
                <div className="message-container flex-1 overflow-y-auto p-4 bg-gray-50 border-b border-gray-200 max-h-[75vh]">
                    <button 
                        onClick={() => setOpen(false)} 
                        className="close-button absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900 focus:outline-none">
                        &times;
                    </button>
                    <div className="space-y-4">
                        {messages.map((msg, idx) => (
                            <div 
                                className={`message p-3 rounded-lg ${msg.role === 'user' ? 'bg-gray-200' : 'bg-gray-100'}`} 
                                key={idx}
                            >
                                <strong className={`block font-semibold ${msg.role === 'user' ? 'text-black' : 'text-black'}`}>
                                    {msg.role === 'user' ? 'You' : 'Assistant'}:
                                </strong>
                                <p className="mt-2 text-gray-800">{msg.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="input-container flex items-center p-4 bg-gray-50 border-t border-gray-200">
                    <input
                        type="text"
                        className="input-box flex-1 p-3 border rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                    />
                    <button
                        onClick={send}
                        className="send-button ml-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-950 transition duration-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        )}
    </div>
    
    );
}
