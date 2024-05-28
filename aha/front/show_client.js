$(document).ready(function () {
    $(".lightbox-blanket").toggle();
    listing();
});

//fetch
let cards = [];
function listing() {
    fetch('/show').then((res) => res.json()).then((data) => {
        let rows = data['result'];
        $('#booking-card').empty();

        rows.forEach((a, index) => {
            let formattedDate = formatDate(a.date);
            let temp_html = `
                <li class="booking-card" style="background-image: url(${a.poster})">
                    <div class="book-container">
                        <div class="content">
                            <button class="btn" onclick="selectShow('${a.title}', '${formattedDate}', '${a.price}')">예매하기</button>
                        </div>
                    </div>
                    <div class="informations-container" onclick="OpenProduct(${index})">
                        <h2 class="title">${a.title}</h2>
                        <p class="clubname">${a.clubname}</p>
                        <div class="more-information">
                            <p class="date">${formattedDate}</p>
                            <p class="time">${a.time}</p>
                            <p class="location">${a.location}</p>
                        </div>
                    </div>
                </li>`;
            $('#booking-card').append(temp_html);
            cards.push(a);
        });
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-CA', options);
}

//모달창
function OpenProduct(index) {
    $(".lightbox-blanket").toggle();

    var card = cards[index];
    let formattedDate = formatDate(card.date)

    $('#modal-title').text(card.title);
    $('#modal-clubname').text(card.clubname);
    $('#modal-date').text(formattedDate);
    $('#modal-time').text(card.time);
    $('#modal-location').text(card.location);
    $('#modal-price').text(card.price);
    $('#modal-description').text(card.description);
    $('#modal-poster').attr('src', card.poster);

    // 모달의 예매하기 버튼에 selectShow 함수 연결
    $('.btn.btn-popup').attr('onclick', `selectShow('${card.title}', '${formattedDate}', '${card.price}')`);
}

function posting() {
    let clubname = $("#clubname").val();
    let title = $("#show-title").val();
    let date = $("#show-date").val();
    let time = $("#show-time").val();
    let location = $("#show-location").val();
    let price = $("#show-price").val();
    let description = $("#show-description").val();
    let imageUrl = $("#image-url").val();

    let formData = {
        clubname: clubname,
        title: title,
        date: date,
        time: time,
        location: location,
        price: price,
        description: description,
        poster: imageUrl
    };

    fetch('/show', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(response => response.json())
      .then(data => {
        alert('공연/행사 정보가 등록되었습니다.');
        close_box();
        listing();
      })
      .catch(error => console.error('Error:', error));
}

// 검색창 열고닫고
function open_box() {
    $('#post-box').show()
}
function close_box() {
    $('#post-box').hide()
}

// 뒤로가기
function GoBack() {
    $(".lightbox-blanket").toggle();
}

function Form(){
    console.log("공연예매");
    alert("공연 예매 창으로 이동합니다.");
    window.location.href = "./ticket.html";
}

function selectShow(title, date, price) {
    const queryParams = new URLSearchParams({ title, date, price });
    window.location.href = `ticket.html?${queryParams.toString()}`;
}
