class User{
    constructor(id, username,password,fullName,group,role) {
        this.__id = id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.group = group;
        this.role = role;
        this.__host = "http://localhost:8000";
    }

    createUser(body){
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