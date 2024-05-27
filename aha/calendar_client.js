jQuery(document).ready(function(){
    jQuery('.datetimepicker').datepicker({
        timepicker: true,
        language: 'en',
        range: true,
        multipleDates: true,
            multipleDatesSeparator: " - "
      });
      jQuery("#add-event").submit(function(event){
        event.preventDefault();
        var values = {
            title: jQuery('[name="title"]').val(),
            date: jQuery('[name="date"]').val(),
            description: jQuery('[name="description"]').val(),
            icon: 'circle'
        };
    
        // Send data to server
        jQuery.ajax({
            url: '/event',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(values),
            success: function(response) {
                alert("Event added successfully");
                jQuery('#calendar').fullCalendar('refetchEvents');
                jQuery('#modal-view-event-add').modal('hide');
            },
            error: function(response) {
                alert("Error adding event: " + response.responseText);
            }
        });
    });
});
  
(function () {    

    jQuery(function() {
    jQuery('#calendar').fullCalendar({
        themeSystem: 'bootstrap4',
        businessHours: false,
        editable: true,

        header: {
            left: 'title',
            right: 'prev,next'
        },
        events: function(start, end, timezone, callback) {
            jQuery.ajax({
                url: '/calendar',
                type: 'GET',
                dataType: 'json',
                success: function(doc) {
                    var events = [];
                    doc.showResults.concat(doc.eventResults).forEach(function(event) {
                        events.push({
                            title: event.title,
                            start: event.date,
                            end: event.date,
                            description: event.description,
                            icon: "circle"  // Force icon to be 'circle' for all events
                        });
                    });
                    callback(events);
                },
                error: function() {
                    console.error("Failed to load events.");
                }
            });
        },
        eventRender: function(event, element) {
            element.find('.fc-time').remove();  // 이벤트 시간 표시 요소 제거
        
            if (event.icon) {
                element.find(".fc-title").prepend("<i class='fa fa-" + event.icon + "'></i> ");
            }
        },
        dayClick: function() {
            jQuery('#modal-view-event-add').modal();
        },
        eventClick: function(event, jsEvent, view) {
            jQuery('.event-icon').html("<i class='fa fa-circle'></i>");
            jQuery('.event-title').html(event.title);
            jQuery('.event-body').html(event.description);
            jQuery('#modal-view-event').modal();
        },
    });
});

    
})(jQuery);