import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center gap-8 items-center">
        <a href="https://vite.dev" target="_blank" className="transition-all duration-300 hover:drop-shadow-lg">
          <img src={viteLogo} className="w-24 p-6" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-all duration-300 hover:drop-shadow-lg hover:drop-shadow-[0_0_2em_#61dafb]">
          <img src={reactLogo} className="w-24 p-6" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl text-center mt-8">Vite + React</h1>
      <div className="p-8 text-center mt-8">
        <button onClick={() => setCount((count) => count + 1)} className="px-6 py-2 text-xl font-medium bg-gray-900 text-white rounded-lg hover:border-2 hover:border-indigo-500 transition-all">
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code className="font-mono text-indigo-400">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-center text-gray-500 mt-4">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
