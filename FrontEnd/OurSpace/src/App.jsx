import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'



import Header from "./components/Header/Header"
import Home from "./components/Home/Home"
import About from "./components/About/About"
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <Home/>
      <About/>
    </div>
  )
}

export default App
