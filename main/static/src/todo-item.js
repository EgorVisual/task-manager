class TodoItem{
    constructor(title,isActive,id) {
        this.title = title;
        this.is_active = isActive;
        this.__createHtmlElement();
        this.__id = id;
        this.__host = "http://localhost:8000";
    }

    __createHtmlElement(pk){
        const div = document.createElement("div");
        div.className = "todo__item todo-item";
        const checkboxInput = document.createElement("input");
        checkboxInput.className = "todo-item__checkbox";
        checkboxInput.type = "checkbox";
        checkboxInput.checked = this.is_active;
        const titleSpan = document.createElement('span');
        titleSpan.className = "todo-item__text";
        titleSpan.innerText = this.title;
        const deleteButton = document.createElement("button");
        deleteButton.className = "todo-item__delete";
        deleteButton.innerText = "×";

        div.append(checkboxInput,titleSpan,deleteButton);
        this.htmlElement = div;

        this.__id = pk;

        deleteButton.onclick = this.remove.bind(this);
        checkboxInput.onclick = this.changeTaskStatus.bind(this);
    }

    createTodoItem(body){
        this.__sendCreateRequest(body);
    }

    __sendCreateRequest(body){
        const title = this.title;
        $.ajax({
            url:this.__host+'/api/task/',
            method: 'POST',
            data: {
                title: this.title,
                description: 'empty',
                is_active: true
            },
            success: (response) => {
                this.__createHtmlElement(response);
                body.append(this.getHtmlElement());
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
            url:this.__host+'/api/task/'+this.__id+"/",
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
            },
            error: function (response, status){
                console.log(response);
                console.log(status);
            }
            });
    }
}