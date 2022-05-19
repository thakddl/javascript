const toDoForm = document.querySelector('.toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.toDoList');

const TODOS_LS = 'toDos';

let toDos = new Array;

function deleteToDo(event){
    const btn = event.target,
        li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== li.id; 
    });
    toDos = cleanToDos;
    saveToDos();
    //array.filter(함수)은 array 안의 모든 아이템을 함수로 실행하고 true를 return하는 아이템들로 새로운 array를 만든다.
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}//JSON.stringify() 객체를 문자열로 저장한다. 왜냐하면 localStorage는 문자열밖에 저장할 수 없기 때문이다. 다시 객체화하는 것은 JSON.parse이다.

function showToDos(text){
    const li = document.createElement('li'),
        delBtn = document.createElement('button'),
        span = document.createElement('span'),
        newId = `toDo${toDos.length+1}`;
    delBtn.innerText = '❌';
    delBtn.addEventListener('click', deleteToDo)
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);//li 출력

    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos(); 
}

function handleSubmitToDos(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    showToDos(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if( loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            showToDos(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmitToDos);
}
init();