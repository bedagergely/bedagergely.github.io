import './style.css'

//init global variables
const variableFieldContainer: Element = document.querySelector("#variableFieldContainer") as Element;
const addFieldButton: HTMLButtonElement = document.querySelector("#addFieldButton") as HTMLButtonElement;
const removeFieldButton: HTMLButtonElement = document.querySelector("#removeFieldButton") as HTMLButtonElement;
var fieldCounter: number = 0;

function main() {
  addField();
  addFieldButton.onclick = addField;
  removeFieldButton.onclick = removeField;
}

function addField() {
  let child = document.createElement('input');
  child.setAttribute("id", fieldCounter.toString());
  child.setAttribute("class", "field")
  variableFieldContainer.appendChild(child);
  fieldCounter++;
}

function removeField() {
  if (fieldCounter > 1) {
    variableFieldContainer.removeChild(variableFieldContainer.lastChild as Node);
    fieldCounter--;
  }
}

main();
