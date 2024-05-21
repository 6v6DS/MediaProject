

$(document).ready(function () {
    listing();
});

//fetch
function listing() {
    fetch('/shows').then((res) => res.json()).then((data) => {
        let rows = data['result']
        //카드 비우기
        $('#booking-card').empty()
        rows.forEach((a) => {
            let image = a['image']
            let title = a['title']
            let sub_title = a['sub_title']
            let price = a['price']
            let box_date = a['box_date']
            let disclaimer = a['disclaimer']

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
            $('#booking-card').append(temp_html)
        })

    })
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



