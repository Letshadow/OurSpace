import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'



import Header from "./components/Header/Header"
import Home from "./components/Home/Home"
import About from "./components/About/About"
function App() {

  return (
    <div>
      <Header key="Headernav"/>
      <Home key="lcards"/>
      <About key="Modals"/>
    </div>
  )
}

export default App
