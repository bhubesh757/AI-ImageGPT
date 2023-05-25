import Image from "next/image"
import Link from "next/link"

function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
    
    <div className="flex space-x-2 items-center">
      <Image src="https://static.vecteezy.com/system/resources/previews/021/059/827/original/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg" alt = "logo" 
      height = {30}
      width = {30}
      >
      </Image>
      <div>
          <h1 className="font-bold">
            <span className="text-violet-500">
            AI</span> Generator
          </h1>
          <h2 className="text-xs">
              Dall-e GPT - CLoud Based Microsoft Azure
          </h2>
      </div>
    </div>
    {/* Right  */}
    <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
      <Link href = "">
      Github Repo - Click Me!!
      </Link>
    </div>
    </header>
  )
}

export default Header