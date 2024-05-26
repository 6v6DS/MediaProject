


$(document).ready(function () {
    // 데이터 받아옴
    function fetchData() {
        return fetch('BACKEND_ENDPOINT_HERE') // 백엔드 엔드포인트 호출 -> 여기에 추가해주세요
            .then(response => response.json())
            .then(data => {
                populateList(data); // 데이터를 받아와서 리스트.
            })
            .catch(error => console.error('Error fetching data:', error));
        
        //시뮬레이션 해봄
        fetchedClubNames = ['이름', '동아리', '뭐가있어', '초코', '쫑쫑아', '동아리이름등등', 'super shy', 'ice cream', 'you dont even know my name'];
         populateList(fetchedClubNames);
        }

    
    // 데이터를 받아와서 리스트에 채우는 함수
    function populateList(data) {
        const list = $('#list');
        list.empty(); // 기존 항목 지움
        data.forEach(item => {
            list.append(`<li class="in">${item}</li>`); // 데이터를 리스트 항목으로 추가
        });
        if (data.length === 0) {
            list.addClass('empty'); // 데이터가 없으면 empty 클래스 추가
        } else {
            list.removeClass('empty'); // 데이터가 있으면 empty 클래스 제거
        }
        //검색 기능을 초기화합니다.
        initSearch();
    }

    // 검색 기능 초기화
    function initSearch() {
        var jobCount = $('#list .in').length;

        $("#search-text").keyup(function () {
            var searchTerm = $("#search-text").val();
            var listItem = $('#list').children('li');
            var searchSplit = searchTerm.replace(/ /g, "'):containsi('");

            $.extend($.expr[':'], {
                'containsi': function (elem, i, match, array) {
                    return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
                }
            });

            $("#list li").not(":containsi('" + searchSplit + "')").each(function (e) {
                $(this).addClass('hiding out').removeClass('in');
                setTimeout(function () {
                    $('.out').addClass('hidden');
                }, 300);
            });

            $("#list li:containsi('" + searchSplit + "')").each(function (e) {
                $(this).removeClass('hidden out').addClass('in');
                setTimeout(function () {
                    $('.in').removeClass('hiding');
                }, 1);
            });

            var jobCount = $('#list .in').length;
            $('.list-count').text(jobCount + ' items');

            if (jobCount == '0') {
                $('#list').addClass('empty');
            } else {
                $('#list').removeClass('empty');
            }
        });
    }

    fetchData(); // 페이지 로드 시 데이터
});

