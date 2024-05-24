
// $(document).ready(function(){
//     show_submit();
// });

document.querySelectorAll('input[name="grade"]').forEach((radio) => {
    radio.addEventLister('change', (event) => {
        let selectedId = event.target.id;
    })
})

function show_submit() {
    fetch('/application').then((res) => res.json()).then((data) => {
        let rows = data['result']
    })
}

async function fetchClubNames() {
    const input = document.getElementById("clubNameInput").value;
    const suggestionsDiv = document.getElementById("suggestions");

    // Fetch data 받아오기 여기에 fetch url 넣어주세요
    const response = await fetch('your_backend_url?clubName=' + input);
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
    const filteredData = data.filter(club => club.name.toLowerCase().includes(input));
    filteredData.forEach(club => {
        const suggestion = document.createElement("div");
        suggestion.textContent = club.name;
        suggestion.onclick = () => {
            document.getElementById("clubNameInput").value = club.name;
            suggestionsDiv.innerHTML = "";
        };
        suggestionsDiv.appendChild(suggestion);
    });

}

function show_order() {
    event.preventDefault();

    //Get
    let name = $('#name').val()
    let studentID = $('#studentID').val()
    let major = $('#major').val()
    let phone = $('#phone').val()
    let age = $('#age').val()
    let bio = $('#bio').val()
    let act = $('#act').val()
    let selectedId = document.querySelector('input[name="grade"]:checked').id;

    let formData = new FormData();
    formData.append("name_give", name)
    formData.append("studentID_give", studentID)
    formData.append("selectedId_give", selectedId)
    formData.append("major_give", major)
    formData.append("phone_give", phone)
    formData.append("age_give", age)
    formData.append("bio_give", bio)
    formData.append("act_give", act)

    // Post
    fetch('/application', {
        method: "POST",
        body: formData
    })
        .then((res) => res.json())
        .then((data) => {
            alert('신청이 완료되었습니다');
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    return false;
}
