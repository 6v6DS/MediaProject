
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
    fetch('/contents').then((res) => res.json()).then((data) => {
        let rows = data['result'];
        $('#cards-box').empty();
        rows.forEach((a, index) => {
            let comment = a['comment'];
            let title = a['title'];
            let desc = a['desc'];
            let image = a['image'];
            let temp_html = `<div class="col">
                                <div class="card h-100"  onclick="OpenProduct(${index})">
                                    <img src="${image}" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">${desc}</p>
                                        <p class="mycomment">${comment}</p>
                                    </div>
                                </div>
                            </div>`;
            $('#cards-box').append(temp_html);
            cards.push({ title, desc, comment, image });
        });
    });
}

//Go Back
function OpenProduct(index) {
    $(".lightbox-blanket").toggle();


    var card = cards[index];
    $('#modal-title').text(card.title);
    $('#modal-subtitle').text(card.desc);
    $('#modal-tags').text(card.comment);
    $('#modal-image').attr('src', card.image);
    $('#modal-description').text(`${card.desc}`)


}




function posting() {
    //comment 데이터 가져오기
    let comment = $('#comment').val();
    let title = $('#title').val();
    let desc = $('#desc').val();
    let image = $('#image').val();

    //form 데이터에 태워서 보내주기
    let formData = new FormData();
    formData.append("comment_give", comment);
    formData.append("title_give", title);
    formData.append("desc_give", desc);
    formData.append("image_give", image);

    fetch('/contents', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
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
    
    window.location.href = "./submit.html";

}



searchButton.addEventListener("click", searchClubs);

