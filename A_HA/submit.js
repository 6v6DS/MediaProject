
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

    // // Fetch data 받아오기 여기에 fetch url 넣어주세요
    // const response = await fetch('your_backend_url?clubName=' + input);
    // const data = await response.json();

    // 시뮬레이션 데이터 - 성공
    const data = [
        { "name": "	AMiCoM" },
        { "name": "	ATOM" },
        { "name": "	C.OB.E" },
        { "name": "	Do-iT!" },
        { "name": "	유레카" },
        { "name": "	A-PIN" },
        { "name": "	Drop-In	" },
        { "name": "	ROA	" },
        { "name": "	돌벗" },
        { "name": "	산악부" },
        { "name": "	유스호스텔" },
        { "name": "	혜윰" },
        { "name": "	PTPI" },
        { "name": "	Sweat" },
        { "name": "	늘사랑" },
        { "name": "	미유미유" },
        { "name": "	샘터야학" },
        { "name": "	5분쉼표	" },
        { "name": "	비트" },
        { "name": "	CAPO" },
        { "name": "	Conjurer" },
        { "name": "	GLEE" },
        { "name": "	미디올로지" },
        { "name": "	녹두벌" },
        { "name": "	마스터피스" },
        { "name": "	스파이더스" },
        { "name": "	아르떼" },
        { "name": "	아몽극회" },
        { "name": "	ZENITH" },
        { "name": "	CCC	" },
        { "name": "	IVF	" },
        { "name": "	SFC	" },
        { "name": "	아가생	" },
        { "name": "	A.SA." },
        { "name": "	A.va" },
        { "name": "	AD-Brain" },
        { "name": "	AMI	" },
        { "name": "	고슴도치" },
        { "name": "	아론" },
        { "name": "	아묵회" },
        { "name": "	2.5g" },
        { "name": "	ABBA" },
        { "name": "	ABC	" },
        { "name": "	AFC	" },
        { "name": "	ATC	" },
        { "name": "	맨차" },
        { "name": "	아주도" },
        { "name": "	아주떼로" },
        { "name": "	클리어" },
        { "name": "	차오름" },
        { "name": "	호완" },
        { "name": "	AJESS" },
        { "name": "	AKO	" },
        { "name": "	BUT	" },
        { "name": "	시사문제강독회" },
        { "name": "	WESKI" },
        { "name": "	샤토 아주" },
        { "name": "	Friends Club" },
        { "name": "	애프터씬" },
        { "name": "	더블에이" }


    ];


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
            window.location.href = "card.html";
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    return false;
}