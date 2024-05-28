// $(document).ready(function(){
//     show_submit();
// });

document.getElementById('application').addEventListener('submit', submitApplication);

document.querySelectorAll('input[name="grade"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        let selectedId = event.target.id;
    })
})

function show_submit() {
    fetch('/apply').then((res) => res.json()).then((data) => {
        let rows = data['result']
    })
}

async function fetchClubNames() {
    const input = document.getElementById("clubNameInput").value;
    const suggestionsDiv = document.getElementById("suggestions");

    const response = await fetch('http://localhost:3003/clubinfo?clubName=' + input);
    const data = await response.json();

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

async function submitApplication(event) {
    event.preventDefault();

    const formData = {
        clubname: document.getElementById('clubNameInput').value,
        name: document.getElementById('name').value,
        studentid: document.getElementById('studentid').value,
        grade: document.querySelector('input[name="grade"]:checked').value,
        department: document.getElementById('department').value,
        phonenum: document.getElementById('phonenum').value,
        email: document.getElementById('email').value,
        qa1: document.getElementById('qa1').value,
        qa2: document.getElementById('qa2').value
    };

    try {
        const response = await fetch('/apply', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const data = await response.json();
            alert('신청이 완료되었습니다');
            window.location.href = "http://localhost:3003/club.html";
        } else {
            throw new Error(data.error || 'Unknown Error');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('신청 처리 중 오류가 발생했습니다');
    }
    
    return false;
}