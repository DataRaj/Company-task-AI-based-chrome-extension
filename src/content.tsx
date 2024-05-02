import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useEffect, useRef, useState } from "react"
import ButtonComponent from "~features/count-button"
import Fallback from "~features/fallBack"
import MessagePrompt from "~features/promptMessage"
import selectMessageBox from "~lib/logoVisibility"

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(".msg-form__msg-content-container")


export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
/* 
I have put all the dependent states at one instead of writing these states in there own components,
because all those states are totally dependent on each other
like every state has interconnection with the another  
so instead of writing it using 'this keyword as global defined function I write all dependent states at one place '
*/
const PlasmoOverlay = () => {
  const [message, setMessage] = useState<any[]>([])
  const [inputMessage, setInputMessage] = useState<string>("")
  const [isAssistantTyping, setIsAssistantTyping] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isFallback, setIsFallback] = useState<boolean>(false)
  const [lastResponseMessage, setLastResponseMessage] = useState<string>("")
  const [isRegenerateDisable, setIsRegenerateDisable] = useState<boolean>(false)

  // It will show user an icon of chatgpt writer when enters into message box.
  const handleVisibilityVisible = (chatgptWriterment: any) => {
    chatgptWriterment.style.visibility = "visible"
  }

  // the logo will set to hidden when users back out from message box.
  const handleVisibilityBlur = (chatgptWriter: any) => {
    chatgptWriter.style.visibility = "hidden"
  }

  useEffect(() => {

    selectMessageBox(
      setIsFallback,
      handleVisibilityBlur,
      handleVisibilityVisible,
      setErrorMessage)
  }, [])

  /* This function inserts the last response message into a message box if it exists.
      It selects the message box, its paragraph tag, and a placeholder.
      If all elements are found, it removes the placeholder text and
      sets the paragraph text to the last response message.
      If any element is missing, it logs an error.
  */

      const InsGeneratedMessage = () => {
        if (lastResponseMessage == null || lastResponseMessage == "") {
          return
        }
        const messageBox = document.querySelector(".msg-form__contenteditable") //Select Message Box.
        const pTag = messageBox.querySelector("p") //Select p Tag present in the message box.
        const placeholder = document.querySelector(".msg-form__placeholder") //Select placeholder
        if (messageBox && pTag && placeholder) {
          placeholder.setAttribute("data-placeholder", "") //empty the placeholder
          pTag.textContent = lastResponseMessage // insert newly generated message(lastresponse)
          setIsFallback(false)
        } else {
          console.log(".msg-form__contenteditable not found")
          setErrorMessage("messageBox not found")
        }
      }

  // A Delay for delay a faking generating data
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  /* This function sends a message from the user to an assistant/ChatGpt.
      It checks if the assistant is typing or if message regeneration is disabled.
      Then, it adds the user's message to the conversation, simulates the assistant typing,
      and responds after a delay. If an error occurs, it handles it gracefully.
  */

async function SendMessage(
 ) {
        if (isAssistantTyping) {
          setErrorMessage("Wait For Response")
          return
        }
        if (isRegenerateDisable) {
          return
        }
    
        const userMessage = {
          content: inputMessage,
          role: "user"
        }
    
        setMessage((preMessage) => {
          console.log(preMessage)
          return [...preMessage, userMessage]
        })
    
        setInputMessage("")
    
        setIsAssistantTyping(true)
    
        try {
          await delay(Math.floor(Math.random()*5000)+1) // I am giving a random delay value from a range of 1 second to 5 second.
          let responseContent = 
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask." // as in assignment, it was specified to print a same answer as a generated one.
    
          setLastResponseMessage(responseContent)
          setIsRegenerateDisable(true)
          setMessage((preMess) => {
            console.log(preMess)
            return [...preMess, { content: responseContent, role: "assistant" }]
          })
        } catch (error) {
          console.error("Error sending message:", error)
          setMessage((preMess) => {
            return [
              ...preMess,
              {
                content: "Please try again later something went wrong.",
                role: "assistant"
              }
            ]
          })
        } finally {
          setIsAssistantTyping(false)
          setErrorMessage("")
        }
      }



  return (
    <div className="relative">
      {/* If the Fallback is set to true, display the Fallback component and the message prompt. 
           The Fallback becomes true when the user clicks on the AI icon. */}
      {isFallback && <Fallback setIsFallback={setIsFallback} />}
      {isFallback && (
        <MessagePrompt
          messages={message}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={SendMessage}
          isAssistantTyping={isAssistantTyping}
          InsGeneratedMessage={InsGeneratedMessage}
          isRegenerateDisable={isRegenerateDisable}
        />
      )}
    </div>
  )
}

export default PlasmoOverlay
