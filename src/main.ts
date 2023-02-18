import './style.css'

const variableFieldContainer: Element = document.querySelector("#variableFieldContainer") as Element;
const addFieldButton: HTMLButtonElement = document.querySelector("#addFieldButton") as HTMLButtonElement;
const removeFieldButton: HTMLButtonElement = document.querySelector("#removeFieldButton") as HTMLButtonElement;
const generateButton: HTMLButtonElement = document.querySelector("#generateButton") as HTMLButtonElement;
const template: HTMLTextAreaElement = document.querySelector("#template") as HTMLTextAreaElement;
const resultContainer: HTMLDivElement = document.querySelector("#resultContainer") as HTMLDivElement;

var fieldCounter: number = 0;

function main() {
  addField();
  getField(0).value = 'Apple Mango Banana';
  template.value = "INSERT INTO Fruits VALUES ('$1')";
  addFieldButton.onclick = addField;
  removeFieldButton.onclick = removeField;
  generateButton.onclick = generateResult;
}

function addField() {
  let child = createField();
  variableFieldContainer.appendChild(child);
  fieldCounter++;
}

function removeField() {
  if (fieldCounter > 1) {
    variableFieldContainer.removeChild(variableFieldContainer.lastChild as Node);
    fieldCounter--;
  }
}

function createField(): HTMLDivElement {
  let input: HTMLTextAreaElement = document.createElement('textarea');
  let label: HTMLParagraphElement = document.createElement('p');
  let wrapper: HTMLDivElement = document.createElement('div');

  let index: number = fieldCounter + 1;
  let key: string = 'f' + index;

  input.setAttribute('class', 'field');
  input.setAttribute('id', key);
  label.setAttribute('class', 'label');

  label.innerText = '$' + index;

  wrapper.append(input, label);
  return wrapper;
}

function getField(index: number): HTMLTextAreaElement {
  let key: string = '#f' + (index + 1);
  let field: HTMLTextAreaElement = document.querySelector(key) as HTMLTextAreaElement;
  return field;
}

function generateResult() {
  let templateString: string = template.value;
  let valueListCollection: string[][] = [];
  let minIteration: number = Infinity;

  //collect the values from the fields into lists
  for (let i = 0; i < fieldCounter; i++) {
    let f = getField(i);
    let valueList: string[] = f.value.split(' ');
    valueListCollection.push(valueList);
    if (valueList.length < minIteration) minIteration = valueList.length;
  }

  //generate result from values
  for (let i = 0; i < minIteration; i++) {
    let p: HTMLParagraphElement = document.createElement('p') as HTMLParagraphElement;
    let res: string = templateString.slice();
    for (let j = 0; j < valueListCollection.length; j++) {
      let key = '$' + (j + 1);
      res = res.replace(key, valueListCollection[j][i]);
    }
    p.innerText = res;
    resultContainer.appendChild(p);
  }

  console.log(minIteration);
}

main();
