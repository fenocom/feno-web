import { AiIcon } from "@/components/common/ai-icon";
import { Button, TextArea } from "@heroui/react";
import { IconSend } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface ChatPanelProps {
    onSendMessage?: (message: string) => Promise<void>;
    isLoading?: boolean;
}

export function ChatPanel({
    onSendMessage,
    isLoading: externalLoading,
}: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "init",
            role: "assistant",
            content:
                "Hi! I can help you build or improve your resume. What would you like to do?",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [scrollToBottom]);

    const handleSend = async () => {
        if (!input.trim() || loading || externalLoading) return;

        const userMessage = input.trim();
        setInput("");
        setLoading(true);

        const newMessages: Message[] = [
            ...messages,
            { id: crypto.randomUUID(), role: "user", content: userMessage },
        ];
        setMessages(newMessages);

        try {
            if (onSendMessage) {
                await onSendMessage(userMessage);
            } else {
                const response = await fetch("/api/ai/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        messages: newMessages.map(({ role, content }) => ({
                            role,
                            content,
                        })),
                    }),
                });

                if (!response.ok) throw new Error("Failed to send message");

                const data = await response.json();
                const aiContent =
                    data.message?.content ||
                    data.response ||
                    "I didn't get a response.";

                setMessages((prev) => [
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        content: aiContent,
                    },
                ]);
            }
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: "Sorry, something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white border-l border-black/5">
            <div className="flex items-center gap-2 p-4 border-b border-black/5 bg-white/50 backdrop-blur-sm">
                <AiIcon size={24} />
                <span className="font-semibold text-sm">AI Assistant</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                                msg.role === "user"
                                    ? "bg-black text-white rounded-br-none"
                                    : "bg-gray-100 text-black rounded-bl-none"
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {(loading || externalLoading) && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-2xl px-4 py-2 rounded-bl-none flex items-center gap-1">
                            <span
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                            />
                            <span
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                            />
                            <span
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                            />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-black/5 bg-white">
                <div className="relative">
                    <TextArea
                        placeholder="Describe your experience or ask for changes..."
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        className="w-full pr-12 resize-none py-3 shadow-none border border-black/10 hover:border-black/20 focus-within:!border-black/20 bg-transparent rounded-xl outline-none"
                    />
                    <Button
                        isIconOnly
                        size="sm"
                        className="absolute right-2 bottom-2 z-10 bg-black text-white rounded-lg"
                        onPress={handleSend}
                        isDisabled={loading || externalLoading}
                    >
                        <IconSend size={16} />
                    </Button>
                </div>
                <div className="text-[10px] text-gray-400 mt-2 text-center">
                    AI can make mistakes. Please review generated resumes.
                </div>
            </div>
        </div>
    );
}
