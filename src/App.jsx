import { useState } from 'react'
import './App.css'

function App() {
  const [arrayList, setArrayList] = useState([[]]);
  const [result, setResult] = useState('');

  function addArray(){
    setArrayList([...arrayList, []]);
  }

  function popArray(){
    let x = arrayList.pop();
    if(arrayList.length == 0) return;
    setArrayList([...arrayList]);
  }

  function generateResult(){
    setResult('Hello World');
  }

  function setFieldValue(index, value){
    arrayList[index-1] = value;
    setArrayList([...arrayList])
    console.log(arrayList[index-1]);
  }

  return (
    <div className="App">
      <ArrayBlock arrayList={arrayList} addArray={addArray} popArray={popArray} setFieldValue={setFieldValue}></ArrayBlock>
      <TemplateField></TemplateField>
      <Result value={result}></Result>
      <GenerateResultButton generateResult={generateResult}></GenerateResultButton>
    </div>
  )
}

function ArrayField(props) {
  function handleChange(event){
    props.setFieldValue(props.index, event.target.value);
  }

  return (
    <div className='ArrayField'>
        <textarea onChange={handleChange}></textarea>
        <p>{props.index}</p>
    </div>
  )
}

function ArrayBlock(props){
  return (
    <div className='ArrayBlock'>
      {props.arrayList.map((arr, index) => {
        return <ArrayField key={index} index={index + 1} setFieldValue={props.setFieldValue}></ArrayField>;
      })}
      <button onClick={props.addArray}>+</button>
      <button onClick={props.popArray}>-</button>
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

function Result(props){
  return (
    <div className='Result'>
      <p>{props.value}</p>
    </div>
  )
}

function GenerateResultButton(props){
  return (
    <div className='GenerateResultButton'>
      <button onClick={props.generateResult}>Generate</button>
    </div>
  )
}

export default App
