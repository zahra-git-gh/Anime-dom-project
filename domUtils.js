function createElement1(name, classes){
    const element=document.createElement(name)
    element.classList.add(...classes);
    // element.append(content)
    return element
}

function selectedElement(name){
    const element=document.querySelector(name)
    return element
}
export {createElement1, selectedElement}