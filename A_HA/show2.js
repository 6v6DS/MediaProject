

$(document).ready(function () {
    $(".lightbox-blanket").toggle();
    listing();
});

//fetch
function listing() {
    fetch('/shows').then((res) => res.json()).then((data) => {
        let rows = data['result']
        //카드 비우기
        $('#booking-card').empty()
        rows.forEach((a, index) => {
            let image = a['image']
            let title = a['title']
            let sub_title = a['sub_title']
            let price = a['price']
            let box_date = a['box_date']
            let disclaimer = a['disclaimer']

            //카드 붙이기
            let temp_html = `<li class="booking-card" class="image"
            style="background-image: url(${image})">
            <div class="book-container">
                <div class="content">
                    <button class="btn" onclick="Form()">예매하기</button>
                </div>
            </div>
            <div class="informations-container" onclick="OpenProduct(${index})">
            <h2 class="title">${title}</h2>
            <p class="sub_title">${sub_title}</p>
            <p class="price">${price}</p>
            <div class="more-information">
                <div class="info-and-date-container">
                    <div class="box_date">
                        <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
                        </svg>
                        <p>${box_date}</p>
                    </div>
                </div>
                <p class="disclaimer">${disclaimer}</p>
            </div>
        </div>
        </li>`
            $('#book').append(temp_html)
        })

    })
}


function save_comment() {
    let name = $("#name").val();
    let show_title = $("#show-title").val();
    let show_description = $("#show-description").val();
    let show_price = $("#show-price").val();
    let datetime = $("#datetime").val();
    let comment = $("#comment").val();
    let image_url = $("#image-url").val();
    
    let formData = new FormData();

    formData.append("name_give", name);
    formData.append("show_title_give", show_title);
    formData.append("show_description_give", show_description);
    formData.append("show_price_give", show_price);
    formData.append("datetime_give", datetime);
    formData.append("comment_give", comment);
    formData.append("image_url_give", image_url);

    fetch('/shows', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
      //console.log(data)
      alert(data['신청되었습니다']);
      //페이지 새로고침
      window.location.reload();
    });

    
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

//검색창 열고닫고
function open_box() {
    $('#post-box').show()
}
function close_box() {
    $('#post-box').hide()
}



searchButton.addEventListener("click", searchClubs);


// 카드 body를 클릭하면 외부 사이트로 이동하는 함수
function redirectToExternalSite(url) {
    // 새 창에서 URL을 엽니다.
    window.open(url, '_blank');
}


//모달창
function OpenProduct(index) {
    //var index = $('.product-image[item-data="' + index + '"] img');
    $(".lightbox-blanket").toggle();


    var card = cards[index];
    $('#modal-title').text(card.title);
    $('#modal-subtitle').text(card.desc);
    $('#modal-tags').text(card.comment);
    $('#modal-image').attr('src', card.image);
    $('#modal-description').text(`${card.desc}`)


}

//뒤로가기
function GoBack() {
    $(".lightbox-blanket").toggle();
}

function Form(){
    console.log("공연예매");
    alert("공연 예매 창으로 이동합니다.");
    window.location.href = "./show_submit.html";
}

//모달 제출 버튼
function submitForm() {
    console.log("공연예매");
    alert("공연 예매 창으로 이동합니다.");
    window.location.href = "./show_submit.html";
}



