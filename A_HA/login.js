let index = {
    init: function() {
        $("#login-form").submit(function(event) {
            event.preventDefault();
            index.login();
        });
    },
    login: function() {
        let data = {
            studentid: $("#studentid").val(),
            password: $("#password").val(),
        };
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify(data),
            dataType: "json",
            success: function(response) {
                console.log(response);
                alert(response.message);
                if (response.message === "로그인 성공") {
                    window.location.href = './card.html';
                }
            },
            error: function(xhr, status, error) {
                alert("로그인 실패: " + xhr.responseJSON.message);
            }
        });
    }
}

$(document).ready(function() {
    index.init();
});