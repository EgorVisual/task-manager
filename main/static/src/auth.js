window.onload = function () {
    function checkInfo(username,password){
        const host = "http://localhost:8000";
        $.ajax({
            url:host+'/api/user/',
            method: 'GET',
            data: {
                username: username,
                password: password,
            },
            success: function (userInfo,status){
                console.log(response);
                console.log(status);
            },
            error: function (response, status){
                console.log(response);
                console.log(status);
            }
            });
    }

    const loginButton = document.getElementsByClassName("login__button")[0];
    const username = document.getElementsByClassName("username__input")[0];
    const password = document.getElementsByClassName("password__input")[0];
    const warning = document.getElementsByClassName("message")[0];

    // http://localhost:63342/app_notion/main/templates/main/main.html   - главная страница
    loginButton.onclick = ()=>{
        window.location.href = 'http://localhost:63342/app_notion/main/templates/main/main.html';
    }
}

