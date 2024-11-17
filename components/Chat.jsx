"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
export default function Chat() {
    const {data: session} = useSession()
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
        }
    };

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((msg, idx) => (
                    <div className="message" key={idx}>
                        <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    className="bg-red-200"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={send}>Send</button>
            </div>
        </div>
    );
}
