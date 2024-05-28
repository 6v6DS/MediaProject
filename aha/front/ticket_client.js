$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    $('#Title').text(params.get('title') || "Default Title");
    $('#Date').text(params.get('date') || "Default Date");
    $('#Price').text(sparams.get('price') || "0");
});

function show_order(event) {
    event.preventDefault();

    var formData = {
        title: $('#Title').text(),
        date: $('#Date').text(),
        price: $('#Price').text(),
        count: $('#count').val(),
        name: $('#name').val(),
        studentid: $('#student_ID').val(),
        department: $('#major').val(),
        phonenum: $('#phoneNumber').val(),
        etc: $('#etc').val()
    };

    $.ajax({
        url: '/ticket',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            alert('예매가 완료되었습니다');
            window.location.href = "show.html";
        },
        error: function(xhr, status, error) {
            console.error('예매 실패:', error);
        }
    });
}

function goBackToShow() {
    window.location.href = "show.html";
}

$(function () {
    $('.quick-reservation').hide();
    $('.quick-reservation').fadeIn(1000);
    $('.close-icon').click(function (e) {
        $('.quick-reservation').fadeOut(500);
        e.stopPropagation();
        $('.after').show(1000);
        e.stopPropagation();
    });
});
