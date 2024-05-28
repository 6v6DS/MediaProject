$(document).ready(function () {
    show_submit();
});


function show_submit() {
    fetch('/ticket').then((res) => res.json()).then((data) => {
        let rows = data['result']
        $('#info').empty()
        rows.forEach((a) => {
            let Title = a['Title']
            let Date = a['Date']
            let Price = a['Price']

            let temp_html = `<div class="ele data">
            <h4 class="data__head">Show Title</h4>
            <p class="data__description" id="Title">${Title}</p>
         </div>
         <div class="ele data">
            <h4 class="data__head">Date</h4>
            <p class="data__description" id="Date">${Date}</p>
         </div>
         <div class="ele data">
            <h4 class="data__head">Price</h4>
            <p class="data__description" id="Price">${Price}</p>
         </div>`
         $('#info').append(temp_html)
        })
    })
}


function show_order() {
    event.preventDefault(); // 폼 제출 기본 이벤트 방지

    var formData = {
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
            window.location.href = "./show.html";
        },
        error: function(xhr, status, error) {
            console.error('예매 실패:', error);
        }
    });
}



// Custom Select
// $('select').each(function () {
//     var $this = $(this), numberOfOptions = $(this).children('option').length;

//     $this.addClass('select-hidden');
//     $this.wrap('<div class="select"></div>');
//     $this.after('<div class="select-styled"></div>');

//     var $styledSelect = $this.next('div.select-styled');
//     $styledSelect.text($this.children('option').eq(0).text());

//     var $list = $('<ul />', {
//         'class': 'select-options'
//     }).insertAfter($styledSelect);

//     for (var i = 0; i < numberOfOptions; i++) {
//         $('<li />', {
//             text: $this.children('option').eq(i).text(),
//             rel: $this.children('option').eq(i).val()
//         }).appendTo($list);
//     }

//     var $listItems = $list.children('li');

//     $styledSelect.click(function (e) {
//         e.stopPropagation();
//         $('div.select-styled.active').not(this).each(function () {
//             $(this).removeClass('active').next('ul.select-options').hide();
//         });
//         $(this).toggleClass('active').next('ul.select-options').toggle();
//     });

//     $listItems.click(function (e) {
//         e.stopPropagation();
//         $styledSelect.text($(this).text()).removeClass('active');
//         $this.val($(this).attr('rel'));
//         $list.hide();
//         console.log($this.val());
//     });

//     $(document).click(function () {
//         $styledSelect.removeClass('active');
//         $list.hide();
//     });

// });

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
