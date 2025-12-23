import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const response = await fetch("http://127.0.0.1:11434/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3", // Default to llama3, or make it configurable
                messages: messages,
                stream: false, // For now, no streaming for simplicity
            }),
        });

        if (!response.ok) {
            // Fallback or error handling
            const text = await response.text();
            console.error("Ollama Error:", text);
            return NextResponse.json(
                { error: "Failed to communicate with Ollama" },
                { status: 500 },
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("AI Chat Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
