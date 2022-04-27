window.onload = function () {
    function fetchTasks(filter){
        const host = "http://localhost:8000";
        $.ajax({
            url:host+'/api/task',
            method: 'GET',
            data: {},
            success: function (tasks,status){
                renderTasks(tasks, filter);
                console.log(tasks);
                console.log(status);
            },
            error: function (response, status){
                console.log(response);
                console.log(status);
            }
            });
    }

    function renderTasks(tasks, filter) {
        if(filter == "active"){
            for(let i=0; i < tasks.length; i++) {
                if(tasks[i].is_active == true){
                    const todoItem = new TodoItem(tasks[i].title, tasks[i].is_active, tasks[i].id);
                    todoBody.append(todoItem.getHtmlElement());
                }
            }
        }
        else if(filter == "completed"){
            for(let i=0; i < tasks.length; i++) {
                if(tasks[i].is_active == false){
                    const todoItem = new TodoItem(tasks[i].title, tasks[i].is_active, tasks[i].id);
                    todoBody.append(todoItem.getHtmlElement());
                }
            }
        }
        else {
            for(let i=0; i < tasks.length; i++) {
                const todoItem = new TodoItem(tasks[i].title, tasks[i].is_active, tasks[i].id);
                todoBody.append(todoItem.getHtmlElement());
            }
        }
    }

    function countTasks(todoItemCheckbox){
        let activeTasks = 0;
        let allTasks = 0;
        for(let i=0; i < todoItemCheckbox.length; i++) {
            if(todoItemCheckbox[i].checked == false){
                activeTasks++;
            }
            allTasks++;
        }
        return [activeTasks,allTasks]
    }

    function printCountTasks(counterField,todoItemCheckbox){
        [activeTasks, allTasks] = countTasks(todoItemCheckbox);
        counterField.innerText = 'Active tasks: '+ activeTasks +'/'+ allTasks;
    }

    function cleanAllTasks(){
        while(todoBody.children.length) {
            todoBody.removeChild(todoBody.children[0])
        }
    }

    const status = 'Ready to work!'
    const addButton = document.getElementsByClassName("search_button")[0];
    const inputField = document.getElementsByClassName("search_input")[0];
    const todoBody = document.getElementsByClassName('todo_body')[0];
    const todoItemCheckbox = document.getElementsByClassName('todo-item_checkbox');
    const counterField = document.getElementsByClassName("todo-menu_tasks-number")[0];
    const allFilterButton = document.getElementsByClassName('todo-item_tasks-filter_all')[0];
    const activeFilterButton = document.getElementsByClassName('todo-item_tasks-filter_active')[0];
    const completedFilterButton = document.getElementsByClassName('todo-item_tasks-filter_completed')[0];
    const statusField = document.getElementsByClassName('todo-item_tasks-status')[0];
    console.log(addButton);
    console.log(inputField);
    console.log(todoBody);

    fetchTasks('all');
    printCountTasks(counterField,todoItemCheckbox);
    statusField.innerText = status;

    addButton.onclick = ()=>{
        const todo = new TodoItem(inputField.value,true)
        todo.createTodoItem();
        todoBody.append(todo.getHtmlElement());
        printCountTasks(counterField,todoItemCheckbox);
    }

    todoBody.onchange = () => {
        printCountTasks(counterField,todoItemCheckbox);
    }

    allFilterButton.onclick = ()=>{
        allFilterButton.classList.add("active");
        activeFilterButton.classList.remove("active");
        completedFilterButton.classList.remove("active");
        cleanAllTasks();
        fetchTasks('all');
        printCountTasks(counterField,todoItemCheckbox);
    }
    activeFilterButton.onclick = ()=>{
        allFilterButton.classList.remove("active");
        activeFilterButton.classList.add("active");
        completedFilterButton.classList.remove("active");
        cleanAllTasks();
        fetchTasks('active');
        printCountTasks(counterField,todoItemCheckbox);
    }
    completedFilterButton.onclick = ()=>{
        allFilterButton.classList.remove("active");
        activeFilterButton.classList.remove("active");
        completedFilterButton.classList.add("active");
        cleanAllTasks();
        fetchTasks('completed');
        printCountTasks(counterField,todoItemCheckbox);
    }

}