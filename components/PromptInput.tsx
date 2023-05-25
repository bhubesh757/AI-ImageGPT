'use client'

import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGpt";
import { useState } from "react"
import useSWR from 'swr'

function PromptInput() {
    
    const [input , setInput] = useState("");
    const {data: suggestion  , isLoading , mutate , isValidating }= useSWR('/api/suggestion' , fetchSuggestionFromChatGPT, {
        revalidateOnFocus: false,
       
    });
    
    const loading = isLoading || isValidating;
    console.log(suggestion);
    
  return (
    <div className='m-10'>
    <form className='flex flex-col lg:flex-row shadow-md shadow-slate-400 border rounded-md lg:divide-x'>
        <textarea value={input} 
        onChange = {(e) => setInput(e.target.value) }
        placeholder={
            (loading &&" GPT is Thinking 🧐 ..") ||
            suggestion ||  'Enter the prompt '} className='flex-1 p-4 outline-none rounded-md'>
        </textarea>
        <button
        type = "submit"
        className={`p-4 ${input ? 'bg-violet-500 text-white transitions-colors duration-200' : ''}`}
        > 
            Generate</button>
        <button className='p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 
        disabled:cursor-not-allowed disabled:bg-gray-400
        '> Use Suggestion</button>
        <button
        className='p-4 text-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-500 
        disabled:cursor-not-allowed disabled:bg-gray-400'
        onClick={mutate}
        > New Suggestion</button>
    </form>

    {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "ChatGPT is thinking..." : suggestion}
          </span>
        </p>
      )}
    </div>
  )
}

export default PromptInput