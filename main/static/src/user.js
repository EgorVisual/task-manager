class User{
    constructor(id, username,password,fullname,group,role) {
        this.__id = id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.group = group;
        this.role = role;
        this.__host = "http://localhost:8000";
    }
}