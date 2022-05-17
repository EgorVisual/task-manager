window.onload = function () {
    function checkInfo(username, password) {
        const host = "http://localhost:8000";
        let activeUserId = 0;
        $.ajax({
            url: host + '/api/user/',
            method: 'GET',
            data: {},
            success: function (users) {
                activeUserId = checkUserInfo(users, username, password)
                localStorage.setItem('UserId', activeUserId)
                if (activeUserId !== 0) {

                    window.location.href = 'http://localhost:63342/app_notion/main/templates/main/main.html';
                }
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
                    warning.innerText = "Успешно.";
                    return users[i].id;
                } else {
                    warning.innerText = "Вы ввели некорректный пароль пользователя.";
                    return 0;
                }
            } else {
                warning.innerText = "Вы ввели некорректный логин пользователя.";
                return 0;
            }
        }
        return 0
    }

    const loginButton = document.getElementsByClassName("login__button")[0];
    const username = document.getElementsByClassName("username__input")[0];
    const password = document.getElementsByClassName("password__input")[0];
    const warning = document.getElementsByClassName("message")[0];



    // http://localhost:63342/app_notion/main/templates/main/main.html   - главная страница
    // Так как мы работаем с асинхронными запросами, то мы не можем просто взять и вернуть из запроса перменныю,
    // она приходит позже, чем код успевает обрабатывать функции.
    loginButton.onclick = () => {
        checkInfo(username.value, password.value);
    }
}

