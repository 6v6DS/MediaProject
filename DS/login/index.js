
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 아이디와 비밀번호 가져오기
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // AJAX 요청 보내기
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'your_backend_endpoint_here', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // 성공적으로 요청이 완료됨
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    document.getElementById('login-status').textContent = '로그인 성공!';
                } else {
                    document.getElementById('login-status').textContent = '아이디 또는 비밀번호가 일치하지 않습니다.';
                }
            } else {
                // 요청이 실패함
                console.error('로그인 요청 실패');
            }
        }
    };
    var data = JSON.stringify({ username: username, password: password });
    xhr.send(data);

    // // 로그인체크
    // if (username === 'user' && password === 'password') {
    //     document.getElementById('login-status').textContent = '로그인 성공!';
    // } else {
    //     document.getElementById('login-status').textContent = '아이디 또는 비밀번호가 올바르지 않습니다.';
    // }

});
