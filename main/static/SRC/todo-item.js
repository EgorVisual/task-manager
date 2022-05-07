class TodoItem{
    constructor(title,is_active,id) {
        this.title = title;
        this.__id = id;
        this.is_active = is_active;
        this.__createHtmlElement();
        this.__host = "http://localhost:8000";
    }

    __createHtmlElement(){
        const div = document.createElement("div");
        div.className = "todo-app__item todo-item";
        const checkboxInput = document.createElement("input");
        checkboxInput.className = "todo-item_checkbox";
        checkboxInput.type = "checkbox";
        checkboxInput.checked = this.is_active;
        const titleSpan = document.createElement('span');
        titleSpan.className = "todo-item_text";
        titleSpan.innerText = this.title;
        const deleteButton = document.createElement("button");
        deleteButton.className = "todo-item_delete";
        deleteButton.innerText = "×";

        div.append(checkboxInput,titleSpan,deleteButton);
        this.htmlElement = div;

        deleteButton.onclick = this.remove.bind(this);
        checkboxInput.onclick = this.changeTaskStatus.bind(this);
        //body.append(this.htmlElement)
    }

    createTodoItem(/*body*/){
        this.__sendCreateRequest(/*body*/);
    }

    __sendCreateRequest(/*body*/){
        const title = this.title;
        $.ajax({
            url:this.__host+'/api/task/',
            method: 'POST',
            data: {
                title: this.title,
                description: 'empty',
                is_active: true
            },
            success: (tasks,status) => {
                this.__createHtmlElement();
            },
            error: function (response, status){
                console.log(response);
                console.log(status);
            }
            });
    }

    getHtmlElement(){
        return this.htmlElement;
    }

    remove(){
        this.__sendDeleteRequest();
    }

    __sendDeleteRequest(){
        const title = this.title;
        $.ajax({
            url:this.__host+'/api/task/'+this.__id,
            method: 'DELETE',
            data: {},
            success: (tasks,status) => {
                this.htmlElement.remove();
            },
            error: function (response, status){
                console.log(response);
                console.log(status);
            }
            });
    }

    changeTaskStatus(){
        this.__sendChangeStatusRequest();
    }

    __sendChangeStatusRequest(){
        const title = this.title;
        $.ajax({
            url:this.__host+'/api/task/'+this.__id+'/',
            method: 'PUT',
            data: {
                title: this.title,
                description: 'empty',
                is_active: !this.is_active
            },
            success: (tasks,status) => {
                console.log(tasks);
                console.log(status);
            },
            error: function (response, status){
                console.log(response);
                console.log(status);
            }
            });
    }

    __
}