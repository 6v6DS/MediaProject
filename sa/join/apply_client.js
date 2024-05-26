
// $(document).ready(function(){
//     show_submit();
// });

// document.querySelectorAll('input[name="grade"]').forEach((radio) => {
//     radio.addEventLister('change', (event) => {
//         let selectedId = event.target.id;
//     })
// })

// function show_submit() {
//     fetch('/apply').then((res) => res.json()).then((data) => {
//         let rows = data['result']
//     })
// }

document.addEventListener('DOMContentLoaded', function() {
    // Fetch club names on input
    const clubNameInput = document.getElementById("clubNameInput");
    clubNameInput.addEventListener("input", fetchClubNames);

    // Submit form handling
    const form = document.querySelector("form");
    form.addEventListener("submit", show_order);
});

async function fetchClubNames() {
    const input = document.getElementById("clubNameInput").value;
    const suggestionsDiv = document.getElementById("suggestions");

    // Fetch data 받아오기 여기에 fetch url 넣어주세요
    const response = await fetch('http://localhost:3000/club?clubName=' + input);
    const data = await response.json();

    // // 시뮬레이션 데이터 - 성공
    // const data = [
    //     { "name": "빨간색" },
    //     { "name": "파란색" },
    //     { "name": "초록색" },
    //     { "name": "검은색" },
    //     { "name": "하얀색" },
    //     { "name": "아하" },
    //     { "name": "A-ha" },
    //     { "name": "red" },
    //     { "name": "this" }
    // ];


    // Clear previous suggestions
    suggestionsDiv.innerHTML = "";

    // Display suggestions
    const filteredData = data.filter(club => club.clubname.toLowerCase().includes(input));
    filteredData.forEach(club => {
        const suggestion = document.createElement("div");
        suggestion.textContent = club.clubname;
        suggestion.onclick = () => {
            document.getElementById("clubNameInput").value = suggestion.textContent;
            suggestionsDiv.innerHTML = "";
        };
        suggestionsDiv.appendChild(suggestion);
    });

}

function show_order(event) {
    event.preventDefault();
    const formData = {
        clubname: document.getElementById('clubNameInput').value,
        name: document.getElementById('name').value,
        studentid: document.getElementById('studentID').value,
        grade: document.querySelector('input[name="grade"]:checked').value,
        department: document.getElementById('department').value,
        phonenum: document.getElementById('phonenum').value,
        email: document.getElementById('email').value,
        quest1: document.getElementById('bio').value,
        quest2: document.getElementById('act').value
    };

    fetch('/application', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('신청이 완료되었습니다');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('신청 처리 중 오류가 발생했습니다.');
    });

    return false;
}
