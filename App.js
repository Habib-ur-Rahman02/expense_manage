import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Crud from './component/crud'
import axios from 'axios'

const App = () => {
  return (
    <>
    <h1>App component</h1>
    <Crud/>
    </>
  )
}

export default App