const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

function makeTodo(data, nameAuthor,timestamp, isCompleted) {

    const textTitle = document.createElement("h2");
    textTitle.innerText = data;

    const textAuthor = document.createElement("h3");
    textAuthor.innerText = nameAuthor;

    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textTimestamp);

    const container = document.createElement("div");
    container.classList.add("item", "shade")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

function createUndoButton() {
    return createButton("btn-undo", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("btn-trash", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("btn-check", function (event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addTodo() {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

    // const noId = document.getElementById("nomoid").value;
    const textTodo = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const timestamp = document.getElementById("date").value;

    const todo = makeTodo(textTodo, textAuthor,  timestamp, false);
    const todoObject = composeTodoObject(textTodo, textAuthor, timestamp, false);
    
    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    uncompletedTODOList.append(todo);
    updateDataToStorage();
}
function addTodoComplete() {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    // const noId = document.getElementById("nomoid").value;
    const textTodo = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const timestamp = document.getElementById("date").value;


    const todo = makeTodo(textTodo, textAuthor,  timestamp, false);
    const todoObject = composeTodoObject(textTodo, textAuthor, timestamp, false);
    
    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    listCompleted.append(todo);
    
    updateDataToStorage();
}
function addComplete() {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    // const noId = document.getElementById("nomoid").value;
    const textTodo = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const timestamp = document.getElementById("date").value;


    const todo = makeTodo(textTodo, textAuthor,  timestamp, true);
    const todoObject = composeTodoObject(textTodo, textAuthor, timestamp, true);
    
    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    listCompleted.append(todo);
    
    updateDataToStorage();
}


    
function addTaskToCompleted(taskElement /* HTMLELement */) {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskAuthor, taskTimestamp, true);
    
    

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;

    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement /* HTMLELement */) {

    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement /* HTMLELement */) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;
    
    const newTodo = makeTodo(taskTitle, taskAuthor, taskTimestamp, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUncompleted.append(newTodo);
    taskElement.remove();
    
    updateDataToStorage();
}

function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    for(todo of todos){
        const newTodo = makeTodo(todo.task, todo.authorname, todo.timestamp, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;

        if(todo.isCompleted){
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    }
}

function cekBook(){
    const cekbok =document.getElementById("check");

    if (cekbok.checked == true){
        addComplete()
    }else {
        addTodo();
        updateDataToStorage();
    }
}