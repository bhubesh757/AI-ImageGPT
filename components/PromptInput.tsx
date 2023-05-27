'use client'

import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGpt";
import { FormEvent , useState } from "react"
import fetchImages from "../lib/fetchImages";
import useSWR from 'swr'
import toast from "react-hot-toast";


function PromptInput() {
    
    const [input , setInput] = useState("");
    const {data: suggestion  , isLoading , mutate , isValidating }= useSWR('/api/suggestion' , fetchSuggestionFromChatGPT, {
        revalidateOnFocus: false,
       
    });

    const { mutate: updateImages } = useSWR("images", fetchImages, {
      revalidateOnFocus: false,
    });
    
    const submitPrompt = async (useSuggestion?: boolean) => {
      const inputPrompt = input;

      setInput("");
      console.log(inputPrompt);
  
      const notificationPrompt = inputPrompt || suggestion;
      const notificationPromptShort = notificationPrompt.slice(0, 20);

      const notification = toast.loading(
        `AI is creating Amazing For You: ${notificationPromptShort}...`
      );

      const p = useSuggestion
        ? suggestion
        : inputPrompt || (!isLoading && !isValidating && suggestion);
  
      const res = await fetch("/api/generateImages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: p,
        }),
      });
  
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`Your AI Art has been Generated!`, {
          id: notification,
        });
      }

      updateImages();
      
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      await submitPrompt();
    };


    const loading = isLoading || isValidating;
    console.log(suggestion);
    
  return (
    <div className='m-10'>
    <form 
    onSubmit={handleSubmit}
    className='flex flex-col lg:flex-row shadow-md shadow-slate-400 border rounded-md lg:divide-x'>
        <textarea value={input} 
        onChange = {(e) => setInput(e.target.value) }
        placeholder={
            (loading &&" GPT is Thinking 🧐 ..") ||
            suggestion ||  'Enter the prompt '} className='flex-1 p-4 outline-none rounded-md'>
        </textarea>
        <button
        type = "submit"
        className={`p-4 ${input ? 'bg-violet-500 text-white transitions-colors duration-200' : ''}`}
        disabled={loading}
        > 
            Generate</button>
        <button className='p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 
        disabled:cursor-not-allowed disabled:bg-gray-400
        '
        onClick= {() => submitPrompt(true)}
        > Use Suggestion</button>
        <button
        className='p-4 text-violet-400 transition-colors duration-200 font-bold disabled:text-gray-500 
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