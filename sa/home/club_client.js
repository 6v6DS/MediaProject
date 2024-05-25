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
    fetch('/ahaclub').then((res) => res.json()).then((data) => {
        let rows = data['result'];
        $('#cards-box').empty();
        rows.forEach((a, index) => {
            let division = a['division'];
            let name = a['name'];
            let category = a['category'];
            let subfield = a['subfield'];
            let location = a['location'];
            let contact = a['contact'];
            let sns = a['sns'];
            let description = a['description'];
            let image = a['image'];
            
            // 카드에 표시될 내용
            let temp_html = `<div class="col">
                                <div class="card h-100" onclick="OpenProduct(${index})">
                                    <img src="${image}" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${name}</h5>
                                        <p class="card-text">${subfield}</p>
                                    </div>
                                </div>
                            </div>`;
            $('#cards-box').append(temp_html);

            // 모든 정보를 cards 배열에 저장
            cards.push({ division, name, category, subfield, location, contact, sns, description, image });
        });
    });
}


function OpenProduct(index) {
    //var index = $('.product-image[item-data="' + index + '"] img');
    $(".lightbox-blanket").toggle();
    // var lbi = $('.lightbox-blanket .product-image img');
    // console.log($(i).attr("src"));
    // $(lbi).attr("src", $(i).attr("src"));  
    // $(".lightbox-blanket").toggle();

    // var ptext = $('.mycards .card-title')
    // console.log($(i).attr("text"))
    // $(ptext).attr("text", $(i).attr("text"));

    // var pdesc = $('.mycards .')

    var card = cards[index];
    $('#modal-name').text(card.name);
    $('#modal-subtitle').text(card.subfield);
    $('#modal-division').text(card.division);
    $('#modal-category').text(card.category);
    $('#modal-location').text(card.location);
    $('#modal-contact').text(card.contact);
    $('#modal-sns').text(card.sns);
    $('#modal-description').text(card.description);
    $('#modal-image').attr('src', card.image);
}


// function posting() {
//     //comment 데이터 가져오기
//     let comment = $('#comment').val();
//     let title = $('#title').val();
//     let desc = $('#desc').val();
//     let image = $('#image').val();

//     //form 데이터에 태워서 보내주기
//     let formData = new FormData();
//     formData.append("comment_give", comment);
//     formData.append("title_give", title);
//     formData.append("desc_give", desc);
//     formData.append("image_give", image);

//     fetch('/ahaclub', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
//         alert(data['msg'])
//         window.location.reload()
//     })
// }


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
    alert("동아리 신청이 완료되었습니다.");
    GoBack(); // 제출 후 모달 닫기
}


searchButton.addEventListener("click", searchClubs);