

$(document).ready(function () {
    listing();
});

//fetch
function listing() {
    fetch('/contents').then((res) => res.json()).then((data) => {
        let rows = data['result']
        //카드 비우기
        $('#show-box').empty()
        rows.forEach((a) => {
            let image = a['image']
            let title = a['title']
            let date = a['date']
            let location = a['location']
            let price = a['price']
            let text = a['text']

            //카드 붙이기
            let temp_html = `<div class="show">
                                        <div class="show">
                                            <img src="${image}"
                                                class="show-image">
                                            <div class="show-details">
                                                <h2 class="card-title">${title}</h2>
                                                <p class="date">${date}</p>
                                                <p class="location">${location}</p>
                                                <p class="price">${price}</p>
                                                <p class="text">${text}</p>
                                                <button class="btn-book" onclick="bookTicket()">예매하기</button>
                                            </div>
                                        </div>
                                    </div>`
            $('#container').append(temp_html)
        })

    })
}


function posting() {
    //데이터 가져오기
    let iamge = $('#image').val();
    let title = $('#title').val();
    let date = $('#date').val();
    let location = $('#location').val();
    let price = $('#price').val();
    let text = $('#text').val();
    let comment = $('#comment').val();

    //form 데이터에 태워서 보내주기
    let formData = new FormData();
    formData.append("image_give", image);
    formData.append("title_give", title);
    formData.append("date_give", date);
    formData.append("location_give", location);
    formData.append("price_give", price);
    formData.append("text_give", text);
    formData.append("comment_give", comment);
    formData.append("location_give", location);

    fetch('/show_contents', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        window.location.reload()
    })
}


function searchBtn() {
    searchClubs(); // 검색 함수 호출
}

//검색창 열고닫고
function open_box() {
    $('#show-box').show()
}
function close_box() {
    $('#show-box').hide()
}

window.enterkeySearch = () => {
    if (window.event.keyCode == 13) {
        searchClubs();
    }
};

function searchClubs() {
    $('#search-button').click(function() {
        searchClubs();
    });

    let searchText = $('#search-input').val().toLowerCase(); // 검색어 소문자로 변환

    $('.show').each(function () {
        let showTitle = $(this).find('.show-details h2').text().toLowerCase();
        if (showTitle.includes(searchText)) {
            $(this).show(); // 검색어를 포함한 공연은 보이도록 설정
        } else {
            $(this).hide(); // 검색어를 포함하지 않은 공연은 숨김
        }
    });
}


searchButton.addEventListener("click", searchClubs);



function bookTicket() {
    //여기에 이제 버튼 누르면 예매창으로 이동
    alert("예매가 완료되었습니다!");
}


$('#search-button').click(function() {
    searchClubs();
});
