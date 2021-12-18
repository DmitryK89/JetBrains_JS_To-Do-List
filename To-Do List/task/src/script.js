const input = document.getElementById("input-task");

document.getElementById("add-task-button").addEventListener('click', function (){
    const text = input.value;
    addTaskToUi(text);
    saveToLocalStorage();
    input.value = "";
});

function fillTaskList() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksLength = taskList.length;
    for (let i = 0; i < tasksLength ; i++)
    {
        addTaskToUi(taskList[i].text,taskList[i].checked);
    }
}
fillTaskList();

function addTaskToUi(text, checked = false) {
    const list = document.getElementById("task-list");

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'checkbox');
    checkbox.addEventListener('change', checkItem);
    if(checked) {
        checkbox.checked = true;
        debugger;
    }

    let span = document.createElement('span');
    span.setAttribute('class', 'task');
    span.innerHTML = text;
    if(checked) {
        span.classList.add('task-checked');
    }

    let object = document.createElement('object');
    object.setAttribute('type', 'image/svg+xml');
    object.setAttribute('data', 'remove.svg');

    let button = document.createElement('button');
    button.setAttribute('class', 'delete-btn');
    button.appendChild(object);
    button.addEventListener('click', deleteItem);

    let li = document.createElement('li');
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);

    list.appendChild(li);
}

function saveToLocalStorage() {
    const list = document.getElementById("task-list");
    let tasks = list.querySelectorAll(".task");
    const tasksLength = tasks.length;
    let taskList = [tasks.length];
    for (let i = 0; i < tasksLength ; i++)
    {
        taskList[i] = {
            text: tasks[i].innerHTML,
            checked: tasks[i].classList.contains("task-checked")
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

/*Delete buttons functionality*/
const buttons = document.querySelectorAll(".delete-btn")
const buttonsLength = buttons.length;
for (let i = 0; i < buttonsLength ; i++)
{
    buttons[i].addEventListener('click', deleteItem);
}
function deleteItem (e){
    e.currentTarget.parentNode.remove();
    saveToLocalStorage();
}
/*Checkbox buttons functionality*/
const checkbox = document.querySelectorAll(".checkbox")
const checkboxLength = checkbox.length;
for (let i = 0; i < checkboxLength ; i++)
{
    checkbox[i].addEventListener('change', checkItem);
}
function checkItem (e){
    const  li = e.currentTarget.parentNode;
    const span = li.querySelector(".task");
    span.classList.toggle('task-checked');
    saveToLocalStorage();
}