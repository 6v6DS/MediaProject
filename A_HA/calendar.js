

jQuery(document).ready(function(){
    // 날짜 선택기 초기화
    jQuery('.datetimepicker').datepicker({
        timepicker: true,
        language: 'en',
        range: true,
        multipleDates: true,
        multipleDatesSeparator: " - "
    });

    // 이벤트 폼 제출 처리
    jQuery("#add-event").submit(function(event){
        event.preventDefault();
        var values = {};
        $.each($(this).serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });

        console.log('Submitting event:', values); // 디버깅용 로그 추가

        // 서버에 새 이벤트 데이터 전송
        fetch('/add-event', { // 새로운 이벤트를 서버에 POST 요청
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            if (!response.ok) { // 서버 응답이 성공적이지 않을 경우
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Event added successfully:', data); // 디버깅용 로그 추가

            // 새로운 이벤트를 캘린더에 추가
            $('#calendar').fullCalendar('renderEvent', { // 서버에서 받은 데이터를 캘린더에 추가
                title: values.title,
                description: values.description,
                start: values.start,
                end: values.end,
                icon: 'circle'
            }, true); // stick the event

            // 폼 초기화 및 모달 닫기
            $('#add-event')[0].reset();
            $('#modal-view-event-add').modal('hide');

            // 성공 메시지 표시
            alert('저장되었습니다.');
        })
        .catch(error => {
            console.error('Error:', error);

            // 실패 메시지 표시
            alert('저장 실패');
        });
    });

    // FullCalendar 초기화 및 데이터 로딩
    jQuery('#calendar').fullCalendar({
        themeSystem: 'bootstrap4',
        businessHours: false,
        editable: true,
        header: {
            left: 'title',
            right: 'prev,next'
        },
        events: function(start, end, timezone, callback) { // 이벤트 데이터를 가져오는 함수
            // 서버에서 이벤트 데이터를 가져옴
            fetch('/contents') // 서버에서 이벤트 데이터를 GET 요청
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched events:', data); // 디버깅용 로그 추가

                    let events = data.result.map(event => ({ // 서버에서 받은 데이터를 캘린더 형식으로 변환
                        title: event.title,
                        description: event.desc,
                        start: event.start,
                        end: event.end,
                        className: 'fc-bg-default',
                        icon: 'circle'
                    }));
                    callback(events); // 캘린더에 이벤트 추가
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        eventRender: function(event, element) {
            if(event.icon){
                element.find(".fc-title").prepend("<i class='fa fa-"+event.icon+"'></i>");
            }
        },
        dayClick: function() {
            jQuery('#modal-view-event-add').modal(); // 날짜 클릭 시 이벤트 추가 모달 표시
        },
        eventClick: function(event, jsEvent, view) {
            jQuery('.event-icon').html("<i class='fa fa-"+event.icon+"'></i>");
            jQuery('.event-title').html(event.title);
            jQuery('.event-body').html(event.description);
            jQuery('.eventUrl').attr('href',event.url);
            jQuery('#modal-view-event').modal(); // 이벤트 클릭 시 상세 보기 모달 표시
        },
    });
});


