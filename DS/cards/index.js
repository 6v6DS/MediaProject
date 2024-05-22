
$(document).ready(function () {
    listing();
});

//fetch
function listing() {
    fetch('/contents').then((res) => res.json()).then((data) => {
        let rows = data['result']
        //카드 비우기
        $('#cards-box').empty()
        rows.forEach((a) => {
            let comment = a['comment']
            let title = a['title']
            let desc = a['desc']
            let image = a['image']

            //카드 붙이기
            let temp_html = `<div class="col">
                                        <div class="card h-100">
                                            <img src="${image}"
                                                class="card-img-top">
                                            <div class="card-body">
                                                <h5 class="card-title">${title}</h5>
                                                <p class="card-text">${desc}</p>
                                                <p class="mycomment">${comment}</p>
                                            </div>
                                        </div>
                                    </div>`
            $('#cards-box').append(temp_html)
        })

    })
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

window.enterkeySearch = () => {
    if (window.event.keyCode == 13) {
        searchPost();
    }
};

function searchClubs() {

    let searchText = document.getElementById("search-input").value.toLowerCase();

    // 새로운 검색 결과를 표시하기 전에 화면을 새로고침
    //window.location.reload();

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

    searchButton.addEventListener('click', function(event) {
        // 검색 버튼이 클릭되었을 때만 화면을 새로고침
        if (event.type === 'click') {
            location.reload();
        }
        searchClubs();
    });
    
}


searchButton.addEventListener("click", searchClubs);


// 카드 body를 클릭하면 외부 사이트로 이동하는 함수
function redirectToExternalSite(url) {
    // 새 창에서 URL을 엽니다.
    window.open(url, '_blank');
}
