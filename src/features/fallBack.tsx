import type React from "react"

interface FallbackProps {
    setIsFallback: (input: boolean) => void
}

const Fallback: React.FC<FallbackProps> = ({ setIsFallback }) => {
  return (
    <div
      onClick={() => {
        setIsFallback(false)
      }}
      className=" fixed top-0 left-0 min-h-screen h-full bg-[#0D0D1233] bg-opacity-20 minWidth  "></div>
  )
}

export default Fallback
