
"use client";

import { Card } from "flowbite-react";

export function Component() {
  return (
    <table>
       <tr>
        <td>
    <Card className='max-w-sm'>
      
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Standard plan</h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-5xl font-extrabold tracking-tight">free of</span>
        <span className="text-3xl font-semibold">dt</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
      </div>
      <ul className="my-7 space-y-5">
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"></span>
        </li>
        <li className="flex space-x-3 line-through decoration-gray-500">
          <svg
            className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500">sharing bots</span>
        </li>
        <li className="flex space-x-3 line-through decoration-gray-500">
          <svg
            className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500">unlimited conversations</span>
        </li>
      </ul>
     
        <button
        type="submit"
        className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-red-200 dark:focus:ring-green-900"
      >
        Chosen plan
      </button>
      </Card>
      </td>
      <td>
      <Card className='max-w-sm'>
      
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">premium plan</h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        
        <span className="text-5xl font-extrabold tracking-tight">40</span>
        <span className="text-3xl font-semibold">dt</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
      </div>
      <ul className="my-7 space-y-5">
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">25 bots</span>
        </li>
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
         sharing bots
          </span>
        </li>       
        <li className="flex space-x-3 line-through decoration-gray-500">
          <svg
            className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500">unlimited conversations</span>
        </li>
      </ul>
    
      <form action="http://localhost:4000/create-checkout-session" method="POST">
        
        <button
        type="submit"
        className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
      >
        Choose plan
      </button>

      
    </form>
      </Card>
      </td>
      <Card className='max-w-sm'>
      
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">king plan</h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-5xl font-extrabold tracking-tight">70</span>
        <span className="text-3xl font-semibold">dt</span>

        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
      </div>
      <ul className="my-7 space-y-5">
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">25 bots</span>
        </li>
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
         sharing bots
          </span>
        </li>       
        <li className="flex space-x-3">
          <svg
            className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
         unlimited conversations
          </span>
        </li> 
        
      </ul>
    
      <form action="http://localhost:4000/create-checkout-session-king" method="POST">
        
        <button
        type="submit"
        className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
      >
        Choose plan
      </button>

      
    </form>
      </Card>
      <td>
     
      </td>
      </tr>
    </table>
  );
}
