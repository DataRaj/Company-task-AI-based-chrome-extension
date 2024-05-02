import PlasmoOverlay from "~content"
import ButtonComponent from "~features/count-button"
import LogoVisibleBtn from "~features/logoVisibleBtn"
import MessagePrompt from "~features/promptMessage"

import "~style.css"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <PlasmoOverlay />
    </div>
  )
}

export default IndexPopup
