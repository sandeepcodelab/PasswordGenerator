import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(12)
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
  const [isCharAllowed, setIsCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [buttonText, setButtonText] = useState('Copy')

  const generatePassword = useCallback(() => {

    let passText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if(isNumberAllowed) passText += '0123456789'
    if(isCharAllowed) passText += '~!@#$%^&*()_-+=[]{}'

    let generatePass = ''

    for (let i = 1; i <= length; i++) {
      
      const char = Math.floor(Math.random() * passText.length + 1)
      
      generatePass += passText.charAt(char)
    }

    setPassword(generatePass)

  }, [length, isNumberAllowed, isCharAllowed, setPassword])
  

  useEffect(() => {

    generatePassword()
    setButtonText("Copy")

  }, [length, isNumberAllowed, isCharAllowed, generatePassword])


  let passwordRef = useRef()
  
  const copyPassword = useCallback(() => {
    
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    setButtonText("Copied")

  }, [password])

  return (
    <div className='bg-gray-900 w-full h-screen flex justify-center items-start'>
      <div className='bg-white md:w-2xl px-5 md:px-0 mt-20 rounded'>
        <h1 className='text-center text-3xl font-bold mt-5'>Password Generator</h1>
        <div className='flex justify-center items-center mt-8'>
          <input type="text" value={password} ref={passwordRef} className='border-2 border-gray-800 border-r-0 md:w-lg h-12 rounded-tl-md rounded-bl-md outline-none px-2 font-bold bg-blue-100' readOnly />
          <button onClick={copyPassword} className='bg-gray-800 text-white w-25 h-12 border-2 border-gray-800 rounded-tr-md rounded-br-md font-bold cursor-pointer hover:bg-gray-700 hover:border-gray-700'>{buttonText}</button>
        </div>
        <div className='flex flex-col md:flex-row justify-center md:items-center py-5'>
          <p>
          <input type="range" min={8} max={64} value={length} onChange={(e) => setLength(e.target.value)} className='w-25 cursor-pointer' /> Length({length})
          </p>

          <label htmlFor="numbers" className='cursor-pointer md:px-5'>
            <input type="checkbox" 
              id="numbers" className='cursor-pointer' defaultChecked={isNumberAllowed} onChange={() => setIsNumberAllowed(prev => !prev)} /> Numbers
          </label>
          <label htmlFor="characters" className='cursor-pointer'>
            <input type="checkbox" id="characters" defaultChecked={isCharAllowed} onChange={() => setIsCharAllowed(prev => !prev)} value={isCharAllowed} className='cursor-pointer' /> Characters
          </label>
        </div>
      </div>

    </div>
  )
}

export default App
