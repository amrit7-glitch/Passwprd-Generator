

import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [savedpass, setsavedpass] = useState('');

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  function save() {
    localStorage.setItem('savedPassword', password);
  }

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  function getpass() {
    const data = localStorage.getItem('savedPassword')
    setsavedpass(data);
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Password Generator</h1>

        <div className="input-group">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className="settings">
          <div>
            <label>Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label>Include Numbers</label>
          </div>

          <div>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label>Include Symbols</label>
          </div>
        </div>

        <div className="buttons">
          <button onClick={save}>Save Password</button>
          <button onClick={getpass}>Get Saved</button>
        </div>

        {savedpass && <div className="saved">Saved: {savedpass}</div>}
      </div>
    </div>
  )
}

export default App
