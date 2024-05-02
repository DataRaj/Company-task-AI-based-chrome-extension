import { useState, type ChangeEvent, type KeyboardEvent } from "react"

import Message from "./message"

interface ChatUIPrompt {
  messages: any[]
  inputMessage: string
  setInputMessage: (input: string) => void
  sendMessage: () => void
  isAssistantTyping: boolean
  InsGeneratedMessage: () => void
  isRegenerateDisable: boolean
}

const MessagePrompt: React.FC<ChatUIPrompt> = ({
  messages,
  inputMessage,
  setInputMessage,
  sendMessage,
  isAssistantTyping,
  InsGeneratedMessage,
  isRegenerateDisable
}) => {
  const [input, setInput] = useState<string>("")

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (inputMessage) {
        sendMessage()
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 items-end fixed w-1/4 min-w-[200px] min-h-16 top-1/2 left-1/2  bg-[#F9FAFB] rounded-[15px] p-[26px] transform -translate-x-1/2 -translate-y-1/2 shadow-inner">
      <div className="flex flex-col w-full gap-1 max-h-50 overflow-y-auto">
        {/* It travels through the messages array and sets styles based on the role (user or assistant). */}
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* If the response is currently being fetched, display a loader. */}
        {isAssistantTyping && (
          <div className="mb-2 p-4  text-2xl rounded-lg  w-fit max-w-[70%] bg-[#DBEAFE] self-start">
            <div className="flex items-center justify-center">
              <span className=" bg-gray-500 rounded-full w-4 h-4 mx-1 animate-dotPulse dot"></span>
              <span className="bg-gray-500 rounded-full w-4 h-4 mx-1 animate-dotPulse dot"></span>
              <span className="bg-gray-500 rounded-full w-4 h-4 mx-1 animate-dotPulse dot"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input tag to capture user messages */}
      <input
        type="text"
        placeholder="Your Prompt"
        value={inputMessage}generateMessage
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full h-16 rounded-[5px] p-1 pl-5 outline-none border border-gray-400 text-2xl "
      />

      {/* If the response has not been received or the message has not been sent, 
          display the 'Generate' button. Once the response is received, 
          display the 'Regenerate' and 'Insert' buttons. */}
      <div className="flex items-center gap-4">
        {isRegenerateDisable && (
          <button
            onClick={InsGeneratedMessage}
            className="flex items-center gap-3 border-2 bg-[white] border-[#666D80] text-[#666D80] p-3 rounded-xl text-2xl cursor-pointer ">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.2333 12.3666V1.43331C6.2333 1.05553 6.3613 0.739087 6.6173 0.483976C6.8733 0.228865 7.18975 0.100864 7.56663 0.0999756C7.94441 0.0999756 8.2613 0.227976 8.5173 0.483976C8.7733 0.739976 8.90086 1.05642 8.89997 1.43331V12.3666L12.7666 8.49998C13.0111 8.25553 13.3222 8.13331 13.7 8.13331C14.0777 8.13331 14.3889 8.25553 14.6333 8.49998C14.8777 8.74442 15 9.05553 15 9.43331C15 9.81109 14.8777 10.1222 14.6333 10.3666L8.49997 16.5C8.2333 16.7666 7.92219 16.9 7.56663 16.9C7.21108 16.9 6.89997 16.7666 6.6333 16.5L0.499967 10.3666C0.255522 10.1222 0.133301 9.81109 0.133301 9.43331C0.133301 9.05553 0.255522 8.74442 0.499967 8.49998C0.744411 8.25553 1.05552 8.13331 1.4333 8.13331C1.81108 8.13331 2.12219 8.25553 2.36663 8.49998L6.2333 12.3666Z"
                fill="#666D80"
              />
            </svg>
            Insert
          </button>
        )}
        {!isRegenerateDisable && (
          <button
            onClick={sendMessage}
            disabled={!inputMessage}
            className="flex items-center gap-3 bg-blue-500 border-2 border-blue-500 p-3 rounded-xl text-white text-2xl  cursor-pointer">
            <svg
              width="15"
              height="15"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24.456 11.6075L2.45599 0.607504C2.28356 0.521271 2.08988 0.486719 1.89827 0.508009C1.70665 0.529299 1.52528 0.605523 1.37599 0.727504C1.23341 0.846997 1.12699 1.00389 1.0687 1.18055C1.0104 1.35721 1.00254 1.54662 1.04599 1.7275L4.00599 12.4975L1.00599 23.2375C0.965214 23.3886 0.960455 23.5471 0.992092 23.7003C1.02373 23.8535 1.09088 23.9972 1.18815 24.1198C1.28541 24.2423 1.41008 24.3403 1.55212 24.4059C1.69416 24.4715 1.84962 24.5029 2.00599 24.4975C2.16253 24.4966 2.31667 24.4589 2.45599 24.3875L24.456 13.3875C24.6198 13.3036 24.7573 13.1761 24.8532 13.0191C24.9492 12.862 25 12.6816 25 12.4975C25 12.3135 24.9492 12.133 24.8532 11.9759C24.7573 11.8189 24.6198 11.6914 24.456 11.6075ZM3.55599 21.6075L5.76599 13.4975H15.006V11.4975H5.76599L3.55599 3.3875L21.766 12.4975L3.55599 21.6075Z"
                fill="white"
              />
            </svg>
            Generate
          </button>
        )}
        {isRegenerateDisable && (
          <button className="flex items-center gap-3 bg-blue-500 border-2 border-blue-500 p-3 rounded-xl text-white text-2xl  cursor-pointer">
            <svg
              width="15"
              height="20"
              viewBox="0 0 20 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 4.31812V0.5L5 5.59088L10 10.6819V6.86356C14.1248 6.86356 17.5 10.2999 17.5 14.5C17.5 15.7727 17.1875 16.9821 16.6248 18.0635L18.4375 19.9092C19.4373 18.3181 20 16.4724 20 14.5C20 8.90006 15.4999 4.31812 10 4.31812ZM10 22.1365C5.87494 22.1365 2.5 18.6997 2.5 14.5C2.5 13.2273 2.8125 12.0182 3.37494 10.9362L1.5625 9.09087C0.562438 10.6181 0 12.5273 0 14.5C0 20.0999 4.50012 24.6819 10 24.6819V28.5L15 23.4092L10 18.3181V22.1365Z"
                fill="white"
              />
            </svg>
            Regenerate
          </button>
        )}
      </div>
    </div>
  )
}

export default MessagePrompt
