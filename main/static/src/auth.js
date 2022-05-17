window.onload = function () {
    function checkInfo(username, password) {
        const host = "http://localhost:8000";
        $.ajax({
            url: host + '/api/user/',
            method: 'GET',
            data: {},
            success: function (users) {
                checkUserInfo(users, username, password)
            },
            error: function (response, status) {
                console.log(response);
                console.log(status);
            }
        });
    }

    function checkUserInfo(users, username, password) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                if (users[i].password == password) {

                } else {
                    warning.innerText = "Вы ввели некорректный пароль пользователя.";
                }
            } else {
                warning.innerText = "Вы ввели некорректный логин пользователя.";
            }
        }
    }

    const loginButton = document.getElementsByClassName("login__button")[0];
    const username = document.getElementsByClassName("username__input")[0];
    const password = document.getElementsByClassName("password__input")[0];
    const warning = document.getElementsByClassName("message")[0];
    const activeUserId = 0;

    // http://localhost:63342/app_notion/main/templates/main/main.html   - главная страница
    loginButton.onclick = () => {
        checkInfo(username, password, activeUserId)
        if (activeUserId != 0) {
            window.location.href = 'http://localhost:63342/app_notion/main/templates/main/main.html';
        }
    }
}

