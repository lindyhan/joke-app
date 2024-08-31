"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();

  const topic = [
    { emoji: "💻", value: "Office" },
    { emoji: "📚", value: "School" },
    { emoji: "🏋🏻", value: "Gym" },
  ];
  const tone = [
    { emoji: "🤡", value: "Absurd" },
    { emoji: "👶🏻", value: "For kids" },
    { emoji: "🤯", value: "Offensive" },
  ];
  const type = [
    { emoji: "🚪", value: "Knock-Knock" },
    { emoji: "➖", value: "One liner" },
    { emoji: "📘", value: "Story" },
  ];

  const [state, setState] = useState({
    topic: "",
    tone: "",
    type: "",
    creativeness: 1, // Default to maximum
  });
  
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: name === 'creativeness' ? parseFloat(value) : value,
    });
  };

  return (
    <main className="mx-auto w-full p-20 flex flex-col">
      <h2 className="text-zinc-500 text-3xl font-bold mb-4">Fiver Joker</h2>
      <p className="text-zinc-500 dark:text-zinc-400 mb-6">
        Select the topic, tone and type of Joke you want. Each Joke costs $5. You may pay in BTC.
      </p>
      
      <div className="flex flex-row space-x-8">
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="space-y-2 bg-opacity-25 bg-gray-700 rounded-lg p-2">
            <h3 className="text-xl font-semibold text-white mb-2">Topic</h3>
            <div className="flex flex-wrap">
              {topic.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-1 m-1 bg-opacity-25 bg-gray-200 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="topic"
                    onChange={handleChange}
                  />
                  <label className="ml-1 text-white" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1 bg-opacity-25 bg-gray-700 rounded-lg p-2">
            <h3 className="text-xl font-semibold text-white mb-2">Tone</h3>
            <div className="flex flex-wrap">
              {tone.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-1 m-1 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-1 text-white" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1 bg-opacity-25 bg-gray-700 rounded-lg p-2">
            <h3 className="text-xl font-semibold text-white mb-2">Type</h3>
            <div className="flex flex-wrap">
              {type.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-1 m-1 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="type"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-1 text-white" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1 bg-opacity-25 bg-gray-700 rounded-lg p-2">
            <h3 className="text-xl font-semibold text-white mb-2">Creativeness</h3>
            <div className="flex items-center">
              <span className="text-white text-sm mr-2">Less</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={state.creativeness}
                onChange={handleChange}
                name="creativeness"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-white text-sm ml-2">More</span>
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 w-full"
            disabled={isLoading || !state.topic || !state.tone || !state.type}
            onClick={() =>
              append({
                role: "user",
                content: `Generate a ${state.type} joke about ${state.topic} in a ${state.tone} tone with creativeness set to ${state.creativeness}`,
              })
            }
          >
            Tell me a Joke
          </button>
        </div>

        <div className="w-1/2">
          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4 text-white"
          >
            <h3 className="text-xl font-semibold mb-2">Generated Joke:</h3>
            {messages[messages.length - 1]?.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
          </div>    
        </div>
      </div>
    </main>
  );
}