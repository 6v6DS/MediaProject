$(document).ready(function () {
    $(".lightbox-blanket").toggle();
    listing();

    // 검색 입력란에서 엔터 키를 누르면 검색 수행
    $('#search-input').keypress(function (e) {
        if (e.which === 13) {
            searchClubs();
        }
    });
});

let cards = [];

//fetch
function listing() {
    fetch('/club').then((res) => res.json()).then((data) => {
        let rows = data['result'];
        $('#cards-box').empty();
        rows.forEach((a, index) => {
            let division = a['division'];
            let clubname = a['clubname'];
            let category = a['category'];
            let subfield = a['subfield'];
            let location = a['location'];
            let contact = a['contact'];
            let sns = a['sns'];
            let description = a['description'];
            let image = a['image'];
            let temp_html = `<div class="col">
                                <div class="card h-100" onclick="OpenProduct(${index})">
                                    <img src="${image}" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${clubname}</h5>
                                        <p class="card-text">${subfield}</p>
                                    </div>
                                </div>
                            </div>`;
            $('#cards-box').append(temp_html);
            cards.push({ division, clubname, category, subfield, location, contact, sns, description, image });
        });
    });
}

// Go Back
function OpenProduct(index) {
    $(".lightbox-blanket").toggle();

    var card = cards[index];
    $('#modal-clubname').text(card.clubname);
    $('#modal-subfield').text(card.subfield);
    $('#modal-division').text(card.division);
    $('#modal-category').text(card.category);
    $('#modal-location').text(card.location);
    $('#modal-contact').text(card.contact);
    $('#modal-sns').text(card.sns);
    $('#modal-description').text(card.description);
    $('#modal-image').attr('src', card.image);
}

function posting() {
    //comment 데이터 가져오기
    let clubname = $('#clubname').val();
    let category = $('#category').val();
    let subfield = $('#subfield').val();
    let location = $('#location').val();
    let contact = $('#contact').val();
    let sns = $('#sns').val();
    let description = $('#description').val();
    let image = $('#image').val();

    //form 데이터에 태워서 보내주기
    let formData = new FormData();
    formData.append("clubname", clubname);
    formData.append("category", category);
    formData.append("subfield", subfield);
    formData.append("location", location);
    formData.append("contact", contact);
    formData.append("sns", sns);
    formData.append("description", description);
    formData.append("image", image);

    fetch('/club', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        window.location.reload()
    })
}

//검색창 열고닫고
function open_box() {
    $('#post-box').show()
}
function close_box() {
    $('#post-box').hide()
}

//검색
function searchClubs() {

    let searchText = document.getElementById("search-input").value.toLowerCase();

    // 검색 결과를 담을 새로운 요소 생성
    let searchResults = $('<div class="row row-cols-1 row-cols-md-5 g-4" id="search-results"></div>');

    // 검색된 동아리만 필터링하여 새로운 요소에 추가
    $('.card').each(function () {
        let clubName = $(this).find('.card-title').text().toLowerCase();
        if (clubName.includes(searchText)) {
            searchResults.append($(this).clone()); // 동아리 카드를 복제하여 새로운 요소에 추가
        }
    });

    // 기존 카드 박스 숨기고, 새로운 검색 결과를 보여줌
    $('#cards-box').hide().after(searchResults);

    // 검색 결과를 표시
    $('#search-results').remove(); // 이전 검색 결과 삭제
    $('#cards-box').after(searchResults);

    searchButton.addEventListener('click', function (event) {
        // 검색 버튼이 클릭되었을 때만 화면을 새로고침
        if (event.type === 'click') {
            location.reload();
        }
        searchClubs();
    });
}

//뒤로가기
function GoBack() {
    $(".lightbox-blanket").toggle();
}

//모달 제출 버튼
function submitForm() {
    // 여기에 제출 버튼 클릭 시 수행할 작업을 추가하세요.
    console.log("동아리신청");
    alert("동아리 신청 창으로 이동합니다.");
    
    window.location.href = "./apply.html";
}

searchButton.addEventListener("click", searchClubs);