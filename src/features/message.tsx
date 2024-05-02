import React from "react";

interface MessageProps {
  message: {
    role: string;
    content: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUserMessage = message.role === "user";
  const messageClasses = `mb-2 p-4 text-[#666D80] text-2xl rounded-lg w-fit max-w-[70%] ${
    isUserMessage ? "bg-[#DFE1E7] self-end" : "bg-[#DBEAFE] self-start"
  }`;

  return (
    <div
      className={messageClasses}
      dangerouslySetInnerHTML={{
        __html: message.content,
      }}
    />
  );
};

export default Message;
