import a from "./sample.json" assert { type: "json" };

function renderSpecificValue(a, targetDiv) {
  if (a && a.name) {
    const nameDiv = document.createElement("div");
    nameDiv.textContent = a.name;
    targetDiv.appendChild(nameDiv);
  }
}

let count = 0;

function myFunction(obj) {
  for (var key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      count = count + 1;
      myFunction(obj[key]);
    }
  }
}

myFunction(a);

const divId = [];

for (let i = 1; i <= count; i++) {
  divId.push(`element-${i}`);
}

const divElements = divId.map((id) => document.getElementById(id));

for (let i = 0; i < divElements.length; i++) {
  const currentDiv = divElements[i];
  const jsonData = getDataForDiv(a, i);
  renderSpecificValue(jsonData, currentDiv);
}

function getDataForDiv(a, index) {
  const stack = [a];
  let counter = 0;

  while (stack.length > 0) {
    const currentData = stack.pop();
    if (counter === index) {
      return currentData;
    }
    if (currentData.children) {
      for (let j = currentData.children.length - 1; j >= 0; j--) {
        stack.push(currentData.children[j]);
      }
    }
    counter++;
  }

  return null;
}
