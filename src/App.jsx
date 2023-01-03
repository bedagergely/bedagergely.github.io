import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ArrayField></ArrayField>
      <TemplateField></TemplateField>
      <Result></Result>
      <GenerateResultButton></GenerateResultButton>
    </div>
  )
}

function ArrayField() {
  return (
    <div className='ArrayField'>
      <textarea></textarea>
    </div>
  )
}

function TemplateField(){
  return (
    <div className='TemplateField'>
      <textarea></textarea>
    </div>
  )
}

function Result(){
  return (
    <div className='Result'>

    </div>
  )
}

function GenerateResultButton(){
  return (
    <div className='GenerateResultButton'>
      <button onClick={generateResult}>Generate</button>
    </div>
  )
}

function generateResult(){
  console.log("Hello world");
}

export default App
