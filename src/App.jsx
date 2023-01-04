import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [arrayList, setArrayList] = useState(['Apple Mango Banana']);
  const [result, setResult] = useState([]);
  const [template, setTemplate] = useState('{"fruitname" : "1"}');

  function addArray(){
    setArrayList([...arrayList, '']);
  }

  function popArray(){
    let x = arrayList.pop();
    if(arrayList.length == 0) return;
    setArrayList([...arrayList]);
  }

  function generateResult(){
    let res = [];
    let workArrayList = [];
    for(let i = 0; i < arrayList.length; i++){
      workArrayList[i] = arrayList[i].split(' ');
    }

    for(let i = 0; i < workArrayList[0].length; i++){
      let row = template;
      for(let j = 0; j < workArrayList.length; j++){
        row = row.replace(String(j+1), workArrayList[j][i]);
      }
      res.push(row);
    }
    setResult(res);
  }

  function setTemplateValue(value){
    setTemplate(value);
  }

  function setFieldValue(index, value){
    arrayList[index-1] = value;
    setArrayList([...arrayList])
    //console.log(arrayList[index-1]);
  }

  return (
    <div className="App">
      <ArrayBlock arrayList={arrayList} addArray={addArray} popArray={popArray} setFieldValue={setFieldValue}></ArrayBlock>
      <TemplateField setTemplateValue={setTemplateValue}></TemplateField>
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
        <textarea onChange={handleChange} defaultValue={props.index === 1 ? 'Apple Mango Banana' : ''}></textarea>
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

function TemplateField(props){
  function handleChange(event){
    props.setTemplateValue(event.target.value);
  }

  return (
    <div className='TemplateField'>
      <textarea onChange={handleChange} defaultValue={'{"fruitname" : "1"}'}></textarea>
    </div>
  )
}

function Result(props){
  return (
    <div className='Result'>
      {props.value.map((row, index) => {
        return <p key={index}>{row}</p>;
      })}
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
