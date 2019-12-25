var btnAdd = document.getElementById('add');
var btnAll = document.getElementById('all')
var btnComplete = document.getElementById('complete');
var btnActive = document.getElementById('active');
const list = document.getElementById('taskList');
const storage = window.localStorage;
storage.clear();
const all = [];
const complete = [];
const active = [];
var test = document.getElementById('test');

function addTask(id, taskText, flag){
    var newLi = document.createElement('li');
    newLi.setAttribute('id', 'task' + id);
    newLi.setAttribute('class', 'task-single');
    if(id%2===0){
        newLi.style.backgroundColor = 'rgb(245,235,235)';
    }
    list.appendChild(newLi);
    newLi.innerHTML =
        `<input type="checkbox" id="check${id}">
        <span>${taskText}</span>`;
    if(flag===true){
        newLi.style.textDecoration = 'line-through';
        document.getElementById('check'+id).checked = true;
    }
    else{
        newLi.style.textDecoration = null;
    }
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
     if (a[i] === obj) {
      return i;
     }
    }
    return false;
}

function bindTaskEvent() {
    list.addEventListener('click', function (event) {
        let btnId = event.target.getAttribute('id');
        if (!btnId) {
            btnId = event.target.parentElement.getAttribute('id');
        }
        taskId = btnId.slice(-1);
        var checkbox = document.getElementById(`check${taskId}`);
        var targetList = document.getElementById(`task${taskId}`);
        if(btnId.slice(0,-1)==='task'){
            checkbox.checked = !checkbox.checked;
        }
        if(checkbox.checked){
            targetList.style.textDecoration = 'line-through';
            complete.push(String(taskId));
            active.splice(contains(active, String(taskId)), 1);
        }
        else{
            targetList.style.textDecoration = null;
            active.push(String(taskId));
            complete.splice(contains(complete, String(taskId)), 1);
        }
    });
}

btnAdd.addEventListener('click',function(){
    var tasks = document.getElementsByClassName('task-single');
    var newTask = document.getElementById('newTask');
    if(newTask.value!==''){
        id = tasks.length+1;
        taskName = 'task'+id;
        all.push(String(id));
        storage[taskName] = newTask.value;
        addTask(id, newTask.value, false);
        active.push(String(id));
        newTask.value = '';
    }
});

btnComplete.addEventListener('click',function(){
    list.innerHTML = '';
    for(let i=0;i<complete.length;i++){
        id = complete[i];
        taskText = storage.getItem('task'+id);
        addTask(Number(id), taskText, true);
    }
})

btnActive.addEventListener('click',function(){
    list.innerHTML = '';
    for(let i=0;i<active.length;i++){
        id = active[i];
        taskText = storage.getItem('task'+id);
        addTask(Number(id), taskText, false);
    }
})

btnAll.addEventListener('click',function(){
    list.innerHTML = '';
    var flag = true;
    for(let i=0;i<all.length;i++){
        id = all[i];
        taskText = storage.getItem('task'+id);
        if(contains(complete, id)===false){
            flag = false;
        }
        addTask(Number(id), taskText, flag);
    }
})

bindTaskEvent();