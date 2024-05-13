
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 아이디와 비밀번호 가져오기
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // 간단한 로그인 체크 (여기서는 하드코딩된 값 사용)
    if (username === 'user' && password === 'password') {
        document.getElementById('login-status').textContent = '로그인 성공!';
    } else {
        document.getElementById('login-status').textContent = '아이디 또는 비밀번호가 올바르지 않습니다.';
    }
});
